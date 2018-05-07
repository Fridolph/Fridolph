## 用HMR提高开发效率

Hot Module Replacement，即模块热替换。在这个概念出来前，我们使用过Hot Reloading，当代码变更通知浏览器刷新。HMR可理解为增强版，但不用刷新页面，而是局部替换部分模块代码使之生效

### 配置使用HMR

HMR需在安装好webpack-dev-server后添加一些简单配置

```js
const webpack = require('webpack')
module.exports = {
  devServer: {
    hot: true
  },
  plugins: [
    // 用于启动HMR时可以显示模块的相对路径
    new webpack.NamedModulesPlugin(),
    // HMR插件
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

### HMR的运行原理

![HMR的运行原理](https://user-gold-cdn.xitu.io/2018/3/19/1623bffb086c3918?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

首先我们要知道：webpack内部运行时，会维护一份用于管理构建代码时各个模块之间的表数据，官方称为`manifest`。其中包括入口代码文件和构建出来的bundle文件的对应关系。[WebpackManifestPlugin](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fdanethurber%2Fwebpack-manifest-plugin)

该插件可输出这样一份数据，然后我们看上图：

当使用支持HMR的server在浏览器打开页面，可看到控制流程

![](https://user-gold-cdn.xitu.io/2018/3/19/1623c0004b223528?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

开启了 hot 功能的 webpack 会往我们应用的主要代码中添加 WS 相关的代码，用于和服务器保持连接，等待更新动作。

当你配置了 HMR 的插件时，会往应用代码中添加 HMR 运行时的代码，主要用于定义代码模块应用更新时的 API，后面会详细介绍。

有兴趣可以查看源码：[HotModuleReplacement.runtime.js](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fwebpack%2Fwebpack%2Fblob%2Fmaster%2Flib%2FHotModuleReplacement.runtime.js)
