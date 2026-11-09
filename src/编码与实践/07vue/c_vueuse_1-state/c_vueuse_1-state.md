# State

## createGlobalState

<https://www.vueusejs.com/shared/createGlobalState/>

将状态保存全局作用域中，以便跨 Vue 实例复用。

::: code-group

```js [用法]
import { computed, ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

export const useGlobalState = createGlobalState(() => {
  // state
  const count = ref(0)

  // getters
  const doubleCount = computed(() => count.value * 2)

  // actions
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

```ts [源码]
import { effectScope } from 'vue-demi'
import type { AnyFn } from '../utils'

/**
 * 将状态保留在全局范围内，以便可以跨 Vue 实例重用。
 *
 * @see https://vueuse.org/createGlobalState
 * @param stateFactory A factory function to create the state
 */
export function createGlobalState<Fn extends AnyFn>(stateFactory: Fn): Fn {
  let initalized = false
  let state: any
  const scope = effectScope(true)

  return ((...args: any[]) => {
    // 若未进行初始化，执行逻辑
    if (!initalized) {
      state = scope.run(() => stateFactory(...args))!
      // 标记改为 已初始化
      initialized = true
    }
    // 若未初始化，则返回state
    return state
  }) as Fn
}
```

:::

## useStorage

<https://www.vueusejs.com/core/useStorage/>

响应式 LocalStorage/SessionStorage

::: details

::: code-group

```js [用法]
import { useStorage } from '@vueuse/core'

// bind object
const state = useStorage('my-store', { hello: 'hi', greeting: 'Hello' })

// bind boolean
const flag = useStorage('my-flag', true) // returns Ref<boolean>

// bind number
const count = useStorage('my-count', 0) // returns Ref<number>

// bind string with SessionStorage
const id = useStorage('my-id', 'some-string-id', sessionStorage) // returns Ref<string>

// delete data from storage
state.value = null
```

```ts [源码]
import { effectScope } from 'vue-demi'
import type { AnyFn } from '../utils'

/**
 * 将状态保留在全局范围内，以便可以跨 Vue 实例重用。
 *
 * @see https://vueuse.org/createGlobalState
 * @param stateFactory A factory function to create the state
 */
export function createGlobalState<Fn extends AnyFn>(stateFactory: Fn): Fn {
  let initalized = false
  let state: any
  const scope = effectScope(true)

  return ((...args: any[]) => {
    // 若未进行初始化，执行逻辑
    if (!initalized) {
      state = scope.run(() => stateFactory(...args))!
      // 标记改为 已初始化
      initialized = true
    }
    // 若未初始化，则返回state
    return state
  }) as Fn
}
```

```js [useStorage.js]
// 其他部分省略

/**
 * Reactive LocalStorage/SessionStorage.
 *
 * @see https://vueuse.org/useStorage
 */
export function useStorage<T extends(string | number | boolean | object | null)>(
  key: string,
  defaults: MaybeRefOrGetter<T>,
  storage: StorageLike | undefined,
  options: UseStorageOptions<T> = {},
): RemovableRef<T> {
  const {
    flush = 'pre',
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = false,
    shallow,
    window = defaultWindow,
    eventFilter,
    onError = (e) => {
      console.error(e)
    },
    initOnMounted,
  } = options
  // 函数接收一些配置选项

  // 创建一个ref来存储存储的值，并将其初始化为defaults的值
  const data = (shallow ? shallowRef : ref)(typeof defaults === 'function' ? defaults() : defaults) as RemovableRef<T>

  // 如果storage未定义，则返回初始化后的data
  if (!storage) {
    try {
      storage = getSSRHandler('getDefaultStorage', () => defaultWindow?.localStorage)()
    }
    catch (e) {
      onError(e)
    }
  }

  if (!storage)
    return data

  // 如果storage已定义，则开始监听存储变化

  const rawInit: T = toValue(defaults)
  const type = guessSerializerType<T>(rawInit)
  const serializer = options.serializer ?? StorageSerializers[type]

  // 创建一个pausableWatch来监听data的变化
  const { pause: pauseWatch, resume: resumeWatch } = pausableWatch(
    data,
    // 当data发生变化时，调用write函数来更新存储
    () => write(data.value),
    { flush, deep, eventFilter },

    // write函数首先从存储中读取旧值和新值，然后比较它们是否相等。
    // 如果不相等，则更新存储
  )

  if (window && listenToStorageChanges) {
    tryOnMounted(() => {
      // 在update函数中，暂停pausableWatch，然后尝试更新data，最后恢复
      useEventListener(window, 'storage', update)
      useEventListener(window, customStorageEventName, updateFromCustomEvent)
      if (initOnMounted)
        update()
    })
  }

  // avoid reading immediately to avoid hydration mismatch when doing SSR
  if (!initOnMounted)
    update()

  function dispatchWriteEvent(oldValue: string | null, newValue: string | null) {
    // send custom event to communicate within same page
    // importantly this should _not_ be a StorageEvent since those cannot
    // be constructed with a non-built-in storage area
    if (window) {
      window.dispatchEvent(new CustomEvent<StorageEventLike>(customStorageEventName, {
        detail: {
          key,
          oldValue,
          newValue,
          storageArea: storage!,
        },
      }))
    }
  }

  // 将一个值（v）写入本地存储（storage）。
  // 首先，它尝试获取存储在本地存储中的旧值（oldValue）。
  // 然后，根据v是否为null，分别处理两种情况：如果v为null，则从本地存储中移除该键值对；否则，将v使用serializer.write(v as any)序列化并设置新的值。
  function write(v: unknown) {
    try {
      const oldValue = storage!.getItem(key)

      if (v == null) {
        dispatchWriteEvent(oldValue, null)
        storage!.removeItem(key)
      }
      else {
        const serialized = serializer.write(v as any)
        if (oldValue !== serialized) {
          storage!.setItem(key, serialized)
          dispatchWriteEvent(oldValue, serialized)
        }
      }
    }
    catch (e) {
      // 如果在写入过程中发生错误，将调用onError(e)处理错误
      onError(e)
    }
  }

  // 将一个值从存储中读取出来，并根据一些条件来合并或覆盖默认值。
  // 它支持事件对象（StorageEventLike）作为参数，以便在值发生变化时能够自动更新
  function read(event?: StorageEventLike) {
    const rawValue = event
      ? event.newValue
      : storage!.getItem(key)

    if (rawValue == null) {
      if (writeDefaults && rawInit != null)
        storage!.setItem(key, serializer.write(rawInit))
      return rawInit
    }
    else if (!event && mergeDefaults) {
      const value = serializer.read(rawValue)
      if (typeof mergeDefaults === 'function')
        return mergeDefaults(value, rawInit)
      else if (type === 'object' && !Array.isArray(value))
        return { ...rawInit as any, ...value }
      return value
    }
    else if (typeof rawValue !== 'string') {
      return rawValue
    }
    else {
      return serializer.read(rawValue)
    }
  }

  // 这段代码是一个JavaScript函数update，它接受一个可选的参数event，类型为StorageEventLike。
  // 这个函数的主要作用是更新本地存储的数据
  function update(event?: StorageEventLike) {
    if (event && event.storageArea !== storage)
      return

    if (event && event.key == null) {
      data.value = rawInit
      return
    }

    if (event && event.key !== key)
      return

    pauseWatch()
    try {
      if (event?.newValue !== serializer.write(data.value))
        data.value = read(event)
    }
    catch (e) {
      onError(e)
    }
    finally {
      // use nextTick to avoid infinite loop
      if (event)
        nextTick(resumeWatch)
      else
        resumeWatch()
    }
  }

  function updateFromCustomEvent(event: CustomEvent<StorageEventLike>) {
    update(event.detail)
  }

  return data
}
```

:::
