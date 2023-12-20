在构建代码并部署到生产环境之前，我们需要一个本地环境，用于运行我们开发的代码。这个环境相当于提供了一个简单的服务器，用于访问 webpack 构建好的静态文件，我们日常开发时可以使用它来调试前端代码。

webpack-dev-server 是 webpack 官方提供的一个工具，可以基于当前的 webpack 构建配置快速启动一个静态服务。当 mode 为 development 时，会具备 hot reload 的功能，即当源码文件变化时，会即时更新当前页面，以便你看到最新的效果。

## webpack-dev-server基础使用

    npm i webpack-dev-server -D
    webpack-dev-server --mode development

### 配置

在webpack配置中，可以通过devServer字段来配置

* `public` 字段用于指定静态服务的域名，默认是localhost:8080，当使用Nginx来做反向代理时，需要使用该配置指定Nginx配置使用的服务域名
* `port` 服务端口，默认是8080
* `publicPath` 指定构建好的静态文件在浏览器中用什么路径访问，默认是`/`. 若使用了HMR，要设置publicPath必须使用完整的URL

> 建议将devServer.publicPath和output.publicPath的值保持一致

* `proxy` 配置将特定URL请求代理到另一台服务上。
* proxy配置，当有单独的后端开发服务器用于请求api时，非常有用

```js
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    // target 如果是外网，要加上
    // changeOrigin: true
    pathRewrite: {
      '^/api': ''
    }
  }
}
```

> webpack-dev-server 的 proxy 功能是使用 http-proxy-middleware 来实现的，如果需要更详细的 proxy 配置，可以参考官方文档 [http-proxy-middleware](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fchimurai%2Fhttp-proxy-middleware)

* contentBase 用于配置提供额外静态文件内容的目录，之前提到的`publicPath`是配置构建好的结果以什么样的路径去访问，而`contentBase`是配置额外的静态文件内容的访问路径。

即那么不经过webpack构建，但是需要在webpack-dev-server中提供访问的静态资源（如部分图片等）推荐使用绝对路径：

```js
// 使用当前目录下的public
contentBase: path.join(__dirname, 'public')
// 也可以使用数组提供多个路径
contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')]
```

注：publicPath的优先级高于contentBase

* before和after配置用于在webpack-dev-server定义额外的中间件

```js
before(app) {
  app.get('/some/path', function(req, res) {
    // 当访问 /some/path 路径时，返回自定义的json数据
    res.json({custom: 'response'})
  })
}
```

`before`在webpack-dev-server静态资源中间件处理之前，可以用于拦截部分请求返回特定内容，或者实现简单的数据mock

`after`在webpack-dev-server静态资源中间件处理之后，可以用于打印日志或者额外处理。

更多可参考官方文档 [webpack-dev-server](https://link.juejin.im/?target=https%3A%2F%2Fdoc.webpack-china.org%2Fconfiguration%2Fdev-server%2F)

### webpack-dev-middleware

中间件就是在Express之类的Web框架中实现各种各样的功能的这一部分函数。多个中间件可以一起协同构建起一个完整的web服务器

可参考 [Express使用中间件](http://www.expressjs.com.cn/guide/using-middleware.html)

webpack-dev-middleware就是在Express提供webpack-dev-server静态服务能力的一个中间件，我们可以轻松集成现有的Express代码

    npm i webpack-dev-middleware -D

接着创建一个Node.js服务的脚本文件，如app.js:

```js
const webpack = require('webpack')
const middleware = require('middleware')
const webpackOptions = require('./webpack.config.js')

// 本地的开发环境默认就是使用 development mode
webpackOptions.mode = 'development'

const compiler = webpack(webpackOptions)
const express = require('express')
const app = express()

app.use(middleware(compiler, {
  // webpack-dev-middleware 的配置选项
}))

// 其他web服务中间件
// app.use(...)
app.listen(3000, () => console.log('Express app is listening on port 3000'))
```

使用webpack-dev-server好处是简单，而用webpack-dev-middleware的好处是在既有的Express代码基础上快速添加webpack-dev-server的功能，同时利用Express来根据需要添加更多功能，如mock服务、API代理等。

### 实现一个简单的mock服务

先基于Express App 实现一个简单mock功能的方法：

新建一个mock.js

```js
module.exports = function mock(app) {
  app.get('/some/path', (req, res) => {
    res.json({data: ''})
  })
  // 其他请求mock
  // 如果mock代码过多，尅将其拆分成多个代码文件，然后require进来
}
```

然后应用到配置中的`before`字段：

```js
const mock = require('./mock')
// 调用mock函数
before(app) {
  mock(app)
}
```

这样mock函数照样可以应用到Express中，提供与webpack-dev-middleware同样的功能。由于`app.get('', (req, res) => {...})` 的callback可以拿到req请求对象，其实可以根据参数来改变返回结果，即通过参数来模拟多种场景的返回数据来协助测试多种场景下的应用代码。
