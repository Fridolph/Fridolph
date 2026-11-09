# Vue 响应式

[Vue 响应式原理](../../../概念与原理/07vue/s_vue_1-reactive.md)

## Vue2 版本

::: code-group

```js [vue2-reactive.js]
const Observer = function (data) {
  // 循环修改为每个属性添加get set
  for (let key in data) {
    defineReactive(data, key)
  }
}

const defineReactive = function (obj, key) {
  // 局部变量dep，用于get set内部调用
  const dep = new Dep()
  // 获取当前值
  let val = obj[key]
  Object.defineProperty(obj, key, {
    // 设置当前描述属性为可被循环
    enumerable: true,
    // 设置当前描述属性可被修改
    configurable: true,
    get() {
      console.log('in get')
      // 调用依赖收集器中的addSub，用于收集当前属性与Watcher中的依赖关系
      dep.depend()
      return val
    },
    set(newVal) {
      if (newVal === val) {
        return
      }
      val = newVal
      // 当值发生变更时，通知依赖收集器，更新每个需要更新的Watcher，
      // 这里每个需要更新通过什么断定？dep.subs
      dep.notify()
    },
  })
}

const observe = function (data) {
  return new Observer(data)
}

const Vue = function (options) {
  const self = this
  // 将data赋值给this._data，源码这部分用的Proxy所以我们用最简单的方式临时实现
  if (options && typeof options.data === 'function') {
    this._data = options.data.apply(this)
  }
  // 挂载函数
  this.mount = function () {
    new Watcher(self, self.render)
  }
  // 渲染函数
  this.render = function () {
    with (self) {
      _data.text
    }
  }
  // 监听this._data
  observe(this._data)
}

const Watcher = function (vm, fn) {
  const self = this
  this.vm = vm
  // 将当前Dep.target指向自己
  Dep.target = this
  // 向Dep方法添加当前Wathcer
  this.addDep = function (dep) {
    dep.addSub(self)
  }
  // 更新方法，用于触发vm._render
  this.update = function () {
    console.log('in watcher update')
    fn()
  }
  // 这里会首次调用vm._render，从而触发text的get
  // 从而将当前的Wathcer与Dep关联起来
  this.value = fn()
  // 这里清空了Dep.target，为了防止notify触发时，不停的绑定Watcher与Dep，
  // 造成代码死循环
  Dep.target = null
}

const Dep = function () {
  const self = this
  // 收集目标
  this.target = null
  // 存储收集器中需要通知的Watcher
  this.subs = []
  // 当有目标时，绑定Dep与Wathcer的关系
  this.depend = function () {
    if (Dep.target) {
      // 这里其实可以直接写self.addSub(Dep.target)，
      // 没有这么写因为想还原源码的过程。
      Dep.target.addDep(self)
    }
  }
  // 为当前收集器添加Watcher
  this.addSub = function (watcher) {
    self.subs.push(watcher)
  }
  // 通知收集器中所的所有Wathcer，调用其update方法
  this.notify = function () {
    for (let i = 0; i < self.subs.length; i += 1) {
      self.subs[i].update()
    }
  }
}
```

```html [测试]
<html>
  <body>
    <script type="module">
      import { reactive } from '../src/vue2-reactive.js'

      const vue = new Vue({
        data() {
          return {
            text: 'hello world',
          }
        },
      })

      vue.mount() // in get
      vue._data.text = '123' // in watcher update /n in get
    </script>
  </body>
</html>
```

:::

## Vue3 版本

::: code-group

```js [vue3-reactive.js]
// 判断是否为对象 ，注意 null 也是对象
const isObject = val => val !== null && typeof val === 'object'
// 判断key是否存在
const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)

export function reactive(target) {
  // 首先先判断是否为对象
  if (!isObject(target)) return target

  const handler = {
    get(target, key, receiver) {
      console.log(`获取对象属性${key}值`)
      // ... 这里还需要收集依赖，先空着
      track(target, key)

      const result = Reflect.get(target, key, receiver)
      // 递归判断的关键, 如果发现子元素存在引用类型，递归处理。
      if (isObject(result)) {
        return reactive(result)
      }
      return result
    },

    set(target, key, value, receiver) {
      console.log(`设置对象属性${key}值`)

      // 首先先获取旧值
      const oldValue = Reflect.get(target, key, reactive)

      // set 是需要返回 布尔值的
      let result = true
      // 判断新值和旧值是否一样来决定是否更新setter
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver)
        trigger(target, key)
      }
      return result
    },

    deleteProperty(target, key) {
      console.log(`删除对象属性${key}值`)

      // 先判断是否有key
      const hadKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)

      if (hadKey && result) {
        // 更新操作
        target(target, key)
      }

      return result
    },
  }
  return new Proxy(target, handler)
}

// activeEffect 表示当前正在走的 effect
let actieEffect = null
export function effect(callback) {
  actieEffect = callback
  callback()
  actieEffect = null
}

// targetMap 表里每个key都是一个普通对象 对应他们的 depsMap
let targetMap = new WeakMap()

export function track(target, key) {
  // 如果当前没有effect就不执行追踪
  if (!actieEffect) return
  // 获取当前对象的依赖图
  let depsMap = targetMap.get(target)
  // 不存在就新建
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  // 根据key 从 依赖图 里获取到到 effect 集合
  let dep = depsMap.get(key)
  // 不存在就新建
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  // 如果当前effectc 不存在，才注册到 dep里
  if (!dep.has(actieEffect)) {
    dep.add(actieEffect)
  }
}

// trigger 响应式触发
export function trigger(target, key) {
  // 拿到 依赖图
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    // 没有被追踪，直接 return
    return
  }
  // 拿到了 视图渲染effect 就可以进行排队更新 effect 了
  const dep = depsMap.get(key)

  // 遍历 dep 集合执行里面 effect 副作用方法
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}

// 判断是否是一个对象，是就用 reactive 来代理
const convert = val => (isObject(val) ? reactive(val) : val)

class RefImpl {
  constructor(_rawValue) {
    this._rawValue = _rawValue
    this.__v_isRef = true
    // 判断 _rawValue 是否是一个对象
    // 如果是对象调用reactive使用 proxy来代理
    // 不是返回 _rawValue 本身
    this._value = convert(_rawValue)
  }
  // 使用get/set 存取器，来进行追踪和触发
  get value() {
    // 追踪依赖
    track(this, 'value')
    // 当然 get 得返回 this._value
    return this._value
  }
  set value(newValue) {
    // 判断旧值和新值是否一直
    if (newValue !== this._value) {
      this._rawValue = newValue
      // 设置新值的时候也得使用 convert 处理一下，判断新值是否是对象
      this._value = convert(this._rawValue)
      // 触发依赖
      trigger(this, 'value')
    }
  }
}

export function ref(rawValue) {
  // __v_isRef 用来标识是否是 一个 ref 如果是直接返回，不用再转
  if (isObject(rawValue) && rawValue.__v_isRef) return

  return new RefImpl(rawValue)
}

class ObjectRefImpl {
  constructor(proxy, _key) {
    this._proxy = proxy
    this._key = _key
    // __v_isRef 用来标识是否是 一个 ref
    this.__v_isRef = true
  }
  get value() {
    // 这里不用收集依赖
    // this._proxy 就是响应式对象，当访问[this._key]时，this._proxy里面会去自动收集依赖
    return this._proxy[this._key]
  }
  set value(newVal) {
    // 这里不用收集依赖
    // this._proxy 响应式对象，会在this._proxy里面set去调用trigger
    this._proxy[this._key] = newVal
  }
}

// 暴露出去的方法
export function toRef(proxy, key) {
  return new ObjectRefImpl(proxy, key)
}

export function toRefs(proxy) {
  // 判断 当前 proxy 是 proxy 数组， 还是 proxy 对象
  const ret = proxy instanceof Array ? new Array(proxy.length) : {}

  for (const key in proxy) {
    // 内部还是调用 toRef 进行转为 响应式
    ret[key] = toRef(proxy, key)
  }

  return ret
}
```

```html [测试]
<html>
  <body>
    <script type="module">
      import { reactive } from '../src/vue3-reactive.js'
      const obj = {
        name: '小浪',
        age: 22,
        test: {
          test1: {
            test2: 21,
          },
        },
      }
      const proxy = reactive(obj)
      console.log(proxy.age)
      proxy.test.test1.test2 = 22
      console.log(delete proxy.age)
    </script>
  </body>
</html>
```

:::

## 参考

- [当学习自测你 Vue 响应式原理，你可以这么回答他](https://juejin.cn/post/6844903597986037768?searchId=20240228122150EB9E011643A86353904A)——JserWang
