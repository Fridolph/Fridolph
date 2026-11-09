# Import

## Dynamic Import 动态导入

```jsx
// Lazy load EmojiPicker  when <EmojiPicker /> renders
const Picker = lazy(() => import(/*webpackChunkName: "emoji-picker" */ './EmojiPicker'))
```

## Import On Interaction 交互时导入

您的页面可能包含一些不必要组件或资源的代码或数据。

例如，除非用户点击或滚动页面某些部分，否则用户无法看到用户界面的一部分。这适用于您编写的许多类型的自有代码，但也适用于第三方小部件（如视频播放者或聊天小部件），通常需要点击按钮才能显示主界面。急切加载这些资源（即立即加载）如果成本很高，会阻塞主线程，推迟用户与页面更重要的部分进行交互的时间。这会影响交互就绪指标，例如首次输入延迟、总阻塞时间和交互时间。

您可以选择在更合适的时机加载它们，比如：

当用户首次点击以与该组件进行交互时滚动以查看该组件直到浏览器处于空闲状态（通过 requestIdleCallback）。

资源加载的不同方式分为：

- 急切加载资源（立即加载脚本的正常方式）、
- 基于路由的懒加载（用户导航到某个路由或组件时进行加载）、
- 交互时懒加载（用户点击 UI 时进行加载（例如显示聊天））、
- 视口内懒加载（用户滚动到组件时进行加载）、
- 预取提前加载（但首先要在加载重要资源之后）、
- 预加载等。

对于自有代码而言，仅在无法预先获取资源的情况下才应使用导入交互模式。然而对于第三方代码来说，这种模式非常实用，如果第三方代码不是关键性的，那么可以将其推迟到稍后的时间点进行加载。这可以通过多种方式实现（延迟到交互、直到浏览器空闲或使用其他启发式方法）。

延迟导入交互时的功能代码是我们将在本文中介绍的一种模式。您可能在谷歌文档中遇到过这种情况，谷歌文档通过延迟其共享功能的脚本加载（直到用户交互时），节省了约 500KB 的脚本加载量。另一个适合使用导入交互的场景是加载第三方小部件。

### 假加载

“Fake” loading third-party UI with a facade 使用外观（facade）加载第三方 UI 的“假加载”

您可能正在导入第三方脚本，对渲染内容或加载代码的时间控制较少。实现交互加载的一种直接方式是使用外观（facade）。外观是昂贵组件的简单“预览”或“占位符”，您可以模拟基本体验，例如使用图像或截图。这是我们 Lighthouse 团队一直使用的术语。

当用户点击“预览”（外观）时，资源的代码将被加载。这限制了用户为不使用的功能支付体验成本。同样地，当鼠标悬停在某个内容上时，外观可以提前连接到所需资源。

第三方资源往往被添加到页面中，而没有充分考虑它们如何融入网站的整体加载过程。同步加载的第三方脚本会阻止浏览器解析器并可能延迟渲染。如果可能的话，第三方脚本应使用 async/defer（或其他方法）进行加载，以确保不会因网络带宽不足而使第一方脚本无法加载。除非它们至关重要，否则可以成为采用交互导入等模式进行延迟加载的良好候选对象。

### 视频播放器嵌入

n 保罗·爱尔兰的 YouTube Lite 嵌入是一个很好的“外观”示例。它提供了一个自定义元素，该元素接受 YouTube 视频 ID 并显示最小的缩略图和播放按钮。点击该元素会动态加载完整的 YouTube 嵌入代码，这意味着即使那些从不点击播放的用户也不需要考虑检索和处理嵌入的成本。

在实际生产中，几个谷歌网站使用了类似的技术。在 Android 官网上，不是立即加载 YouTube 视频播放器嵌入，而是向用户显示带有假播放按钮的缩略图。当他们点击时，一个模态窗口加载并自动播放视频，使用完整的 YouTube 视频播放器嵌入。

<Image src="/06opt/loadYouTube.png" alt="loadYouTube" />

### 验证 Authentication

应用程序可能需要通过客户端 JavaScript SDK 支持与服务进行身份验证。这些可能会偶尔占用大量内存并产生大量的 JS 执行成本，如果用户不打算登录，可能不希望急切地一开始就加载它们。相反，当用户点击“登录”按钮时动态导入认证库，从而在初始加载时保持主线程更自由。

<Image src="/06opt/Authentication.png" alt="Authentication" />

### 聊天小部件

Calibre 应用通过使用类似的外观方法提高了基于 Intercom 的实时聊天的性能，提升了约百分之三十。他们使用 CSS 和 HTML 实现了一个“假的”快速加载的实时聊天按钮，点击后加载他们的 Intercom 包。
Postmark 注意到他们的帮助聊天小部件总是热加载，尽管这只是偶尔被客户使用。该小部件会加载额外的 314KB 脚本，比整个主页还要大。为了提高用户体验，他们使用 HTML 和 CSS 创建了一个虚假的小部件复制品，只有在点击时才加载真正的程序。这个变化使得互动性等待时间从原本的 7.7 秒减少到现在的 3.7 秒。

<Image src="/06opt/loadHelp.png" alt="loadHelp" />

### Others

当 Ne-digital 在其产品上需要使用点击“滚动到顶部”按钮回到页面顶部的动画滚动功能时，他们选择使用 React 库来实现这一功能。然而，他们并没有急切地加载 react-scroll 依赖项来实现这一功能，而是在用户与按钮交互时才加载它，从而节省了大约 7KB 的内存空间。这样的优化提高了性能和用户体验。简单来说，这种方法延迟加载了 React 依赖项（在用户触发按钮动作时加载），从而节省了内存空间。

```js
handleScrollToTop() {
  import('react-scroll').then(scroll => {
    scroll.animateScroll.scrollToTop({
    })
  })
}
```

<Image src="/06opt/Others.png" alt="Others" />

## 如何在交互时进行导入？

原生 JavaScript。在 JavaScript 中，动态 import()可实现按需加载模块并返回一个 promise，在正确应用时，它非常强大。以下是一个示例，演示在按钮事件监听器中使用动态导入来导入 lodash.sortby 模块并使用它。

```ts
const btn = document.querySelector('button')

btn.addEventListener('click', e => {
  e.preventDefault()
  import('lodash.sortby')
    .then(module => module.default)
    .then(sortInput()) // use the imported dependency
    .catch(err => {
      console.log(err)
    })
})
```

在动态导入或使用不适合使用它的案例之前，使用基于 Promise 的脚本加载器将脚本动态注入到页面也是一种选择（请参阅此处以获取演示登录界面的完整实现）：

```ts
const loginBtn = document.querySelector('#login')

loginBtn.addEventListener('click', () => {
  const loader = new scriptLoader()
  loader
    .load(['//apis.google.com/js/client:platform.js?onload=showLoginScreen'])
    .then(({ length }) => {
      console.log(`${length} scripts loaded!`)
    })
})
```

### React

假设我们有一个聊天应用程序，其中包含`<MessageList>`、`<MessageInput>`和`<EmojiPicker>`组件（由 emoji-mart 驱动，其经压缩并 gzip 处理后的文件大小为 98KB）。在页面初次加载时立即加载所有这些组件是很常见的做法。

```tsx
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import EmojiPicker from './EmojiPicker';

const Channel = () => {
  ...
  return (
    <div>
      <MessageList />
      <MessageInput />
      {emojiPickerOpen && <EmojiPicker />}
    </div>
  );
};
```

使用代码拆分的方式，将这项工作的加载分解是相对直接的。React.lazy 方法使使用动态导入在组件级别拆分 React 应用程序变得容易。React.lazy 函数提供了一种内置的方式，可以将应用程序中的组件非常轻松地分割成单独的 JavaScript 块。然后你可以结合 Suspense 组件来管理加载状态。

```tsx
import React, { lazy, Suspense } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const EmojiPicker = lazy(
  () => import('./EmojiPicker')
);

const Channel = () => {
  ...
  return (
    <div>
      <MessageList />
      <MessageInput />
      {emojiPickerOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <EmojiPicker />
        </Suspense>
      )}
    </div>
  );
};
```

我们可以将这个理念扩展到仅在点击`<MessageInput>`中的表情图标时导入 Emoji Picker 组件的代码，而不是在应用程序初次加载时急切加载：

```tsx
import React, { useState, createElement } from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import ErrorBoundary from './ErrorBoundary'

const Channel = () => {
  const [emojiPickerEl, setEmojiPickerEl] = useState(null)

  const openEmojiPicker = () => {
    import(/* webpackChunkName: "emoji-picker" */ './EmojiPicker')
      .then(module => module.default)
      .then(emojiPicker => {
        setEmojiPickerEl(createElement(emojiPicker))
      })
  }

  const closeEmojiPickerHandler = () => {
    setEmojiPickerEl(null)
  }

  return (
    <ErrorBoundary>
      <div>
        <MessageList />
        <MessageInput onClick={openEmojiPicker} />
        {emojiPickerEl}
      </div>
    </ErrorBoundary>
  )
}
```

<Image src="/06opt/openEmojiPicker.png" alt="openEmojiPicker" />

### Vue

在 Vue.js 中，可以使用几种不同的方式实现类似按需加载（import-on-interaction）的模式。其中一种方式是使用动态导入的方式动态导入 Emoji 选择器 Vue 组件，用函数包裹起来，例如() => import("./Emojipicker")。通常这样做会在 Vue.js 需要渲染组件时懒加载它。

然后，我们可以使用用户交互来实现按需加载的触发条件。在挑选器的父 div 上使用条件性的 v-if 指令，通过点击按钮进行切换，然后当用户点击时，我们既可以按需获取也可以渲染 Emoji 选择器组件。

```vue
<template>
  <div>
    <button @click="show = true">Load Emoji Picker</button>
    <div v-if="show">
      <emojipicker></emojipicker>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({ show: false }),
  components: {
    Emojipicker: () => import('./Emojipicker'),
  },
}
</script>
```

这种按需加载的模式在大多数支持动态组件加载的框架和库中都是可行的，包括 Angular。

### 按需加载 Import On Visibility

除了用户交互外，我们还有许多组件在初始页面上是不可见的。一个很好的例子是懒加载图片，这些图片在视口中不是直接可见的，只有在用户滚动到下方时才会加载。

由于我们并非立即请求所有图片，因此可以减少初始加载时间。对于组件，我们也可以这样做！为了知道组件是否当前在我们的视口中，我们可以使用IntersectionObserver API或使用react-lazyload或react-loadable-visibility等库，在可见时快速将导入添加到我们的应用程序中。

### 渐进加载中的交互导入

渐进加载中的交互导入用于第一方代码。

在交互时加载代码也是谷歌处理大型应用程序（如航班和照片）中的渐进加载的关键部分。为了说明这一点，让我们看一个例子。想象一下一位用户正在计划前往印度孟买之旅，并访问谷歌酒店查看价格。与该交互相关的所有资源都可能是急迫需要加载的，但如果用户还没有选择任何目的地，那么地图所需的 HTML/CSS/JS 是不必要的。在最简单的下载场景中，想象谷歌酒店正在使用简单的客户端渲染（CSR）。

所有代码都会提前下载并处理：首先是 HTML，然后是 JS，接着是 CSS，然后获取数据来渲染只有当我们拥有了全部的内容时才进行渲染。然而，这会让用户等待很长时间并且屏幕上没有任何显示内容。大量 JavaScript 和 CSS 可能是不必要的。在提供用户具体的行为动作之后再去加载和渲染相关内容是当前多数网页的一种设计思想。

<Image src="/06opt/basic-client-side-rendering.png" alt="basic-client-side-rendering" />

为了提高性能通常我们使用特定的代码实现如渐进式加载这样的策略，例如延迟加载、按需加载等，以便减少用户的等待时间并加快页面渲染速度。

接下来，想象一下这个体验转移到服务器端渲染（SSR）。我们将允许用户更快地获得视觉上的完整页面，这非常好，但是，在服务器获取数据并且客户端框架完成补水之前，它不会具有交互性。

服务器端渲染可能是一种改进，但用户可能会经历一个令人不安的落差感，页面看起来已经准备就绪，但他们无法点击任何内容。有时这被称为愤怒点击，因为用户往往会因沮丧而反复点击。

<Image src="/06opt/basic-server-side-rendering.png" alt="basic-server-side-rendering" />

回到谷歌酒店搜索的例子，如果我们稍微缩小一点界面可以看到，当用户点击“更多过滤器”来找到确切的酒店时，该组件所需的代码会被下载下来。

最初仅下载非常少量的代码，之后用户的交互决定何时发送更多代码。让我们更仔细地看一下这种加载场景。

交互驱动延迟加载有很多重要的方面：

- 首先，我们一开始下载的代码量最少，以便页面可以快速完整地呈现。
- 其次，在用户开始与页面交互时，我们使用这些交互来确定要加载哪些其他代码。例如加载“更多过滤器”组件的代码。
- 这意味着页面上的许多功能的代码都不会发送到浏览器，因为用户并不需要这些功能。

<Image src="/06opt/driven-late-loading.png" alt="driven-late-loading" />

### 我们如何避免早期点击丢失？

在这些谷歌团队使用的框架堆栈中，我们可以尽早跟踪点击，因为 HTML 的第一块包含一个事件库（JSAction），在框架启动之前跟踪所有点击事件。

这些事件用于两件事：根据用户交互触发组件代码的下载当框架完成启动后重现用户交互。

其他可能采用的启发式方法包括加载组件代码：在用户空闲时间后的一段时间内；在用户鼠标悬停在相关用户界面/按钮上或者发生行动调用时基于浏览器信号（例如网络速度、数据节省模式等）的渴望程度滑动比例。

<Image src="/06opt/avoid-clicks.png" alt="avoid-clicks" />

### 关于数据呢？

用于渲染页面的初始数据包含在初始页面的服务器端渲染 HTML 中并进行了流式传输。

根据用户交互下载延迟加载的数据，因为我们知道它与哪个组件相关联。这使得数据与数据获取一起，以类似于 CSS 和 JS 运行的方式完成了交互时导入图片的任务。由于组件了解自身所需的代码和数据，因此它需要的所有资源都不超过一个请求的距离。

<Image src="/06opt/data-fetching-work.png" alt="data-fetching-work" />

这可以在构建期间创建组件及其依赖项的图时起到作用。网络应用程序能够在任何时候参考此图，并快速获取任何组件所需的资源（代码和数据）。这也意味着我们根据组件而不是路由进行代码分割。关于上述示例的具体过程，请参阅使用 JavaScript 社区提高网络平台的方法。

### 权衡取舍

将耗时的操作转移到更接近用户交互的地方，可以优化页面初始加载的速度，但这一技术并非没有权衡取舍。

如果用户在点击后加载脚本需要很长时间会发生什么？在谷歌酒店示例中，小粒度的块可以最小化用户等待代码和数据获取和执行的时间。在一些其他情况下，较大的依赖项确实会在较慢的网络上引发这种担忧。

减少这种情况发生的一种方法是更好地拆分加载过程，或在页面关键内容加载完成后预取这些资源。我建议衡量这种影响，以确定它在你的应用程序中的实际影响程度。

在用户交互之前缺少功能呢？遮罩的另一权衡是缺少在用户交互之前的某些功能。例如，嵌入的视频播放器无法自动播放媒体。如果这种功能至关重要，您可能需要考虑加载资源的其他方法，例如在用户滚动到视图中时懒加载第三方内联框架，而不是在用户交互时延迟加载。

### 替换交互式嵌入为静态内容

我们已经讨论了交互式导入模式和渐进加载，但对于嵌入用例，是否可以完全静态化呢？

在某些情况下，嵌入的最终渲染内容可能需要立即展示，例如在初始视口中可见的社交媒体帖子。但是，当嵌入带入 2-3MB 的 JavaScript 时，这也会带来自己的挑战。由于嵌入内容需要立即加载，懒加载和遮罩可能不太适用。

<Image src="/06opt/staticHtml.png" alt="staticHtml" />

如果优化性能，可以将嵌入完全替换为外观相似的静态变体，并链接到更互动的版本（例如，原始社交媒体帖子）。在构建时，可以提取嵌入的数据并将其转换为静态 HTML 版本。这样可以减少初始加载的负担，提高页面性能，同时依然能保持内容的可获取性。

这是针对一种社交媒体嵌入所采取的方法，这种方法提高了页面加载性能，消除了由于嵌入代码增强后备文本导致的累积布局移位问题。虽然静态替代可能对性能有益，但它们通常需要定制化的内容，因此在评估选项时需要注意这一点。

## 小结

第一方的 JavaScript 经常影响现代网页的交互就绪性，但其经常被来自第一方或第三方源的非关键 JavaScript 在网络上的延迟所阻碍，后者会让主线程保持忙碌状态。

一般来说，避免在文档头部使用同步的第三方脚本，并尽量在第一方 JS 加载完成后加载非阻塞的第三方脚本。像按需加载的模式给我们提供了一种方式来延迟加载非关键资源，直到用户更可能需要这些资源支持的用户界面为止。
