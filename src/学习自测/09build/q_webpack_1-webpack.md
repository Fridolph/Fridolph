# Webpack

## Babel 的原理是什么

::: details babel 的转译过程也分为三个阶段

- `解析 Parse` 将代码解析生成抽象语法树（AST），即词法分析与语法分析的过程；
- `转换 Transform` 对于 AST 进行变换⼀系列的操作，babel 接受得
  到 AST 并通过 `babel-traverse` 对其进行遍历，在此过程中进行添加、更新及移除等操作；
- `生成 Generate` 将变换后的 AST 再转换为 JS 代码, 使⽤到的模块是 `babel-generator`。

:::

## Webpack 是什么

::: details

webpack 是一个模块打包器。webpack 的主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用，但它也能够胜任转换(transform)、打包(bundle)。

:::

## 说一下 webpack 的构建流程

::: details 简单版：

- 初始化：启动`构建`，`读取与合并配置参数`，`加载 Plugin`，`实例化 Compiler`
- 编译：从 `Entry` 出发，针对每个 Module 串行调用对应的 `Loader` 去翻译文件的内容，再找到该 `Module 依赖`的 Module，`递归地进行编译处理`
- 输出：将编译后的 Module 组合成 `Chunk`，将 Chunk `转换成文件`，`输出到文件`系统中

:::

较为完整的回答：

::: details Webpack 的运行流程是⼀个串行的过程，从启动到结束会`依次执行`以下流程：

1. **初始化参数**：解析 webpack 配置参数，合并 shell 传入和 webpack.config.js 文件配置的参数，形成最后的配置结果。
2. **开始编译**：上一步得到的参数初始化`compiler`对象，注册所有配置的插件，插件监听 webpack 构建生命周期的事件节点，做出相应的反应，执行对象的 run 方法开始执行编译。
3. **确定入口**：从配置的`entry`入口，开始`解析文件`构建 AST 语法树，`找出依赖`，`递归`下去。
4. **编译模块**：递归中根据`文件类型`和`loader配置`，调用所有配置的 loader 对`文件转换`，再找出该`模块依赖`的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
5. **完成模块编译**：在经过第 4 步使⽤ Loader 翻译完所有模块后，得到了每个模块被翻译后的`最终内容`以`及它们之间的依赖关系`；
6. **输出资源**：根据⼊⼝和模块之间的依赖关系，组装成⼀个个包含多个模块的 `Chunk`，再把每个 Chunk 转换成⼀个单独的⽂件加⼊到输出列表，这步是可以修改输出内容的最后机会；
7. **输出完成**：在确定好输出内容后，根据配置确定输出的路径和⽂件名，把⽂件内容`写⼊到⽂件`系统。

:::

## 相关使用

### 有哪些常见 loader

::: details 实际不用报菜名，有个了解就好

- raw-loader：加载文件原始内容（utf-8）
- `file-loader`：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件 (处理图片和字体)
- `url-loader`：与 file-loader 类似，区别是用户可以设置一个阈值，大于阈值会交给 file-loader 处理，小于阈值时返回文件 base64 形式编码 (处理图片和字体)
- source-map-loader：加载额外的 Source Map 文件，以方便断点调试
- svg-inline-loader：将压缩后的 SVG 内容注入代码中
- `image-loader`：加载并且压缩图片文件
- json-loader 加载 JSON 文件（默认包含）
- `babel-loader`：把 ES6 转换成 ES5
- ts-loader: 将 TypeScript 转换成 JavaScript
- awesome-typescript-loader：将 TypeScript 转换成 JavaScript，性能优于 ts-loader
- sass-loader：将 SCSS/SASS 代码转换成 CSS
- `css-loader`：加载 CSS，支持模块化、压缩、文件导入等特性
- `style-loader`：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS
- postcss-loader：扩展 CSS 语法，使用下一代 CSS，可以配合 autoprefixer 插件自动补齐 CSS3 前缀
- eslint-loader：通过 ESLint 检查 JavaScript 代码
- tslint-loader：通过 TSLint 检查 TypeScript 代码
- coverjs-loader：计算测试的覆盖率
- `vue-loader`：加载 Vue.js 单文件组件
- i18n-loader: 国际化
- `cache-loader`: 可以在一些性能开销较大的 Loader 之前添加，目的是将结果缓存到磁盘里

:::

### 有哪些常见的 Plugin

::: details

- define-plugin：定义环境变量 (Webpack4 之后指定 mode 会自动配置)
- ignore-plugin：忽略部分文件
- html-webpack-plugin：简化 HTML 文件创建 (依赖于 html-loader)
- web-webpack-plugin：可方便地为单页应用输出 HTML，比 html-webpack-plugin 好用
- `uglifyjs-webpack-plugin`：不支持 ES6 压缩 (Webpack4 以前)
- `terser-webpack-plugin`: 支持压缩 ES6 (Webpack4)
- `webpack-parallel-uglify-plugin`: 多进程执行代码压缩，提升构建速度
- `mini-css-extract-plugin`: 分离样式文件，CSS 提取为独立文件，支持按需加载 (替代 extract-text-webpack-plugin)
- serviceworker-webpack-plugin：为网页应用增加离线缓存功能
- clean-webpack-plugin: 目录清理
- `ModuleConcatenationPlugin`: 开启 Scope Hoisting
- speed-measure-webpack-plugin: 可以看到每个 Loader 和 Plugin 执行耗时 (整个打包耗时、每个 Plugin 和 Loader 耗时)
- `webpack-bundle-analyzer`: 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)

:::

### 说一说 Loader 和 Plugin 的区别

::: details

| 特性     | Loader                                                                                                                                     | Plugin                                                                                                                                                |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 从本质上 | 是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果                                                                             | 为插件，可扩展 Webpack 的功能，在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果 |
| 从配置上 | 在 `module.rules` 中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性。 | 在 `plugins` 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入                                                               |

:::

### 用过哪些可以提高效率的插件

::: details

- webpack-dashboard：可以更友好的展示相关打包信息。
- webpack-merge：提取公共配置，减少重复配置代码
- speed-measure-webpack-plugin：简称 SMP，分析出 Webpack 打包过程中 Loader 和 Plugin 的耗时，有助于找到构建过程中的性能瓶颈。
- size-plugin：监控资源体积变化，尽早发现问题
- HotModuleReplacementPlugin：模块热替换

:::

### 简单描述一下编写 loader 的思路

> Loader 的 API 可以去官网查阅

::: details
Loader `支持链式调用`，所以开发上需要严格遵循`“单一职责”`，每个 Loader 只负责自己需要负责的事情。

- Loader 运行在 Node.js 中，我们可以调用任意 Node.js 自带的 API 或者安装第三方模块进行调用
- Webpack 传给 Loader 的原内容都是 UTF-8 格式编码的字符串，当某些场景下 Loader 处理二进制文件时，需要通过 exports.raw = true 告诉 Webpack 该 Loader 是否需要二进制数据
- 尽可能的异步化 Loader，如果计算量很小，同步也可以
- Loader 是无状态的，我们不应该在 Loader 中保留状态
- 使用 loader-utils 和 schema-utils 为我们提供的实用工具
- 加载本地 Loader 方法
  - npm link
  - ResolveLoader

:::

### 简单描述一下编写 Plugin 的思路

> Plugin 的 API 可以去官网查阅

::: details
**webpack 在运行的生命周期中会广播出许多事件**，Plugin 可以`监听这些事件`，在特定的阶段通过钩子添加自定义功能。Webpack 的 `Tapable 事件流机制`保证了插件的有序性，使得整个系统扩展性良好。

- compiler 暴露了和 Webpack 整个生命周期相关的钩子
- compilation 暴露了与模块和依赖有关的粒度更小的事件钩子
- 插件需要在其原型上绑定 apply 方法，才能访问 compiler 实例
- 传给每个插件的 compiler 和 compilation 对象都是同一个引用，若在一个插件中修改了它们身上的属性，会影响后面的插件

找出合适的事件点去完成想要的功能：

- emit 事件发生时，可以读取到最终输出的资源、代码块、模块及其依赖，并进行修改(emit 事件是修改 Webpack 输出资源的最后时机)
- watch-run 当依赖的文件发生变化时会触发
- 异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然会卡住
  :::

## 原理

### Webpack 模块打包原理

::: details
Webpack 实际上为每个模块创造了一个可以导出和导入的环境，`本质上并没有修改代码的执行逻辑`，代码**执行顺序与模块加载顺序也完全一致**。
:::

### Webpack 文件监听原理

在发现源码发生变化时，自动重新构建出新的输出文件。Webpack 开启监听模式：

::: details 有两种方式

- 启动 webpack 命令时，带上 `--watch` 参数
- 在配置 webpack.config.js 中设置 `watch:true`

缺点：每次需要手动刷新浏览器

原理：`轮询`判断文件的`最后编辑时间`是否变化，如果某个文件发生了变化，并不会立刻告诉监听者，而是先`缓存`起来，等 `aggregateTimeout` 后再执行。
:::

### Webpack 的热更新原理

::: details

Webpack 的热更新又称热替换（Hot Module Replacement），缩写为 `HMR`。 这个机制可以做到**不用刷新浏览器而将新变更的模块替换掉旧的模块**。

HMR 的核心就是客户端从服务端拉取更新后的文件，准确的说是 `chunk diff` (chunk `需要更新的部分`)

1.  Webpack Dev Server 与浏览器之间维护了一个 `Websocket`
2.  当本地资源发生变化时，WDS 会`向浏览器推送更新`，并带上构建时的 hash，让客户端`与上一次资源进行对比`
3.  客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容(文件列表、hash)
4.  这样客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该 chunk 的增量更新。
5.  `后续的部分`(拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？) `由 HotModulePlugin 来完成`，提供了相关 API 以供开发者针对自身场景进行处理，像 react-hot-loader 和 vue-loader 都是借助这些 API 实现 HMR。

:::

### Babel 原理

大多数 JavaScript Parser 遵循 estree 规范，Babel 最初基于 acorn 项目(轻量级现代 JavaScript 解析器) Babel 大概分为三大部分：

::: details

- 解析：将代码转换成 AST
  - 词法分析：将代码(字符串)分割为 token 流，即语法单元成的数组
  - 语法分析：分析 token 流(上面生成的数组)并生成 AST
- 转换：访问 AST 的节点进行变换操作生产新的 AST
  - Taro 就是利用 babel 完成的小程序语法转换
- 生成：以新的 AST 为基础生成代码
  :::

## 优化

### 如何利用 Webpack 优化性能

就像能不能说一说「从 URL 输入到页面显示发生了什么」一样，同理优化 Vite 构建速度

#### 减少耗时，减少请求次数

::: details

- 使用`高版本`的 Webpack 和 Node.js

`缩小打包作用域`，如：

- exclude/include (确定 loader 规则范围)
- resolve.modules 指明第三方模块的绝对路径 (减少不必要的查找)
- resolve.mainFields 只采用 main 字段作为入口文件描述字段 (减少搜索步骤，需要考虑到所有运行时依赖的第三方模块的入口文件描述字段)
- resolve.extensions 尽可能减少后缀尝试的可能性
- noParse 对完全不需要解析的库进行忽略 (不去解析但仍会打包到 bundle 中，注意被忽略掉的文件里不应该包含 import、require、define 等模块化语句)
- IgnorePlugin (完全排除模块)
- 合理使用 alias

`充分利用缓存`：

- babel-loader 开启缓存
- terser-webpack-plugin 开启缓存
- 使用 cache-loader 或者 hard-source-webpack-plugin
  :::

#### 资源压缩，减小代码体积

::: details

- `压缩代码`
  - 多进程并行压缩
    1. webpack-paralle-uglify-plugin
    2. uglifyjs-webpack-plugin 开启 parallel 参数 (不支持 ES6)
    3. terser-webpack-plugin 开启 parallel 参数
  - 通过 mini-css-extract-plugin 提取 Chunk 中的 CSS 代码到单独文件，通过 css-loader 的 minimize 选项开启 cssnano 压缩 CSS
- `图片压缩`
  - 使用基于 Node 库的 imagemin (很多定制选项、可以处理多种图片格式)
  - 配置 image-webpack-loader
- `提取页面公共资源`
  - 使用 `html-webpack-externals-plugin`，将基础包通过 CDN 引入，不打入 bundle 中
  - 使用 `SplitChunksPlugin` 把公共脚本、基础包、页面公共文件等进行分离(Webpack4 内置) ，替代了 CommonsChunkPlugin 插件
- `DLL`
  - 使用 `DllPlugin` 进行分包，使用 DllReferencePlugin(索引链接) 对 manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间
  - HashedModuleIdsPlugin 可以解决模块数字 id 问题
- `Tree shaking`
  - 打包过程中检测工程中没有引用过的模块并进行标记，在资源压缩时将它们从最终的 bundle 中去掉(只能对 ES6 Modlue 生效) 开发中尽可能使用 ES6 Module 的模块，提高 tree shaking 效率
  - 禁用 babel-loader 的模块依赖解析，否则 Webpack 接收到的就都是转换过的 CommonJS 形式的模块，无法进行 tree-shaking
  - 使用 uncss 去除无用 CSS 代码
  - purgecss-webpack-plugin 和 mini-css-extract-plugin 配合使用
- `Scope hoisting`
  - 构建后的代码会存在大量闭包，造成体积增大，运行代码时创建的函数作用域变多，内存开销变大。Scope hoisting 将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突
  - 必须是 ES6 的语法，因为有很多第三方库仍采用 CommonJS 语法，为了充分发挥 Scope hoisting 的作用，需要配置 mainFields 对第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法
- `动态Polyfill`
  - 建议采用 polyfill-service 只给用户返回需要的 polyfill，社区维护。 (部分国内奇葩浏览器 UA 可能无法识别，但可以降级返回所需全部 polyfill)

:::

## 打包时怎么去掉 console.log

### 在 Webpack 项目中

::: details
Webpack 5 自带 terser-webpack-plugin；Webpack 4 需要安装 terser-webpack-plugin

```js
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  // 省略...
  mode: "production",
  optimization: {
  	minimizer: [
	    new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            warnings: true,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log', "console.table"] // 删除console
          }
        }
      });
    ]
  }
}
```

:::

### 在 Vite 项目中

::: details

- 环境变量引入

  vite 已经将这个功能内置到了，所以我们只需要配置 vite.config.js 文件即可，起作用的文件包括 drop_console 去掉 console 信息 drop_debugger 为去掉 debugger 信息

```js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode, command }) => ({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: command === 'build' && loadEnv(mode, __dirname).VITE_API_ENV === 'prod',
        drop_debugger: command === 'build' && loadEnv(mode, __dirname).VITE_API_ENV === 'prod',
      },
    },
  },
  plugins: [vue()],
}))
```

- 打包： 命令: npm run build_prod

:::

### Vue-cli 中配置

::: details 这是在 Vue-cli 项目中推荐使用的清除 console 插件
安装

```bash
npm i babel-plugin-transform-remove-console --save-dev
```

使用

```js
// babel.config.js
module.exports = {
  plugins: ['transform-remove-console'],
}

// 生产环境如下配置
const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  plugins: [...prodPlugins],
}
```

:::

### 手写 Loader 删除

::: details

1. 新建一个 js 文件，我这里名为 clearConsole.js，其实这里也是用正则去匹配然后替换为空

```js
const reg = /(console.log\()(.*)(\))/g
module.exports = function (source) {
  source = source.replace(reg, '')
  return source
}
```

2. 在 Vue.config.js 配置

```js
module.exports = {
  // 省略...
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: path.resolve(__dirname, './clearConsole.js'),
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: path.resolve(__dirname, './clearConsole.js'),
        },
      ],
    },
  },
}
```

配置如上代码就可以啦~，清除 js 文件和 vue 文件里的 console.log。exclude 代表不去 node_module 目录下查找。

:::

### 其他物理方式

::: tip 可了解，不推荐

开发中我们还是要，需要的只是线上代码不跑 log 就成：

1. 简单粗暴删除 console.log = function() {}
2. VS code 正则全局替换
   :::

## 其他

### Webpack / Vite / Rollup 的区别？ 还知道哪些打包工具，它们的区别

::: details
|特性|Webpack|Vite|
|-|-|-|
|启动速速|慢|快|
|底层原理|原生 JS，相对 Vite 慢上不少|基于 ESbuild（go 语言）进行预构建|
|热更新|慢，需将依赖重新编译|快，模块改变，重新请求模块|
|打包速度|相对慢|相对快|
|打包体积|小，利用 rollup 进行打包，支持 Tree Shaking 和 ESM|需手动优化来进行压缩和 Tree Shaking|
|配置难度|大，可能用到脚手架|开箱即用，有默认优化配置|
|兼容性|良好|因支持 ESM，低版本浏览器兼容较差|
|生态对比|活跃度高，社区丰富|新工具，版本更新较快，稳定性稍逊|

- 启动速度：Webpack 因为要先进行本地打包启动服务器后再去请求对应资源，导致启动时间稍长；而 Vite 不用像 Webpack 那样分析模块依赖，进行编译等操作，Vite 直接启了一个开发服务器，然后按需编译（得益于现代浏览器本身支持 ES Module）

- 底层原理：Webpack 使用原生 JS 进行代码编写，编译上不占优势；而 Vite 基于 esbuild 进行预构建，速度只有 webpack 的 2%-3%；esbuild 用 go 写的，速度比 js 写的快 10-100 倍，go（纳秒级）语言本身相对 js（毫秒级）来说就有很大的优势

:::

### Vite 和 Webpack 在热更新上的区别

::: details
|特点|Vite|Webpack|
|-|-|-|
|实时热更新|支持模块级别的热更新，即只更新修改的模块，无需刷新整个页面|支持文件级别的热更新，修改任何文件都会触发整个应用的重新构建和刷新|
|构建速度|在开发环境下，利用浏览器原生的模块导入功能，不需要进行打包构建，启动速度更快|需要进行打包构建，每次修改代码都需要重新构建和编译，相对较慢|
|开发体验|提供更好的开发体验，修改代码后快速反馈，无需等待全量构建|反馈速度较慢，需要等待每次构建和编译完成|
|适用场景|适用于中小型项目，追求开发效率的前端项目|适用于大型项目，有复杂需求和更多构建优化的前端项目|
:::

### source map 是什么

::: details
source map 是**将编译、打包、压缩后的代码映射回源代码的过程**。打包压缩后的代码不具备良好的可读性，想要`调试源码`就需要 soucre map。
:::

### 生产环境怎么用 source map

::: details 线上环境一般有三种处理方案

- `hidden-source-map`：借助第三方错误监控平台 Sentry 使用
- `nosources-source-map`：只会显示具体行数以及查看源代码的错误栈。安全性比 sourcemap 高
- `sourcemap`：通过 nginx 设置将 .map 文件只对白名单开放(公司内网)

> 注意：避免在生产中使用 inline- 和 eval-，因为它们会增加 bundle 体积大小，并降低整体性能。

:::

### 文件指纹是什么？怎么用

::: details 文件指纹是打包后输出的文件名的后缀：

- `Hash`：和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改
- `Chunkhash`：和 Webpack 打包的 chunk 有关，不同的 entry 会生出不同的 chunkhash
- `Contenthash`：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变
  :::

## 参考

- [webpack 系列](https://juejin.cn/post/7140769906080874504)——何逸轩
- [前端打包工具介绍和对比](https://juejin.cn/post/7113803425145421832)——卷起来的小白
- [再来一打 Webpack 面试题](https://juejin.cn/post/6844904094281236487)——童欧巴
- [这些操作删除 console.log 代码，你都知道吗](https://juejin.cn/post/6992749075326042126)——秦声
- [vite 项目初始化之~打包去掉 console 信息](https://juejin.cn/post/7044876656049127437)——皓子
