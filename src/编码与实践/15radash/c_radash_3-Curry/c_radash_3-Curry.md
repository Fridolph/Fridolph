# Curry

## all

创建一个按顺序运行的函数链

- 基本用法

链接函数将导致它们一个接一个地执行，将每个函数的输出作为下一个函数的输入传递，并在链的末尾返回最终输出。

```ts
import { chain } from 'radash'

const add = (y: number) => (x: number) => x + y
const mult = (y: number) => (x: number) => x * y
const addFive = add(5)
const double = mult(2)

const chained = chain(addFive, double)

chained(0) // => 10
chained(7) // => 24
```

- 例子

```ts
import { chain } from 'radash'

type Deity = {
  name: string
  rank: number
}

const gods: Deity[] = [
  { rank: 8, name: 'Ra' },
  { rank: 7, name: 'Zeus' },
  { rank: 9, name: 'Loki' },
]

const getName = (god: Deity) => item.name
const upperCase = (text: string) => text.toUpperCase() as Uppercase<string>

const getUpperName = chain(getName, upperCase)

getUpperName(gods[0]) // => 'RA'
gods.map(getUpperName) // => ['RA', 'ZEUS', 'LOKI']
```

- 源码解析

chain 函数接受一个可变参数 funcs，这些参数是函数类型 (...args: any[]) => any，即这些函数可以接受任意数量的参数，并返回任意类型的值。

```ts
export function chain<T1 extends any[], T2, T3>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3
): (...arg: T1) => T3
// ... 省略 按个数堆上去的函数重载
export function chain(...funcs: ((...args: any[]) => any)[]) {
  // 函数返回一个新的函数，这个新函数也接受任意数量的参数 args。
  return (...args: any[]) => {
    // 在返回的新函数内部，使用 reduce 方法将 funcs 数组中的函数按顺序组合起来。
    return funcs.slice(1).reduce(
      // reduce 方法的第一个参数是一个累加器 acc，第二个参数是 funcs 数组中的当前函数 fn。
      // reduce 方法会从 funcs 数组的第二个元素开始（即 funcs.slice(1)），依次将每个函数应用于前一个函数的返回值上，最终返回最后一个函数的结果。
      (acc, fn) => fn(acc),
      // 初始值：reduce 方法的初始值是 funcs 数组的第一个元素 funcs[0](...args)，
      // 即首先执行第一个函数，并将它的返回值作为后续函数的输入。
      funcs[0](...args)
    )
  }
}
```

## compose

创建组合函数

- 基本用法

在函数组合中，每个函数都会被赋予下一个函数作为参数，并且必须调用它才能继续执行。

```ts
import { compose } from 'radash'

const useZero = (fn: any) => () => fn(0)
const objectize = (fn: any) => (num: any) => fn({ num })
const increment =
  (fn: any) =>
  ({ num }: any) =>
    fn({ num: num + 1 })
const returnArg = (arg: any) => (args: any) => args[arg]

const composed = compose(useZero, objectize, increment, increment, returnArg('num'))

composed() // => 2
```

compose 函数，用于将多个函数组合成一个函数。具体来说，它接受一个或多个函数作为参数，并返回一个新的函数，这个新函数会依次调用这些函数，并将前一个函数的返回值作为后一个函数的参数。

```ts
export function compose<F1Result, F1Args extends any[], F1NextArgs extends any[], LastResult>(
  f1: (next: (...args: F1NextArgs) => LastResult) => (...args: F1Args) => F1Result,
  last: (...args: F1NextArgs) => LastResult
): (...args: F1Args) => F1Result
// 同上，略
// 参数展开：compose 函数使用了 TypeScript 的剩余参数语法 ...funcs，这意味着它可以接受任意数量的函数作为参数
export function compose(...funcs: ((...args: any[]) => any)[]) {
  // 函数反转：使用 funcs.reverse() 将传入的函数数组反转，这样在后续的 reduce 操作中，函数的调用顺序是从最后一个函数开始，依次向前。
  // 函数组合：使用 reduce 方法对反转后的函数数组进行迭代。reduce 方法接受两个参数：一个累加器 acc 和当前值 fn。在每次迭代中，将 acc 作为参数传递给 fn，并将 fn(acc) 的结果赋值给 acc。这样，最终 reduce 返回的 acc 就是组合后的函数
  return funcs.reverse().reduce((acc, fn) => fn(acc))
}
```

compose 函数在函数式编程中非常有用，特别是在需要将多个函数组合成一个函数时。例如，在处理数据流或构建复杂函数时，可以将多个简单的函数组合成一个复杂的函数，从而简化代码和提高可读性。

## debounce

创建一个防抖函数. 当函数被连续调用时，只有在最后一次调用后的指定延迟时间过去后，函数才会被执行。如果在这段时间内函数再次被调用，则重新计时。

- 基本用法

Debounce 接受一个带有延迟的选项对象和一个在调用时调用的源函数。当调用返回的函数时，它只会在延迟毫秒时间过去后调用源函数。不会导致调用源的调用会重置延迟，从而推迟下一次调用。

```ts
import { debounce } from 'radash'

const makeSearchRequest = event => {
  api.movies.search(event.target.value)
}

// 基本用法
input.addEventListener('change', debounce({ delay: 100 }, makeSearchRequest))

// 取消 - debounce 返回的函数有一个 cancel 方法，调用该方法时将永久停止源函数被 debounce。
const debounced = debounce({ delay: 100 }, api.feed.refresh)
// ... sometime later
debounced.cancel()

// flush
// debounce返回的函数有一个flush方法，调用时会直接调用源函数。
// const debounced = debounce({ delay: 100 }, api.feed.refresh)
// ... sometime later
debounced.flush(event)

// 待处理 - isPending
// debounce 返回的函数有一个 isPending 方法，如果有任何挂起的调用，则调用该方法时将返回源函数。
debounced.isPending()
```

- 源码解析

```ts
export type DebounceFunction<TArgs extends any[]> = {
  (...args: TArgs): void
  /**
   * Cancels the debounced function
   */
  cancel(): void
  /**
   * Checks if there is any invocation debounced
   */
  isPending(): boolean
  /**
   * Runs the debounced function immediately
   */
  flush(...args: TArgs): void
}
export const debounce = <TArgs extends any[]>(
  // 接收一个包含 delay 属性的对象，delay 表示延迟时间，单位为毫秒
  { delay }: { delay: number },
  // 接收一个函数 func，该函数接收任意类型的参数 TArgs，并返回任意类型的结果
  func: (...args: TArgs) => any
) => {
  let timer: NodeJS.Timeout | undefined = undefined
  let active = true

  const debounced: DebounceFunction<TArgs> = (...args: TArgs) => {
    if (active) {
      // 如果 active 为 true，则清除之前的定时器（如果存在），并设置一个新的定时器。
      // 定时器在延迟时间后执行 func(...args)，并将 timer 设置为 undefined
      clearTimeout(timer)
      timer = setTimeout(() => {
        active && func(...args)
        timer = undefined
      }, delay)
    } else {
      // 如果 active 为 false，则直接执行函数
      func(...args)
    }
  }
  debounced.isPending = () => {
    return timer !== undefined
  }
  debounced.cancel = () => {
    active = false
  }
  debounced.flush = (...args: TArgs) => func(...args)

  return debounced
}
```

## throttle

创建一个节流函数

- 基本用法

Throttle 接受一个带有间隔的选项对象和一个在调用时调用的源函数。当调用返回的函数时，只有在经过了间隔毫秒的时间后，它才会调用源函数。否则，它将忽略该调用。

```ts
import { throttle } from 'radash'

const onMouseMove = () => {
  rerender()
}

addEventListener('mousemove', throttle({ interval: 200 }, onMouseMove))
```

- 源码解析

这段代码实现了一个简单的缓存（memoization）功能，用于优化函数的执行。它通过缓存函数的返回值来避免重复计算，从而提高性能

```ts
// 首先定义了一个类型 ThrottledFunction，它是一个函数类型，接受任意数量的参数并返回 void
export type ThrottledFunction<TArgs extends any[]> = {
  (...args: TArgs): void
  // 此外，它还包含一个 isThrottled 方法，用于检查当前是否有节流操作正在进行
  isThrottled(): boolean
}

export const throttle = <TArgs extends any[]>(
  // 函数接受两个参数：一个包含 interval 属性的对象
  { interval }: { interval: number },
  // 另一个需要被节流的函数 func
  func: (...args: TArgs) => any
) => {
  // 函数内部维护了一个 ready 标志
  // 和一个 timer 定时器。
  let ready = true
  let timer: NodeJS.Timeout | undefined = undefined

  // 节流逻辑：当 throttled 函数被调用时，
  const throttled: ThrottledFunction<TArgs> = (...args: TArgs) => {
    // 首先检查 ready 标志。如果 ready 为 false，表示当前有节流操作正在进行，函数直接返回，不执行 func。
    if (!ready) return

    // 如果 ready 为 true，则执行 func，
    func(...args)
    // 并将 ready 设置为 false，表示当前有节流操作正在进行
    ready = false
    // 然后设置一个定时器，在指定的时间间隔后，将 ready 设置为 true，表示可以再次执行 func。
    timer = setTimeout(() => {
      ready = true
      timer = undefined
    }, interval)
  }
  // 检查节流状态：isThrottled 方法通过检查 timer 是否为 undefined 来判断当前是否有节流操作正在进行
  throttled.isThrottled = () => {
    return timer !== undefined
  }
  return throttled
}
```

## partial

- 基本用法

partial 函数可以用于创建一个新函数，这个新函数在调用时只需要提供原始函数的一部分参数。这在需要多次调用同一个函数，但参数大部分相同的情况下非常有用

```ts
import { partial } from 'radash'

const add = (a: number, b: number) => a + b
const addFive = partial(add, 5)

addFive(2) // => 7
```

- 源码解析

```ts
// 这个类型的作用是从一个数组 TItems 中移除 TItemsToRemove 数组中的元素。具体实现原理如下：
// 如果条件为真，则返回 TRest，即移除了 TItemsToRemove 中的元素后的剩余部分。
// 如果条件为假，则返回 TItems，即原数组不变。
type RemoveItemsInFront<
  TItems extends any[],
  TItemsToRemove extends any[]
  // TItems extends [...TItemsToRemove, ...infer TRest]：这是一个条件类型，用于检查 TItems 是否可以扩展为 TItemsToRemove 后面跟着任意元素（TRest）。
> = TItems extends [...TItemsToRemove, ...infer TRest]
  ? // 如果条件为真，则返回 TRest，即移除了 TItemsToRemove 中的元素后的剩余部分。
    TRest
  : // 如果条件为假，则返回 TItems，即原数组不变。
    TItems

// T：表示原始函数的参数类型数组
// TA：表示部分应用的参数类型数组，它是 T 的子集
// R：表示原始函数的返回类型
export const partial = <T extends any[], TA extends Partial<T>, R>(
  // 原始函数，它接受一个参数数组 T 并返回一个值 R
  fn: (...args: T) => R,
  // 部分应用的参数，类型为 TA
  ...args: TA
) => {
  // 返回一个新的函数，这个新函数接受剩余的参数（类型为 RemoveItemsInFront<T, TA>）
  // 然后将所有参数合并后调用原始函数 fn
  return (...rest: RemoveItemsInFront<T, TA>) => fn(...([...args, ...rest] as T))
}
```

## partob

- 基本用法

现代 JavaScript 解构意味着许多开发人员、库和框架都选择采用包含参数的单个对象的一元函数。
`_.partob` 函数让您可以分解这些一元函数。

```ts
import { partob } from 'radash'

const add = (props: { a: number; b: number }) => props.a + props.b

const addFive = partob(add, { a: 5 })

addFive({ b: 2 }) // => 7
```

- 源码解析

```ts
export const partob = <T, K, PartialArgs extends Partial<T>>(
  // 参数 fn：这是一个函数，它接受一个类型为 T 的参数，并返回一个类型为 K 的值
  fn: (args: T) => K,
  // 参数 argobj：这是一个对象，它的类型是 PartialArgs，即 T 的部分类型
  argobj: PartialArgs
) => {
  // partob 函数返回一个新的函数，这个新函数接受一个类型为
  // Omit<T, keyof PartialArgs> 的参数，并返回一个类型为 K 的值
  return (restobj: Omit<T, keyof PartialArgs>): K =>
    // 实现：新函数在调用时，会使用 argobj 和传入的剩余参数来调用 fn
    // 它会将 argobj 和剩余参数合并成一个完整的 T 类型的对象，然后传递给 fn
    fn({
      ...(argobj as Partial<T>),
      ...(restobj as Partial<T>),
    } as T)
}
```

## proxied

创建动态代理对象

- 基本用法

Javascript 的 Proxy 对象功能强大，这里为定制用法。 `_.proxied` 函数为您创建代理，并在调用代理上的函数或访问属性时处理对处理程序的回调。

```ts
import { proxied } from 'radash'

type Property = 'name' | 'size' | 'getLocation'

const person = proxied((prop: Property) => {
  switch (prop) {
    case 'name':
      return 'Joe'
    case 'size':
      return 20
    case 'getLocation'
      return () => 'here'
  }
})

person.name // => Joe
person.size // => 20
person.getLocation() // => here
```

- 源码解析

```ts
export const proxied = <T, K>(
  // handler 是一个函数，接受一个类型为 T 的参数，并返回一个类型为 K 的值
  handler: (propertyName: T) => K
): Record<string, K> => {
  // 代理对象：proxied 函数返回一个通过 Proxy 创建的代理对象。这个代理对象拦截对它的属性访问
  return new Proxy(
    {},
    // 拦截器：代理对象的 get 拦截器会调用 handler 函数，并将被访问的属性名作为参数传递给 handler
    // handler 函数的返回值将作为代理对象属性的值。
    {
      get: (target, propertyName: any) => handler(propertyName),
    }
  )
}
```

这个函数可以用于创建一个动态的属性访问系统，其中属性的值是根据属性名动态计算的。这在需要根据属性名生成不同值的场景中非常有用，比如根据属性名从对象中获取值、根据属性名生成计算结果等。
