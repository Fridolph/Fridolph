# Express 和 Koa

两者在 API 设计上精妙，源码也相对容易理解。

两者都对中间件有着强大的支持（文章都指 Koa2）

- express 依赖回调和递归
- koa 洋葱模型

## 说说 Node.js 的 Express 框架及其主要组件

Express 是一个基于 Node.js 的 web 应用程序框架，它可以帮助开发人员快速构建 Web 服务。它的主要组件包括：

- Router：路由器，用于定义路由规则，根据 URL 的不同路径映射到不同的处理器。

- Middleware：中间件，用于拦截 HTTP 请求，并对其进行预处理或后处理。

- View engine：视图引擎，用于渲染 HTML 模板。

- Body-parser：用于解析 POST 请求体中的内容，如表单数据和 JSON 数据。

- Cors：跨域资源共享模块，允许客户端向不同域名的服务器发起请求。

- Static：静态文件服务器，用于托管静态文件，如图片、CSS 和 JavaScript 文件。

Express 还支持`自定义错误处理器`、`HTTP 中间件`等功能，使得开发者可以轻松地搭建出高质量的 Web 服务。

## 用法

::: code-group

```js [express启http服务]
const express = require('express')

const app = express()
const router = express.Router()

app.use(async (req, res, next) => {
  console.log('I am the first middleware')
  next()
  console.log('first middleware end calling')
})
app.use((req, res, next) => {
  console.log('I am the second middleware')
  next()
  console.log('second middleware end calling')
})

router.get('/api/test1', async (req, res, next) => {
  console.log('I am the router middleware => /api/test1')
  res.status(200).send('hello')
})

router.get('/api/testerror', (req, res, next) => {
  console.log('I am the router middleware => /api/testerror')
  throw new Error('I am error.')
})

app.use('/', router)

app.use(async (err, req, res, next) => {
  if (err) {
    console.log('last middleware catch error', err)
    res.status(500).send('server Error')
    return
  }
  console.log('I am the last middleware')
  next()
  console.log('last middleware end calling')
})

app.listen(3000)
console.log('server listening at port 3000')
```

```js [koa等价代码]
const koa = require('koa')
const Router = require('koa-router')

const app = new koa()
const router = Router()

app.use(async (ctx, next) => {
  console.log('I am the first middleware')
  await next()
  console.log('first middleware end calling')
})

app.use(async (ctx, next) => {
  console.log('I am the second middleware')
  await next()
  console.log('second middleware end calling')
})

router.get('/api/test1', async (ctx, next) => {
  console.log('I am the router middleware => /api/test1')
  ctx.body = 'hello'
})

router.get('/api/testerror', async (ctx, next) => {
  throw new Error('I am error.')
})

app.use(router.routes())

app.listen(3000)
console.log('server listening at port 3000')
```

:::

二者的使用区别通过表格展示如下：

::: warning

- koa(Router = require('koa-router'))
- express(假设不使用 app.get 之类的方法)

:::

| 特性             | koa                      | express                         |
| ---------------- | ------------------------ | ------------------------------- |
| 初始化           | const app = new koa()    | const app = express()           |
| 实例化路由       | const router = Router()  | const router = express.Router() |
| app 级别的中间件 | app.use                  | app.use                         |
| 路由级别的中间件 | router.get               | router.get                      |
| 路由中间件挂载   | app.use(router.routes()) | app.use('/', router)            |
| 监听端口         | app.listen(3000)         | app.listen(3000)                |

从初始化就看出 koa 语法都是用的新标准。在挂载路由中间件上也有一定的差异性，这是因为二者内部实现机制的不同。其他都是大同小异的了。

那么接下去，我们的重点便是放在二者的中间件的实现上。

# 中间件的实现原理

## express.js 中间件

添加异步代码后，express 执行 console 的顺序就不符我们的预期了，为什么会这样呢？

### express 挂载中间件的方式

目前可以挂载中间件进去的有：(HTTP Method 指代那些 http 请求方法，诸如 Get/Post/Put 等等)

- app.use
- app.[HTTP Method]
- app.all
- app.param
- router.all
- router.use
- router.param
- router.[HTTP Method]

<Image src="/05node/express-1.png" alt="express中间件初始化" />

<Image src="/05node/express-2.png" alt="express中间件初始化-debug" />

看上面两张图，我们抛出下面几个问题，搞懂问题便是搞懂了初始化。

- 初始化模型图 Layer 实例为什么分两种？
- 初始化模型图 Layer 实例中 route 字段什么时候会存在？
- 初始化实例图中挂载的中间件为什么有 7 个？
- 初始化实例图中圈 2 和圈 3 的 route 字段不一样，而且 name 也不一样，为什么？
- 初始化实例图中的圈 4 里也有 Layer 实例，这个时候的 Layer 实例和上面的 Layer 实例不一样吗？

首先我们先输出这样的一个概念：Layer 实例是 path 和 handle 互相映射的实体，每一个 Layer 便是一个中间件。

这样的话，我们的中间件中就有可能嵌套中间件，那么对待这种情形，express 就在 Layer 中做手脚。我们分两种情况挂载中间件：

1. 使用 app.use、router.use 来挂载的

app.use 经过一系列处理之后最终也是调用 router.use 的

2. 使用 app.all、app.[Http Method]、app.route、router.all、router.[Http Method]、router.route 来挂载的

app.all、app.[Http Method]、app.route、router.all、router.[Http Method]经过一系列处理之后最终也是调用 router.route 的

`router.use` 该方法的最核心一段代码是：

```js
for (var i = 0; i < callbacks.length; i++) {
  var fn = callbacks[i]

  if (typeof fn !== 'function') {
    throw new TypeError('Router.use() requires a middleware function but got a ' + gettype(fn))
  }

  // add the middleware
  debug('use %o %s', path, fn.name || '<anonymous>')

  var layer = new Layer(
    path,
    {
      sensitive: this.caseSensitive,
      strict: false,
      end: false,
    },
    fn
  )

  // 注意这个route字段设置为undefined
  layer.route = undefined

  this.stack.push(layer)
}
```

此时生成的 Layer 实例对应的便是初始化模型图 1 指示的多个 Layer 实例，此时以 express.js 为例子，我们看初始化实例图圈 1 的所有 Layer 实例，会发现除了我们自定义的中间件(共 5 个)，还有两个系统自带的，看初始化实例图的 Layer 的名字分别是：query 和 expressInit。

二者的初始化是在 `[application.js]` 中的 `lazyrouter` 方法：

```js
app.lazyrouter = function lazyrouter() {
  if (!this._router) {
    this._router = new Router({
      caseSensitive: this.enabled('case sensitive routing'),
      strict: this.enabled('strict routing'),
    })

    this._router.use(query(this.get('query parser fn'))) // 最终调用的就是router.use方法
    this._router.use(middleware.init(this)) // 最终调用的就是router.use方法
  }
}
```

于是回答了我们刚才的第三个问题。7 个中间件，2 个系统自带、3 个 APP 级别的中间、2 个路由级别的中间件

- router.route

我们说过 app.all、app.[Http Method]、app.route、router.all、router.[Http Method]经过一系列处理之后最终也是调用 router.route 的，所以我们在 demo 中的 express.js，使用了两次 app.get，其最后调用了 router.route，我们看该方法核心实现：

```js
proto.route = function route(path) {
  var route = new Route(path)

  var layer = new Layer(
    path,
    {
      sensitive: this.caseSensitive,
      strict: this.strict,
      end: true,
    },
    route.dispatch.bind(route)
  )

  layer.route = route

  this.stack.push(layer)
  return route
}
```

这么简单的实现，与上一个方法的实现唯一的区别就是多了 new Route 这个。通过二者对比，我们可以回答上面的好几个问题：

- 初始化模型图 Layer 实例为什么分两种? 因为调用方式的不同决定了 Layer 实例的不同，第二种 Layer 实例是挂载在 route 实例之下的
- 初始化模型图 Layer 实例中 route 字段什么时候会存在？使用 router.route 的时候就会存在
- 初始化实例图中圈 2 和圈 3 的 route 字段不一样，而且 name 也不一样，为什么？圈 2 的 Layer 因为我们使用箭头函数，不存在函数名，所以 name 是 anonymous，但是圈 3 因为使用的 router.route，所以其统一的回调函数都是 route.dispath，因此其函数名字都统一是 bound dispatch，同时二者的 route 字段是否赋值也一目了然

最后一个问题，既然实例化 route 之后，route 有了自己的 Layer，那么它的初始化又是在哪里的？初始化核心代码：

```js
// router/route.js/Route.prototype[method]
for (var i = 0; i < handles.length; i++) {
  var handle = handles[i]

  if (typeof handle !== 'function') {
    var type = toString.call(handle)
    var msg = 'Route.' + method + '() requires a callback function but got a ' + type
    throw new Error(msg)
  }

  debug('%s %o', method, this.path)

  var layer = Layer('/', {}, handle)
  layer.method = method

  this.methods[method] = true
  this.stack.push(layer)
}
```

可以看到新建的 route 实例，维护的是一个 path，对应多个 method 的 handle 的映射。每一个 method 对应的 handle 都是一个 layer，path 统一为/。这样就轻松回答了最后一个问题了。

### express 中间件的执行逻辑

我们再把 express.js 的代码使用另外一种形式实现，这样你就可以完全搞懂整个流程了。

为了简化，我们把系统挂载的两个默认中间件去掉，把路由中间件去掉一个，最终的效果是：

```js
;((req, res) => {
  console.log('I am the first middleware')
  ;((req, res) => {
    console.log('I am the second middleware')
    ;(async (req, res) => {
      console.log('I am the router middleware => /api/test1')
      await sleep(2000)
      res.status(200).send('hello')
    })(req, res)
    console.log('second middleware end calling')
  })(req, res)
  console.log('first middleware end calling')
})(req, res)
```

因为没有对 await 或者 promise 的任何处理，所以当中间件存在异步函数的时候，因为整个 next 的设计原因，并不会等待这个异步函数 resolve,于是我们就看到了 sleep 函数的打印被放在了最后面，并且第一个中间件想要记录的请求时间也变得不再准确了~

但是有一点需要申明的是虽然打印变得奇怪，但是绝对不会影响整个请求，因为 response 是在我们 await 之后，所以请求是否结束还是取决于我们是否调用了 res.send 这类函数

## koa2 中间件

koa2 中间件的主处理逻辑放在了 `koa-compose`，也就是仅仅一个函数的事情：

```js
function compose(middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }
  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */
  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

每个中间件调用的 next()其实就是这个：

```js
dispatch.bind(null, i + 1)
```

还是利用闭包和递归的性质，一个个执行，并且每次执行都是返回 promise，所以最后得到的打印结果也是如我们所愿。那么路由的中间件是否调用就不是 koa2 管的，这个工作就交给了 koa-router，这样 koa2 才可以保持精简彪悍的风格。
再贴出 koa 中间件的执行流程吧：

<Image src="/05node/koa.gif" alt="koa2 中间件处理流程" />

## 参考

- [再也不怕学习自测你 express 和 koa 的区别了](https://juejin.cn/post/6844903968041091080)——小兀 666
