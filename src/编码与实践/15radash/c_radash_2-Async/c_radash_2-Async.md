# Async

之前的内容还挺简单，这一节内容的 async 对于异步的封装明显实用性和复杂度上了个台阶。虽然难啃，但确实很有用。我们继续开始吧

## all

all 函数类似于内置的 Promise.all 或 Promise.allSettled 函数。给定一个 Promise 列表（或对象），如果抛出任何错误，所有错误都会被收集并抛出到 AggregateError 中。

- 使用数组
  
将数组作为参数传递将按照相同的顺序将已解析的 Promise 值作为数组返回。

```ts
import { all } from 'radash'

const [user] = await all([
  api.users.create(...),
  s3.buckets.create(...),
  slack.customerSuccessChannel.sendMessage(...)
])
```

- 使用对象
  
将对象作为参数传递将返回一个与已解析的 Promise 值具有相同键和值的对象。

```ts
import { all } from 'radash'

const { user } = await all({
  user: api.users.create(...),
  bucket: s3.buckets.create(...),
  message: slack.customerSuccessChannel.sendMessage(...)
})
```

- 源码解析

该函数接受一个Promise数组或一个包含Promise的记录器，并返回一个包含所有Promise结果的Promise。如果任何错误发生，它们将被收集并抛出一个AggregateError。

```ts
// 函数重载，支持不同传参（用法，如例子中，既可以传数组，也可以传对象，先略过）
// 我们具体看一下源码中是如何对Promise.all进行封装的
export async function all<T extends [Promise<any>, ...Promise<any>[]]>(
  promises: T
): Promise<PromiseValues<T>>
// 函数重载，接受一个 Promise 对象的数组，并且返回值为这些 Promise 对象的结果的类型
export async function all<T extends Promise<any>[]>(
  promises: T
): Promise<PromiseValues<T>>
// 第三个重载，接受一个由字符串键值对应 Promise 对象的记录器对象，返回一个 Promise，其值为一个对象，包含每个 Promise 对象的结果，键对应输入对象的键
export async function all<T extends Record<string, Promise<any>>>(
  promises: T
): Promise<{ [K in keyof T]: Awaited<T[K]> }>
export async function all<
  T extends Record<string, Promise<any>> | Promise<any>[]
>(promises: T) {
  // 首先，函数检查输入是数组还是对象，进行对应处理
  const entries = isArray(promises)
    ? promises.map(p => [null, p] as [null, Promise<any>])
    : Object.entries(promises)
  // 这里根据输入参数 promises 的类型，将其转换为一个键值对数组 entries，其中如果是数组则用 null 作为键，如果是对象则用对象的键值对。
  
  // 这里使用 Promise.all 对所有 Promise 执行的结果进行并行处理，返回一个包含成功或失败结果的数组 results。
  const results = await Promise.all(
    entries.map(([key, value]) =>
      value
        .then(result => ({ result, exc: null, key }))
        .catch(exc => ({ result: null, exc, key }))
    )
  )

  // 筛选出那些执行过程中出现异常的结果，并将其存储在 exceptions 中
  const exceptions = results.filter(r => r.exc)

  // 如果有异常发生，会将所有异常收集起来并抛出一个 AggregateError 异常
  if (exceptions.length > 0) {
    throw new AggregateError(exceptions.map(e => e.exc))
  }

  // 如果输入参数是数组，则返回一个包含每个 Promise 结果的数组，否则返回一个不明确的数据类型
  if (isArray(promises)) {
    return results.map(r => r.result) as T extends Promise<any>[]
      ? PromiseValues<T>
      : unknown
  }

  // 将结果数组转换为一个对象，键为输入对象的键，值为对应 Promise 的结果
  return results.reduce(
    (acc, item) => ({
      ...acc,
      [item.key!]: item.result
    }),
    {} as { [K in keyof T]: Awaited<T[K]> }
  )
}
```

这段代码实现了一个功能强大的异步操作函数，能同时处理多个 Promise 对象并返回它们的结果，设计了多种输入类型的情况下的处理逻辑，确保了操作的稳定性和灵活性

## defer

运行带有延迟函数的异步函数

- 基本用法

_.defer 函数允许您运行一个异步函数，同时注册应该推迟执行的函数直到异步函数完成，然后执行这些函数。在脚本中，这非常有用，因为在或之后的特定点失败将需要一些清理工作。这有点类似于 finally 块。

传递给 `_.defer` 的函数带有一个注册函数参数，您可以使用它来注册希望在函数完成时调用的工作。如果您的函数抛出错误，然后注册的清理函数也抛出错误，默认情况下会被忽略。注册函数支持一个可选的第二个 options 参数，让您配置一个重新抛出策略，以便清理函数中的错误被重新抛出。

```ts
import { defer } from 'radash'

await defer(async (cleanup) => {
  const buildDir = await createBuildDir()

  cleanup(() => fs.unlink(buildDir))

  await build()
})

await defer(async (register) => {
  const org = await api.org.create()
  register(async () => api.org.delete(org.id), { rethrow: true })

  const user = await api.user.create()
  register(async () => api.users.delete(user.id), { rethrow: true })

  await executeTest(org, user)
})
```

- 源码实现

```ts
// 这里定义了一个异步函数 defer，该函数接受一个参数 func，是一个函数：

/* 
 * 为了便于理解，将参数单独拿出来
func: (
  register: (
    fn: (error?: any) => any,
    options?: { rethrow?: boolean }
  ) => void
) => Promise<TResponse>
 * 
 * 该函数接受一个 register 函数，用于注册回调函数，返回一个 Promise，
 * 最终返回一个泛型类型 TResponse 的 Promise
 *
 */
export const defer = async <TResponse>(
  func: (
    register: (
      fn: (error?: any) => any,
      options?: { rethrow?: boolean }
    ) => void
  ) => Promise<TResponse>
): Promise<TResponse> => {
  // 定义了一个空数组 callbacks，用于存储回调函数以及是否需要重新抛出异常的信息
  const callbacks: {
    fn: (error?: any) => any
    rethrow: boolean
  }[] = []

  // 定义了一个 register 函数，用于向 callbacks 数组中注册回调函数以及是否需要重新抛出异常
  const register = (
    fn: (error?: any) => any,
    options?: { rethrow?: boolean }
  ) =>
    callbacks.push({
      fn,
      rethrow: options?.rethrow ?? false
    })

  // 调用 tryit 函数，并将 func 函数和 register 函数作为参数传递
  // 将返回值解构为 err 和 response，用以处理可能发生的异常和异步函数的返回值
  const [err, response] = await tryit(func)(register)

  // 遍历注册的回调函数，每次执行一个回调函数并捕获可能的异常，根据 rethrow 标志来判断是否需要重新抛出异常
  for (const { fn, rethrow } of callbacks) {
    const [rethrown] = await tryit(fn)(err)
    // 如果在执行异步函数时发生了错误，直接抛出错误
    // 注：这里抛出错误循环退出，不会再继续执行循环了
    if (rethrown && rethrow) throw rethrown
  }
  if (err) throw err
  return response
}
```

主要原理是通过 register 函数来注册回调函数，在异步函数执行完成后依次执行这些回调函数，同时处理可能的异常情况。这种方式可以方便地延迟执行一系列函数，并在特定时机触发它们的执行，同时处理潜在的错误情况

## guard

如果函数出错则返回未定义

- 基本用法

如果异步函数出错，您可以设置默认值。

```ts
const users = (await guard(fetchUsers)) ?? []

// 您也可以选择仅保护特定错误
const isInvalidUserError = (err: any) => err.code === 'INVALID_ID'
const user = (await guard(fetchUser, isInvalidUserError)) ?? DEFAULT_USER
```

- 源码分析

```ts
// guard 函数，用于捕获可能发生的异常，并根据条件判断是否需要处理这些异常
export const guard = <TFunction extends () => any>(
  // 接受两个参数，一个是函数 func，
  func: TFunction,
  // 另一个是可选的 shouldGuard 函数，用于判断是否需要进行异常处理
  shouldGuard?: (err: any) => boolean
  // 这的代码看得头大，拆一下就好：都是返回类型，先不管，后面再回过头来看这部分 MARK
): ReturnType<TFunction> extends Promise<any>
  ? Promise<Awaited<ReturnType<TFunction>> | undefined>
  : ReturnType<TFunction> | undefined => {  

  // 定义了一个内部函数 _guard
  // 用于根据 shouldGuard 函数的返回值决定是否抛出异常
  const _guard = (err: any) => {
    if (shouldGuard && !shouldGuard(err)) throw err
    return undefined as any
  }

  // 定义了一个函数 isPromise，用于判断一个值是否为 Promise 类型
  const isPromise = (result: any): result is Promise<any> =>
    result instanceof Promise

  try {
    // 尝试执行传入的函数 func，根据返回值是 Promise 还是普通值来决定是直接返回值还是通过 catch 处理可能的异步异常
    const result = func()
    return isPromise(result) ? result.catch(_guard) : result
  } catch (err) {
    return _guard(err)
  }
  // 我们再看MARK部分：
  // 这里对函数返回类型进行了判断，如果是 Promise 类型，则返回一个包裹 Awaited<ReturnType<TFunction>> 类型的 Promise，否则直接返回函数的返回类型或者 undefined
}
```

这段代码实现了一个异常捕获和处理的功能，根据传入的条件和函数返回值的类型来决定是否对异常进行处理，以及如何返回结果。这种机制可以帮助在执行函数时对可能抛出的异常进行判断和处理，保证程序的稳定性和健壮性

## map

使用异步函数映射数组

- 基本用法
  
处理返回 Promise 的回调函数的映射。

```ts
import { map } from 'radash'

const userIds = [1, 2, 3, 4]

const users = await map(userIds, async (userId) => {
  return await api.users.find(userId)
})
```

- 源码解析
  
```ts
export const map = async <T, K>(
  // 接受只读数组 array 
  array: readonly T[],
  // 接受异步映射函数 asyncMapFunc，该函数将每个数组元素转换为另一种类型
  asyncMapFunc: (item: T, index: number) => Promise<K>
): Promise<K[]> => {
  // 如果传入的数组为空，则直接返回一个空数组
  if (!array) return []
  // 初始化一个空数组 result，用于存储映射后的结果
  let result = []
  // 初始化一个变量 index，用于跟踪当前处理的元素的索引
  let index = 0

  // 遍历数组中的每个元素，for of 循环遍历的是数组的值
  // 对每个元素调用异步映射函数 asyncMapFunc，并将映射后的结果存储到 result 数组中
  for (const value of array) {
    const newValue = await asyncMapFunc(value, index++)
    // 这里可结合例子来看，
    // newValue 是 asyncMapFunc 返回的结果，因为 asyncMapFunc 返回的是 Promise，所以这里需要使用 await 等待 Promise 完成
    // index在函数内定义了，有默认值，这里不需额外处理，这里直接存储到 result 数组中
    result.push(newValue)
  }
  // 返回映射后的结果数组 result
  return result
}
```

这段代码实现了一个异步的数组映射功能，遍历输入的数组，对每个元素应用异步映射函数，并将结果存储在一个新的数组中返回。这有助于在处理需要异步转换的数据集时，保持代码的简洁性和可读性。

## parallel

并行运行多个异步函数

- 基本用法

与 _.map 类似，但专门为并行运行异步回调函数而构建。第一个参数是允许同时运行的函数数量的限制。返回结果数组。

```ts
import { parallel, try as tryit } from 'radash'

const userIds1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const users1 = await parallel(3, userIds1, async (userId) => {
  return await api.users1.find(userId)
})


// 错误处理
// 当所有工作完成后，并行将检查错误。如果发生任何错误，它们都将被抛出到一个 AggregateError 中，该 AggregateError 具有一个错误属性，该属性是抛出的所有错误。
const userIds = [1, 2, 3]

const [err, users] = await tryit(parallel)(3, userIds, async (userId) => {
  throw new Error(`No, I don\'t want to find user ${userId}`)
})

console.log(err) // => AggregateError
console.log(err.errors) // => [Error, Error, Error]
console.log(err.errors[1].message) // => No, I don't want to find user 2
```

- 源码分析
  
```ts
export const parallel = async <T, K>(
  // limit 表示并行处理的限制数量
  limit: number,
  // array 是包含待处理项的只读数组
  array: readonly T[],
  // func 是一个处理每个数组项的异步函数
  func: (item: T) => Promise<K>
): Promise<K[]> => {

  // 将输入的数组转换为包含 index 和 item 的对象数组，用于并行处理
  const work = array.map((item, index) => ({
    index,
    item
  }))

  // 定义了一个 processor 函数，接收一个函数res作为参数，用于处理数组中的每个项：
  // 这个程序的主要作用是将一个长队列（work）分割成多个小队列，然后逐个处理每个小队列中的项目。
  // 在处理过程中，它会将每个项目的结果存储在一个results数组中，直到处理完整个队列
  const processor = async (
    // 函数接收一个WorkItemResult<K>类型的数组作为参数，返回一个空函数
    res: (value: WorkItemResult<K>[]) => void
  ) => {

    // 定义一个results数组，用于存储处理过程中的结果
    const results: WorkItemResult<K>[] = []

    // 使用while (true)循环来处理队列
    while (true) {
      // 在循环中，使用work.pop()方法从队列中获取一个项目
      const next = work.pop()
      // 如果获取到的项目为空（即队列为空），则跳出循环，并调用res函数将处理结果返回
      if (!next) return res(results)

      // 对于每个项目，使用tryit(func)(next.item)尝试执行项目，并将结果存储在一个元组中
      const [error, result] = await tryit(func)(next.item)

      // 将元组中的error和result分别赋值给results数组中的新项
      results.push({
        error,
        result: result as K,
        index: next.index
      })
    }
  }

  // 创建了多个 Promise 对象，每个 Promise 对象都执行 processor 函数，并构成一个处理队列
  const queues = list(1, limit).map(() => new Promise(processor))

  // 等待所有队列中的 Promise 对象都完成，并将结果存储在 itemResults 中
  const itemResults = (await Promise.all(queues)) as WorkItemResult<K>[][]

  // 对处理结果进行分离，(fork 方法之前有提到：按条件将数组拆分为两个数组)
  // 将结果中的错误和正确处理的数据分别存储在 errors 和 results 中
  const [errors, results] = fork(
    sort(itemResults.flat(), r => r.index),
    x => !!x.error
  )

  // 如果存在错误，抛出一个包含所有错误的 AggregateError 异常
  if (errors.length > 0) {
    throw new AggregateError(errors.map(error => error.error))
  }

  // 最后返回：处理成功的结果数据
  return results.map(r => r.result)
}
```

## reduce

使用异步函数减少数组

- 基本用法
  
处理返回承诺的回调函数的reduce。

```ts
import { reduce } from 'radash'

const userIds = [1, 2, 3, 4]

const users = await reduce(userIds, async (acc, userId) => {
  const user = await api.users.find(userId)
  return {
    ...acc,
    [userId]: user
  }
}, {})
```

- 源码解析

```ts
export const reduce = async <T, K>(
  array: readonly T[],
  asyncReducer: (acc: K, item: T, index: number) => Promise<K>,
  initValue?: K
): Promise<K> => {
  // 检查是否提供了初始值，如果提供了， initProvided 为 true
  const initProvided = initValue !== undefined

  // 如果没有提供初始值，且数组为空，则抛出错误，因为无法对空数组进行相关操作
  if (!initProvided && array?.length < 1) {
    throw new Error('Cannot reduce empty array with no init value')
  }

  // 如果提供了初始值，则 iter 为原数组，否则 iter 为去掉第一个元素的数组
  const iter = initProvided ? array : array.slice(1)
  
  // 初始化 reduce 的结果值 value，如果提供了初始值，则为初始值，否则为数组的第一个元素
  let value: any = initProvided ? initValue : array[0]

  // 遍历 iter 中的每个元素，对 value 和当前元素应用异步 reduce 函数，更新 value 的值
  for (const [i, item] of iter.entries()) {
    value = await asyncReducer(value, item, i)
  }

  // 返回最终经过异步 reduce 后得到的结果值
  return value
}
```

这段代码实现了一个异步reduce函数，可以对数组中的每个元素依次应用一个异步 reduce 函数，得到最终的结果值。适用于需要在处理过程中保持异步性质的情况，例如异步处理数组中的数据并将它们合并为一个结果


## sleep 

异步等待时间过去

- 基本用法

_.sleep 函数允许您以毫秒为单位进行延迟。

```ts
import { sleep } from 'radash'

await sleep(2000) // => waits 2 seconds
```

- 源码解析

```ts
// 表示要延迟的毫秒数
export const sleep = (milliseconds: number) => {
  // 返回一个 Promise 对象，这个 Promise 会在指定的毫秒数后自动 resolve（正常结束）。
  // setTimeout 函数用于在指定的毫秒数后执行一个函数，这里的 res 就是 Promise 的 resolve 函数，
  // 设置了等待的时间后自动触发 resolve，从而结束延迟状态。
  return new Promise(res => setTimeout(res, milliseconds))
}
```

简单却实用。sleep 函数可用于实现延迟执行，比如在编写异步代码时需要等待一段时间后再执行下一步操作，或者在测试代码中模拟延迟情况。通常在需要等待或延迟执行的情况下会用到类似的实现。

## retry

运行异步函数，如果失败则重试

- 基本用法

`_.retry` 函数允许您运行异步函数并在失败时自动重试。给定要运行的异步函数、可选的最大重试次数 (r) 以及重试之间的可选延迟毫秒数 (d)，将调用给定的异步函数，重试 r 多次，并在重试之间等待 d 毫秒。

times 选项默认为 3。delay 选项（默认为 null）可以指定尝试之间休眠的毫秒数。
退避选项类似于延迟，但使用一个函数来休眠——可以轻松实现指数退避。

```ts
import { retry } from 'radash'

await retry({}, api.users.list)
await retry({ times: 10 }, api.users.list)
await retry({ times: 2, delay: 1000 }, api.users.list)

// exponential backoff
await retry({ backoff: i => 10**i }, api.users.list)
```

- 源码解析

```ts
export const retry = async <TResponse>(
  // options 是一个包含重试次数、延迟和退避函数的对象
  options: {
    times?: number
    delay?: number | null
    backoff?: (count: number) => number
  },
  // func 是包含退出错误函数的异步操作
  func: (exit: (err: any) => void) => Promise<TResponse>
): Promise<TResponse> => {

  // 获取重试次数，如果未提供，默认为3次
  const times = options?.times ?? 3

  // 获取延迟时间，如果未提供则为 undefined。这里可能会问上面不是定了 number | null吗？
  // 这里为可选项，没传，number、null是undefined的子类型，所以是 undefined
  const delay = options?.delay

  // 获取 backoff 函数，如果未提供则为 null
  const backoff = options?.backoff ?? null

  // 从1到设定的重试次数遍历
  for (const i of range(1, times)) {
    // 调用 tryit 函数以尝试执行传入的异步操作函数，并在发生错误时抛出一个包含错误信息的对象
    const [err, result] = (await tryit(func)((err: any) => {
      throw { _exited: err }
    })) as [any, TResponse]

    // 如果没有错误发生，直接返回结果
    if (!err) return result

    // 如果出错原因是程序退出，则抛出退出错误
    if (err._exited) throw err._exited

    // 如果当前重试次数达到设定的最大次数，则直接抛出错误
    if (i === times) throw err

    // 如果设置了延迟时间，等待相应的延迟
    if (delay) await sleep(delay)

    // 如果设置了退避函数，根据当前重试次数调整等待时间
    if (backoff) await sleep(backoff(i))
  }

  // 这段注释代码通常不应该执行到，用于满足函数的严格模式要求
  return undefined as unknown as TResponse
}
```

这段代码实现了一个具有重试功能的异步操作函数。通过设置重试次数、延迟和退避策略，实现在出现错误时重复执行异步操作，直至成功或达到最大重试次数。这对于处理一些不稳定的操作或需要容错处理的异步任务非常有用

## tryit

将函数转换为错误优先函数

- 基本用法

错误优先回调真的太酷了（这梗时效期应该过了… = =） 在执行 try/catch 时使用可变变量来提升状态并不酷。
tryit 函数让您可以包装一个函数，将其转换为错误优先函数。适用于异步和同步功能。

```ts
import { tryit } from 'radash'

const userId = 'xxx'
const [err, user] = await tryit(api.users.find)(userId)

// 也可以运用柯里化
const findUser = tryit(api.users.find)
const [err, user] = await findUser(userId)
```

- 源码解析

```ts
export const tryit = <Args extends any[], Return>(
  // 定义了一个名为 tryit 的函数，它接受一个函数 func，该函数可以接受任意类型的参数并返回一个值
  func: (...args: Args) => Return
) => {
  return (
    // 这里的 ...args 表示接受任意数量的参数，参数的类型由 Args 泛型指定
    ...args: Args
  ): Return extends Promise<any>
    ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
    : [Error, undefined] | [undefined, Return] => {
    try {
      // 调用传入的函数 func 执行操作，并获取其返回结果
      const result = func(...args)

      // 判断函数返回的结果是否是一个 Promise 对象
      if (isPromise(result)) {
        // 如果结果是一个 Promise 对象，则返回一个 Promise，将成功时的值和失败时的错误进行封装
        return result
          .then(value => [undefined, value])
          .catch(err => [err, undefined]) as Return extends Promise<any>
          ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
          : [Error, undefined] | [undefined, Return]
      }

      // 如果结果不是 Promise 对象，则直接返回执行结果
      return [undefined, result] as Return extends Promise<any>
        ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
        : [Error, undefined] | [undefined, Return]
    } catch (err) {
      // 如果在执行中捕获到错误，返回一个包含错误信息的数组
      return [err as any, undefined] as Return extends Promise<any>
        ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
        : [Error, undefined] | [undefined, Return]
    }
  }
}
```

这个 tryit 函数会执行传入的函数，并根据函数的返回值类型是 Promise 还是普通值，返回不同格式的结果数组。它允许在函数执行过程中处理同步和异步操作，并将结果进行适当的封装以便进行进一步处理