# Vite

> Webpack 先出嘛，问到区别和与 Webpack 有关的都到先整理到那边了

## Vite 为什么不用 esbuild 打包

目前暂不支持代码分隔和 css 相关处理，但是生产环境的代码仍需一些分包功能来提升应用性能

## vite 涉及到了哪些底层原理

::: details

- **ESM**：Vite 使用了 `ES Module` 来管理和加载模块。ES 模块是 JavaScript 的标准模块系统，相比于传统的 CommonJS 或 AMD，ES 模块具有更好的静态分析能力和更高的性能。Vite 通过使用浏览器原生的 ES 模块加载器，可以实现按需加载和快速构建。

- **HTTP/2**：Vite 借助于现代浏览器的 HTTP/2 支持来实现`更高效的资源加载`。HTTP/2 支持`多路复用`，可以`同时请求多个资源`，避免了传统的 HTTP/1 中的队头阻塞问题，`加快了资源加载速度`。

- **编译器**：Vite 使用了`自定义的编译器`来处理开发时的`模块解析和转换`。它能够识别模块的依赖关系，并将模块转换为浏览器可直接执行的代码。Vite 的编译器支持`热模块替换（HMR）`，可以在代码修改时自动更新浏览器中的页面，提高开发效率。

- **中间件**：Vite 使用了`基于 Koa 框架的中间件`来处理开发服务器。通过中间件，Vite 可以拦截和处理开发时的 HTTP 请求，并根据请求的路径返回相应的模块文件。中间件还可以处理各种开发时的特殊需求，如代理 API 请求、路由转发等。

:::

## vite 编译器的组成部分

::: details

- **esbuild**：一个快速的 JavaScript 打包器，用于在开发阶段进行实时编译。esbuild 提供了快速的冷启动和热模块替换功能，能够极大地加快开发环境的构建速度。
- **Rollup**：一个强大的 JavaScript 模块打包器，在生产构建阶段使用。Rollup 能够将源代码打包为最终可发布的文件，支持`代码分割`、`Tree Shaking` 等优化技术，生成更小、更高效的代码包。

- **前端开发服务器**：Vite 还提供了一个内置的开发服务器，用于提供开发环境下的静态文件服务和构建工具集成。这个服务器能够利用 esbuild 实现快速的编译和热模块替换，使开发者在开发过程中可以快速地预览和调试代码。
- **插件系统**：Vite 通过插件系统来扩展其功能。开发者可以编写自定义的插件，用于处理特定的文件类型、引入额外的功能或者定制构建过程。插件系统使得 Vite 能够与各种前端框架和工具集成，并提供更灵活的开发体验。

:::

## 如何指定 vite 插件的执行顺序

::: details

可以使用 enforce 修饰符来强制插件的位置:

- pre：在 Vite 核心插件之前调用该插件
- 默认：在 Vite 核心插件之后调用该插件
- post：在 Vite 构建插件之后调用该插件

:::

## vite 插件 常见的 hook 有哪些？

::: details

hook: 即钩子。Vite 会在生命周期的不同阶段中去调用不同的插件以达到不同的目的.

- config： 可用于修改 vite config，用户可以通过这个 hook 修改 config；例如 vite-aliases 这个插件可以帮助我们自动生成别名。它利用的就是这个钩子。

- configResolved： 在解析 Vite 配置后调用，用于获取解析完毕的 config，在这个 hook 中不建议修改 config。

- configureServer： 用于给 dev server 添加自定义 middleware；例如 vite-plugin-mock 插件就是在这个生命周期调用的

- configurePreviewServer：与  configureServer  相同但是作为预览服务器。vite preview 插件就是利用这个钩子。

- transformIndexHtml：注入变量，用来转换 HTML 的内容。vite-plugin-html 插件可以帮助我们在 html 里注入变量，就是利用这个钩子

- handleHotUpdate：执行自定义 HMR 更新处理

:::

## Vite 是否支持 commonjs 写法？

::: details

纯业务代码，一般建议采用 ESM 写法。如果引入的三方组件或者三方库采用了 CJS 写法，vite 在预构建的时候就会将 CJS 模块转化为 ESM 模块。

如果非要在业务代码中采用 CJS 模块，那么我们可以提供一个 vite 插件，定义 load hook，在 hook 内部识别是 CJS 模块还是 ESM 模块。如果是 CJS 模块，利用 esbuild 的 transfrom 功能，将 CJS 模块转化为 ESM 模块。

:::

## 其他

### esbuild 和 rollup 区别

::: details

esbuild 和 Rollup 都是 Vite 的`基础依赖`，但它们的`分工`是不同的。

- `esbuild` 用于`开发服务器阶段`，通过实时编译和提供模块来实现快速的冷启动和热模块替换。
- `Rollup` 用于`生产构建阶段`，将源代码打包为最终可发布的文件，以用于部署到生产环境。这样的分工使得 Vite 在开发过程中能够快速响应变化，并在构建过程中生成高效的最终输出文件。

:::

## 参考

- [四万字长文 - 2024 年第一波常见面试题汇总](https://juejin.cn/post/7319311129867010111#heading-13)——晴小篆
- [五个常见的 Vite 面试题](https://juejin.cn/post/7162096443832926244)
