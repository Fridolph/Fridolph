# Promise 进阶用法

> Promise 有很多巧妙的高级用法，希望以下这些分享对工作和开发有益。

## Promise 数组的串行执行

场景：如果你有一组接口需要串行执行，你可能首先想到使用 await。

```js
const requestAry = [
  () => api.request1(),
  () => api.request2(),
  () => api.request3(),
  () => api.request4(),
  () => api.request5(),
]

for (const requestItem of requestAry) {
  await requestItem()
}
```

如果使用 promise，可以使用 then 函数串联多个 promise，实现串行执行。

```js
const requestAry = [
  () => api.request1(),
  () => api.request2(),
  () => api.request3(),
  () => api.request4(),
  () => api.request5(),
]
const finallyPromise = requestAry.reduce(
  (currentPromise, nextRequest) => currentPromise.then(() => nextRequest()),
  Promise.resolve()
  // 初始化一个Promise对象，用于链接数组中的Promise序列。
)
```

## 在新的 Promise 范围之内更改状态

场景：假设你有多个页面，其功能要求在允许使用之前收集用户信息。点击使用某个功能之前，会弹出一个弹框进行信息收集

- 思路 1：写一个模态框，然后复制粘贴到其他页面。效率非常高
- 思路 2：模态框这个不好维护。我们需要单独封装这个组件，并在需要的页面引入
- 思路 3：安装任何密封的东西！把方法调用写在所有页面都可以调用的地方不是更好吗？

以 vue3 为例，看一下下面的例子：

```vue
<!-- App.vue -->
<template>
  <!-- 以下是模态框组件部分 -->
  <div
    class="modal"
    v-show="visible">
    <div>User name: <input v-model="info.name" /></div>
    <!-- Other information -->
    <button @click="handleCancel">Cancel</button>
    <button @click="handleConfirm">Submit</button>
  </div>
  <!-- Page components -->
</template>
<script setup>
import { provide } from 'vue'
const visible = ref(false)
const info = reactive({
  name: '',
})
let resolveFn, rejectFn
// 将信息收集函数传递给下面的代码
provide('getInfoByModal', () => {
  visible.value = true
  return new Promise((resolve, reject) => {
    // 然后将这两个函数赋值给外部变量，从而突破promise的作用域限制
    resolveFn = resolve
    rejectFn = reject
  })
})
const handleConfirm = () => {
  resolveFn && resolveFn(info)
}
const handleCancel = () => {
  rejectFn && rejectFn(new Error('User has canceled'))
}
</script>
```

接下来，getInfoByModal 就可以通过直接调用模态框来轻松获取用户填写的数据。

```vue
<template>
  <button @click="handleClick">Fill in the information</button>
</template>
<script setup>
import { inject } from 'vue'
const getInfoByModal = inject('getInfoByModal')
const handleClick = async () => {
  // 调用后将显示模态框
  // 用户点击确认后，promise将转变为fulfilled状态，以获取用户信息
  const info = await getInfoByModal()
  await api.submitInfo(info)
}
</script>
```

## async / await 的替代用法

很多人只知道它是用来在调用 await 时接收 async 函数的返回值的，却不知道 async 函数它实际上是一个返回 promise 的函数。例如，以下两个函数是等效的：

```js
const fn1 = async () => 1
const fn2 = () => Promise.resolve(1)
fn1() // 同时返回一个值为1的promise对象
```

在大多数情况下，await 会跟随 Promise 对象并等待它完全填充。因此，下面的 fn1 函数 wait 也是等价的：

```js
await fn1()
const promiseInst = fn1()
await promiseInst
```

然而，await 也有一个鲜为人知的秘密。当它后面跟的值不是 promise 对象时，它会用 promise 对象包装该值，所以 await 后面的代码必须异步执行。例子：

```js
Promise.resolve().then(() => {
  console.log(1)
})
await 2
console.log(2)
//Print order bits: 1 2
```

相当于：

```js
Promise.resolve().then(() => {
  console.log(1)
})
Promise.resolve().then(() => {
  console.log(2)
})
```

## Promise 请求共享

```js
const promise = new Promise((resolve, reject) => {
  resolve()
  reject()
})
```

我们只需要记住，一旦待处理的 promise 从一种状态转移到另一种状态，就无法更改。因此，例子中是先转为 fulfilled 状态，然后 reject()就不会再转为 rejected 状态。

场景：当一个请求已经发出但尚未得到响应时，再次发出相同的请求，就会造成请求的浪费。此时，我们可以将第一个请求的响应与第二个请求共享

```js
request('GET', '/test-api').then(res1 => {
  // ...
})
request('GET', '/test-api').then(res2 => {
  // ...
})
```

上述两个请求实际上只发送一次，同时收到相同的响应值。

那么，请求共享有哪些使用场景呢：

1. 当页面渲染多个内部组件同时获取数据时

2. 提交按钮未禁用且用户连续多次点击提交按钮

3. 预加载数据的情况下，预加载完成之前进入预加载页面

这也是 alova 的高级功能之一。要实现请求共享，需要使用 promise 的缓存功能，即一个 promise 对象可以通过多次 await 获取数据。简单的实现思路如下：

```js
const pendingPromises = {}
function request(type, url, data) {
  // 使用请求信息作为唯一请求键来缓存正在被请求的promise对象
  // 具有相同键的请求将重用promise
  const requestKey = JSON.stringify([type, url, data])
  if (pendingPromises[requestKey]) {
    return pendingPromises[requestKey]
  }

  const fetchPromise = fetch(url, {
    method: type,
    data: JSON.stringify(data),
  })
    .then(res => res.json())
    .finally(() => {
      delete pendingPromises[requestKey]
    })

  return (pendingPromises[requestKey] = fetchPromise)
}
```

## 彻底明确 then / catch / finally 返回值

一句话概括就是，上面三个函数都会返回一个新的 promise 包装对象。包装后的值是执行回调函数的返回值。如果回调函数抛出错误，它将包装拒绝状态承诺。似乎不太容易理解，我们来看一个例子：

::: tip
我们可以将它们一一复制到浏览器控制台并运行它们以帮助理解
:::

### then 函数

```js
// 返回值是一个新的Promise(resolve => resolve(1))
Promise.resolve().then(() => 1)

// 返回一个新的Promise(resolve => resolve(Promise.resolve(2)))
Promise.resolve().then(() => Promise.resolve(2))

// 返回一个新的Promise(resolve => resolve(Promise.reject(new Error('abc'))))
Promise.resolve().then(() => {
  throw new Error('abc')
})

// 返回值是一个新的Promise(resolve => resolve(2))
Promise.reject().then(
  () => 1,
  () => 2
)
```

### catch 函数

```js
// 返回值是一个新的Promise(resolve => resolve(3))
Promise.reject().catch(() => 3)

// 返回值是一个新的Promise(resolve => resolve(使用catch的promise对象))
// PromiseResult -> undefined  catch函数返回值是undefined
Promise.resolve().catch(() => 4)
```

### finally 函数

```js
// 当finally函数返回非promise值时，返回finally函数之前的promise对象

// 返回Promise.resolve()
Promise.resolve().finally(() => {})

// 返回Promise.reject()
Promise.reject().finally(() => {})

// 当finally函数的返回值是promise时，等待返回的promise解析后
// 再返回finally函数之前的promise对象
Promise.resolve(5).finally(
  () =>
    new Promise(res => {
      setTimeout(res, 1000)
      // 返回一个处于pending状态的Promise，1秒后会解析为5。
    })
)

// 返回一个处于pending的Promise，1秒后会解析为6。
Promise.reject(6).finally(
  () =>
    new Promise(res => {
      setTimeout(res, 1000)
    })
)
```

## then 函数的第二次回调和 catch 回调有什么区别

当请求发生错误时，会触发 Promise 的 then 的第二个回调函数和 catch。乍一看没有区别，但实际上前者无法捕获 then 当前第一个回调函数中抛出的错误，但 catch 可以。

```js
Promise.resolve()
  .then(
    () => {
      throw new Error('Error from success callback')
    },
    () => {
      // will not be executed
    }
  )
  .catch(reason => {
    console.log(reason.message)
    // will print out "Error from success callback"
  })
```

原理就如上一点所说的。catch 函数是在 then 函数返回的处于拒绝状态的 Promise 上调用的，因此它的错误自然可以被捕获。

而 then 函数的第二个回调函数，它是在 then 函数返回的处于解决状态的 Promise 上调用的，因此它无法捕获前一个 then 函数的错误。

## Promise 实现 koa2 洋葱中间件模型

koa2 框架引入了洋葱模型，可以让你的请求像剥洋葱一样一层层进去，再一层层出来，从而实现请求前后处理的统一。

<Image src="/02js/onion.png" alt="koa2洋葱模型" />

我们来看一个简单的 koa2 洋葱模型：

```js
const app = new Koa()
app.use(async (ctx, next) => {
  console.log('a-start')
  await next()
  console.log('a-end')
})
app.use(async (ctx, next) => {
  console.log('b-start')
  await next()
  console.log('b-end')
})
app.listen(3000)
```

上面的输出是

- a-start
- b-start
- b-end
- a-end

这样神奇的输出序列是如何实现的呢？有人没天赋，简单的用 20 行左右的代码就实现了。

首先先保存中间件函数，在 listen 函数中收到请求后调用洋葱模型执行。

```js
function action(koaInstance, ctx) {
  // ...
}
class Koa {
  middlewares = []
  use(mid) {
    this.middlewares.push(mid)
  }
  listen(port) {
    // 伪代码模拟接收请求
    http.on('request', ctx => {
      action(this, ctx)
    })
  }
}
```

收到请求后，从第一个中间件开始串行执行 next 之前的前置逻辑。

```js
// Start 启动中间件调用
function action(koaInstance, ctx) {
  // 标识下一个要执行的中间件索引
  let nextMiddlewareIndex = 1

  // 定义下一个函数
  function next() {
    // 剥洋葱之前，调用next -> 会调用next中间件函数
    const nextMiddleware = middlewares[nextMiddlewareIndex]
    if (nextMiddleware) {
      nextMiddlewareIndex++
      nextMiddleware(ctx, next)
    }
  }

  //从第一个中间件函数开始执行，传入ctx和next函数
  middlewares[0](ctx, next)
}
```

然后继续处理 next 之后的 post 逻辑

```js
function action(koaInstance, ctx) {
  let nextMiddlewareIndex = 1
  function next() {
    const nextMiddleware = middlewares[nextMiddlewareIndex]
    if (nextMiddleware) {
      nextMiddlewareIndex++
      // 这里还添加了一个return 
      // 为了让中间件函数的执行 可以使用promise 从后往前串联执行
      //（建议反复理解这个return）!!!
      return Promise.resolve(nextMiddleware(ctx, next))
    } else {
      // 当最后一个中间件的前置逻辑执行完毕后
      // 返回完全填充的promise，并开始执行next之后的后置逻辑
      return Promise.resolve()
    }
  }
}
```

至此，一个简单的洋葱模型就实现了。

## 参考

- [8 个关于 Promise 高级用途的技巧](https://mp.weixin.qq.com/s/OK6k3-q_wvZrB0m9awp8SA)——前端大全
