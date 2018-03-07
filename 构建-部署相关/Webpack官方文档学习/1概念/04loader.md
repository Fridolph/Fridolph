# loader

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！

示例
例如，你可以使用 loader 告诉 webpack 加载 CSS 文件，或者将 TypeScript 转为 JavaScript。为此，首先安装相对应的 loader：

    npm install --save-dev css-loader
    npm install --save-dev ts-loader

然后指示 webpack 对每个 .css 使用 css-loader，以及对所有 .ts 文件使用 ts-loader：

```js
webpack.config.js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};
```

## 使用 Loader

在你的应用程序中，有三种使用 loader 的方式：

配置（推荐）：在 webpack.config.js 文件中指定 loader。
内联：在每个 import 语句中显式指定 loader。
CLI：在 shell 命令中指定它们。

**配置[Configuration]**

module.rules 允许你在 webpack 配置中指定多个 loader。 这是展示 loader 的一种简明方式，并且有助于使代码变得简洁。同时让你对各个 loader 有个全局概览：

## loader特性

* loader 支持链式传递。能够对资源使用流水线(pipeline)。一组链式的 loader 将按照相反的顺序执行。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript
* loader 可以是同步的，也可以是异步的
* loader 运行在 Node.js 中，并且能够执行任何可能的操作
* loader 接收查询参数。用于对 loader 传递配置
* loader 也能够使用 options 对象进行配置
* 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段
* 插件(plugin)可以为 loader 带来更多特性
* loader 能够产生额外的任意文件

loader 通过（loader）预处理函数，为 JavaScript 生态系统提供了更多能力。 用户现在可以更加灵活地引入细粒度逻辑，例如压缩、打包、语言翻译和其他更多

## 解析loader

loader 遵循标准的模块解析。多数情况下，loader 将从模块路径（通常将模块路径认为是 npm install, node_modules）解析。

loader 模块需要导出为一个函数，并且使用 Node.js 兼容的 JavaScript 编写。通常使用 npm 进行管理，但是也可以将自定义 loader 作为应用程序中的文件。按照约定，loader 通常被命名为 xxx-loader（例如 json-loader）。有关详细信息，[请查看如何编写 loader？](https://doc.webpack-china.org/contribute/writing-a-loader)