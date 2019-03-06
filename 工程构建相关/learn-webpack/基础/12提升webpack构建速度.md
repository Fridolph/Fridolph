## 让webpack少做点事

提升webpack构建速度的本质就是让webpack少干点事，活少了速度就快了，所以应尽量避免webpack去做一些不必要的事情

### 减少resolve的解析

直接上代码:

```js
resolve: {
  modules: [
    path.resolve(__dirname, 'node_modules')
    // 使用绝对路径指定node_modules 不做过多查询
  ],

  // 删除不必要的后缀自动不全，少了文件后缀名的自动匹配，即减少了文件路径查询工作
  extentions: ['.js'],

  // 避免新增默认文件，编码时使用详细的文件路径，代码更易阅读
  mainFiles: ['index']
}
```

### 把loader应用的文件范围缩小

例如node_modules目录下的其他依赖类库文件，基本就是直接编译好可用的代码，无需再经过loader处理

```js
rules: [
  {
    test: /\.jsx?/,
    include: [
      path.resolve(__dirname, 'src'),
      // 限定只在src目录下的js/jsx文件需要经babel-loader处理
      // 通常我们需要loader处理的文件都存放在src目录
    ],
    usr: 'babel-loader'
  }
]
```

### 减少plugin消耗

webpack 的 plugin 会在构建的过程中加入其它的工作步骤，如果可以的话，适当地移除掉一些没有必要的 plugin。

这里再提一下 webpack 4.x 的 mode，区分 mode 会让 webpack 的构建更加有针对性，更加高效。例如当 mode 为 development 时，webpack 会避免使用一些提高应用代码加载性能的配置项，如 UglifyJsPlugin，ExtractTextPlugin 等，这样可以更快地启动开发环境的服务，而当 mode 为 production 时，webpack 会避免使用一些便于 debug 的配置，来提升构建时的速度，例如极其消耗性能的 Source Maps 支持。

### 换种方式处理图片

我们在前边的小节提到图片可以使用 webpack 的 image-webpack-loader 来压缩图片，在对 webpack 构建性能要求不高的时候，这样是一种很简便的处理方式，但是要考虑提高 webpack 构建速度时，这一块的处理就得重新考虑一下了，思考一下是否有必要在 webpack 每次构建时都处理一次图片压缩。

这里介绍一种解决思路，我们可以直接使用 imagemin 来做图片压缩，编写简单的命令即可。然后使用 pre-commit 这个类库来配置对应的命令，使其在 git commit 的时候触发，并且将要提交的文件替换为压缩后的文件。

这样提交到代码仓库的图片就已经是压缩好的了，以后在项目中再次使用到的这些图片就无需再进行压缩处理了，image-webpack-loader 也就没有必要了。

### webpack 4.x 的构建性能

了解一下重要改进：

* [AST](https://link.juejin.im/?target=https%3A%2F%2Fzh.wikipedia.org%2Fzh-hans%2F%25E6%258A%25BD%25E8%25B1%25A1%25E8%25AA%259E%25E6%25B3%2595%25E6%25A8%25B9) 可以直接从 loader 直接传递给 webpack，避免额外的解析，对这一个优化细节有兴趣的可以查看这个 [PR](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fwebpack%2Fwebpack%2Fpull%2F5925)

* 使用速度更快的 md4 作为默认的 hash 方法，对于大型项目来说，文件一多，需要 hash 处理的内容就多，webpack 的 hash 处理优化对整体的构建速度提升应该还是有一定的效果的

* Node 语言层面的优化，如用 for of 替换 forEach，用 Map 和 Set 替换普通的对象字面量等等，这一部分就不展开讲了，有兴趣的同学可以去 webpack 的 PRs 寻找更多的内容

* 默认开启 uglifyjs-webpack-plugin 的 cache 和 parallel，即缓存和并行处理，这样能大大提高 production mode 下压缩代码的速度
