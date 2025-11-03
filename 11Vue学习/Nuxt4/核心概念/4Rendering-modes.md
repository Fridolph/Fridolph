# 渲染模式

了解 Nuxt 中可用的不同渲染模式。

Nuxt 支持不同的渲染模式、通用渲染、客户端渲染，但也提供混合渲染和在 CDN 边缘服务器上渲染应用程序的可能性。

浏览器和服务器都可以解释 JavaScript 代码，将 Vue.js 组件转换为 HTML 元素。这一步称为渲染。Nuxt 支持通用渲染和客户端渲染。我们将介绍这两种方法的优缺点。

默认情况下，Nuxt 使用通用渲染来提供更好的用户体验、性能和优化搜索引擎索引，但您可以在一行配置中切换渲染模式。

## 通用渲染（SSR）

这一步类似于 PHP 或 Ruby 应用程序执行的传统服务器端渲染。当浏览器请求一个启用了通用渲染的 URL 时，Nuxt 会在服务器环境中运行 JavaScript（Vue.js）代码，并向浏览器返回一个完全渲染的 HTML 页面。如果页面是预先生成的，Nuxt 还可以从缓存中返回完全渲染的 HTML 页面。与客户端渲染相反，用户可以立即获得应用程序的全部初始内容。

下载 HTML 文档后，浏览器会对此进行解释，Vue.js 会控制文档。曾经在服务器上运行的 JavaScript 代码现在再次在客户端（浏览器）后台运行，通过将监听器绑定到 HTML 来实现交互性（因此是通用渲染）。这被称为水合作用。当水合作用完成时，页面可以享受动态界面和页面过渡等好处。

通用呈现允许 Nuxt 应用程序提供快速的页面加载时间，同时保留客户端呈现的好处。此外，由于内容已经存在于 HTML 文档中，爬虫可以在没有开销的情况下对其进行索引。

加载 HTML 文档时，用户可以访问静态内容。水合作用允许页面的交互性

什么是服务器渲染，什么是客户端渲染？

询问 Vue 文件的哪些部分在通用渲染模式下在服务器和/或客户端上运行是很正常的。

```vue
<script setup lang="ts">
const counter = ref(0) // executes in server and client environments

const handleClick = () => {
  counter.value++ // executes only in a client environment
}
</script>

<template>
  <div>
    <p>Count: {{ counter }}</p>
    <button @click="handleClick">Increment</button>
  </div>
</template>
```

在初始请求中，计数器引用在服务器中初始化，因为它是在`<p>`标记内呈现的。handleClick 的内容永远不会在这里执行。在浏览器水合过程中，计数器引用会重新初始化。handleClick 最终将自己绑定到按钮；因此，可以合理地推断 handleClick 的主体将始终在浏览器环境中运行。

在水合过程中，中间件和页面在服务器和客户端上运行。插件可以在服务器或客户端或两者上呈现。组件也只能强制在客户端上运行。组件和实用程序根据其使用环境进行呈现。

### 服务器端渲染的好处

性能：用户可以立即访问页面内容，因为浏览器显示静态内容的速度比 JavaScript 生成的内容快得多。同时，Nuxt 在水合过程中保留了 web 应用程序的交互性。搜索引擎优化：通用渲染将页面的整个 HTML 内容作为经典的服务器应用程序交付给浏览器。网络爬虫可以直接索引页面的内容，这使得通用渲染成为您想要快速索引的任何内容的绝佳选择。

### 服务器端渲染的缺点

- 开发限制：服务器和浏览器环境不提供相同的 API，编写可以在双方无缝运行的代码可能很棘手。幸运的是，Nuxt 提供了指导方针和特定变量来帮助您确定代码的执行位置。

- 成本：需要运行服务器才能动态呈现页面。这会像任何传统服务器一样增加每月的成本。然而，由于浏览器接管客户端导航的通用渲染，服务器调用大大减少。通过利用边缘渲染可以降低成本。

通用渲染非常通用，几乎可以适应任何用例，尤其适用于任何面向内容的网站：博客、营销网站、投资组合、电子商务网站和市场。

> 有关编写 Vue 代码而不发生水合不匹配的更多示例，请参阅 Vue 文档。导入依赖于浏览器 API 并具有副作用的库时，请确保导入它的组件仅称为客户端。捆绑商不会对含有副作用的模块的进口进行树摇。

## 客户端渲染

传统的 Vue.js 应用程序开箱即用地在浏览器（或客户端）中呈现。然后，Vue.js 在浏览器下载并解析包含创建当前界面的指令的所有 JavaScript 代码后生成 HTML 元素。

### 客户端渲染的好处

开发速度：当完全在客户端工作时，我们不必担心代码的服务器兼容性，例如，通过使用仅限浏览器的 API（如 window 对象）。更便宜：运行服务器会增加基础设施成本，因为您需要在支持 JavaScript 的平台上运行。我们可以使用 HTML、CSS 和 JavaScript 文件在任何静态服务器上托管仅客户端应用程序。离线：由于代码完全在浏览器中运行，因此在互联网不可用时它可以很好地继续工作。

### 客户端渲染的缺点

性能：用户必须等待浏览器下载、解析和运行 JavaScript 文件。根据下载部分的网络以及解析和执行的用户设备，这可能需要一些时间并影响用户的体验。

搜索引擎优化：对通过客户端呈现交付的内容进行索引和更新比使用服务器呈现的 HTML 文档需要更多时间。这与我们讨论的性能缺陷有关，因为搜索引擎爬虫在第一次尝试索引页面时不会等待界面完全呈现。通过纯客户端呈现，您的内容将需要更多时间在搜索结果页面中显示和更新。对于不需要索引或用户经常访问的交互性强的 Web 应用程序来说，客户端渲染是一个不错的选择。它可以利用浏览器缓存在后续访问（例如 SaaS、后台应用程序或在线游戏）时跳过下载阶段。

您可以在 nuxt.config.ts 中使用 Nuxt 启用仅客户端渲染：

```js
export default defineNuxtConfig({
  ssr: false,
})
```

> 如果您确实使用 ssr: false，您还应该在 ~/spa-loading-template.html 中放置一个 HTML 文件，其中包含一些您想要用来渲染加载屏幕的 HTML 文件，该屏幕将在您的应用程序水合之前渲染。

## 混合渲染

混合渲染允许使用路由规则为每个路由使用不同的缓存规则，并决定服务器应如何响应给定 URL 上的新请求。以前，Nuxt 应用程序和服务器的每个路由/页面都必须使用相同的渲染模式，通用或客户端。在各种情况下，某些页面可以在构建时生成，而其他页面则应在客户端呈现。例如，考虑一个带有管理部分的内容网站。每个内容页面应该主要是静态的并生成一次，但管理部分需要注册并且行为更像动态应用程序。 Nuxt 包括路由规则和混合渲染支持。使用路由规则，您可以为一组 nuxt 路由定义规则，更改渲染模式或根据路由分配缓存策略！ Nuxt 服务器将使用 Nitro 缓存层自动注册相应的中间件并使用缓存处理程序包装路由。

## Route Rules

您可以使用的不同属性如下：

Route Rules

The different properties you can use are the following:

redirect: string - Define server-side redirects. ssr: boolean - Disables server-side rendering of the HTML for sections of your app and make them render only in the browser with ssr: false cors: boolean - Automatically adds cors headers with cors: true - you can customize the output by overriding with headers headers: object - Add specific headers to sections of your site - for example, your assets swr: number | boolean - Add cache headers to the server response and cache it on the server or reverse proxy for a configurable TTL (time to live). The node-server preset of Nitro is able to cache the full response. When the TTL expired, the cached response will be sent while the page will be regenerated in the background. If true is used, a stale-while-revalidate header is added without a MaxAge. isr: number | boolean - The behavior is the same as swr except that we are able to add the response to the CDN cache on platforms that support this (currently Netlify or Vercel). If true is used, the content persists until the next deploy inside the CDN. prerender: boolean - Prerenders routes at build time and includes them in your build as static assets noScripts: boolean - Disables rendering of Nuxt scripts and JS resource hints for sections of your site. appMiddleware: string | string[] | Record<string, boolean> - Allows you to define middleware that should or should not run for page paths within the Vue app part of your application (that is, not your Nitro routes) Whenever possible, route rules will be automatically applied to the deployment platform's native rules for optimal performances (Netlify and Vercel are currently supported).

请注意，使用 nuxt generated 时混合渲染不可用

## 边缘渲染

边缘渲染 (ESR) 是 Nuxt 中引入的一项强大功能，它允许通过内容交付网络 (CDN) 的边缘服务器将 Nuxt 应用程序渲染得更接近用户。通过利用 ESR，您可以确保提高性能并减少延迟，从而提供增强的用户体验。通过 ESR，渲染过程被推送到网络的“边缘”——CDN 的边缘服务器。请注意，ESR 更多的是一个部署目标，而不是实际的渲染模式。当发出页面请求时，它不会一直到达原始服务器，而是被最近的边缘服务器拦截。该服务器生成页面的 HTML 并将其发送回用户。此过程最大限度地减少了数据传输的物理距离，减少了延迟并更快地加载页面。得益于 Nitro（为 Nuxt 提供支持的服务器引擎），边缘渲染成为可能。它为 Node.js、Deno、Cloudflare Workers 等提供跨平台支持。当前可以利用 ESR 的平台有：使用 git 集成和 nuxt build 命令进行零配置的 Cloudflare Pages Vercel Cloud 使用 nuxt build 命令和 NITRO_PRESET=vercel-edge 环境变量使用 nuxt build 命令和 NITRO_PRESET=netlify-edge 环境变量的 Netlify Edge 函数请注意，当将边缘渲染与路径规则结合使用时，可以使用混合渲染。您可以探索部署在上述某些平台上的开源示例：
