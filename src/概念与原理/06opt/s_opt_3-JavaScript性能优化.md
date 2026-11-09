# JavaScript 性能优化

逐字节来看，JavaScript 对性能的负面影响更大——它会显著影响下载时间、渲染性能、CPU 和电池使用。

## 优化 JavaScript 的下载

最高效、最不阻塞的 JavaScript 是根本不使用 JavaScript。你应该尽量少使用 JavaScript。以下是一些需要记住的点：

### 并非总是需要框架

框架会增加 JavaScript 的负担。如果你创建的是一个相对静态的体验，对 JavaScript 的要求很少，那么你可能不需要那个框架。也许你可以使用几行标准 JavaScript 来实现你需要的功能。

### 考虑更简单的解决方案

你可能有一个华丽、有趣的解决方案要实现，但请考虑用户是否会喜欢它。他们是否更喜欢简单的东西？

### 删除未使用的代码

`no-unused-vars` 这听起来很明显，但令人惊讶的是很多开发者忘记清除在开发过程中添加的不会被用到的功能。你需要谨慎并有意识地添加和删除代码。所有脚本都会被解析，无论它是否被使用；因此，加快下载速度的一个快速方法是摆脱任何不会被使用的功能。此外，要考虑通常只会使用框架中的一小部分功能。

### 考虑使用浏览器内置特性

- 使用内置的客户端表单验证。
- 使用浏览器自带的 `<video>` 播放器。
- 使用 CSS 动画而不是 JavaScript 动画库

你还应该将 JavaScript 分成表示`关键部分`和`非关键部分`的多个文件。通过使用 JavaScript 模块可以比仅使用单独的外部 JavaScript 文件更高效地实现这一点。

- 代码压缩 (en-US)减少文件中的字符数，从而减小 JavaScript 的字节数或大小。
- Gzip 压缩进一步压缩文件，即使你不对代码进行压缩也应该使用。
- Brotli 压缩类似于 Gzip，但通常优于 Gzip 压缩。

你可以手动拆分和优化代码，但通常使用类似 Webpack 的模块打包工具会做得更好。

## 处理解析和执行

重要的是要了解浏览器页面渲染过程中 JavaScript 是在哪里处理的。当一个网页被加载时：

1. 通常首先解析 HTML，按照页面上出现的顺序进行解析。
2. 遇到 CSS 时，解析 CSS 以了解需要应用于页面的样式。在此期间，开始获取链接的资源，如图像和网络字体。
3. 遇到 JavaScript 时，浏览器解析、评估并执行它。
4. 稍后，浏览器根据应用于每个 HTML 元素的 CSS 来确定每个元素的样式。
5. 然后将经过样式处理的结果绘制到屏幕上。

默认情况下，JavaScript 的解析和执行会阻塞渲染。这意味着浏览器在遇到 JavaScript 之后，会阻塞解析任何出现在其后的 HTML 代码，直到脚本处理完成。因此，**样式和绘制也会被阻塞**。因此，你不仅需要仔细考虑你要下载的内容，还要`考虑代码何时以及以何种方式执行`。

## 尽早加载关键资源

1. 如果某个脚本非常重要，并且你担心由于加载速度不够快而影响性能，你可以在文档的 `<head>` 中加载它

```html
<head>
  ...
  <script src="main.js"></script>
  ...
</head>
```

2. 这个方法可以正常工作，但会阻塞渲染。更好的策略是使用 `rel="preload"` 来为关键 JavaScript 创建一个预加载器：

```html
<head>
  ...
  <!-- 预加载 JavaScript 文件 -->
  <link rel="preload" href="important-js.js" as="script" />
  <!-- 预加载 JavaScript 模块 -->
  <link rel="modulepreload" href="important-module.js" />
  ...
</head>
```

3. 预加载的 `<link>` 尽快获取 JavaScript，而不会阻塞渲染。然后，你可以在页面中任何位置使用它：

```html
<!-- 在合适的位置包含该脚本 -->
<script src="important-js.js"></script>
```

4. 在脚本中使用它（在使用 JavaScript 模块的情况下）：

```js
import { function } from "important-module.js";
```

::: tip
预加载并不能保证脚本在你包含它时已经加载完成，但它确实意味着它将尽早开始下载。即使未完全移除阻塞渲染的时间，渲染阻塞时间仍将缩短。
:::

## 推迟非关键 JavaScript 的执行

你应该尽量推迟解析和执行非关键 JavaScript 的时间，直到它真正需要时再加载。提前加载它会不必要地阻塞渲染。

1. 可以给 `<script>` 元素添加 `async` 属性：

```js
<head>
  ...
  <script async src='main.js'></script>
  ...
</head>
```

2. 这会导致脚本获取与 DOM 解析并行进行，因此它将在同一时间准备好，不会阻塞渲染。

::: tip
还有另一个属性 `defer`，它会导致脚本在文档解析完成之后，但**在触发 `DOMContentLoaded` 事件之前执行**。这与 async 有类似的效果。
:::

```js
const scriptElem = document.createElement('script')
scriptElem.src = 'index.js'
scriptElem.addEventListener('load', () => {
  // 一旦 index.js 已完全加载，运行其中的函数
  init()
})
document.head.append(scriptElem)
```

3. 可以使用 import() 函数动态加载 JavaScript 模块：

```js
import('./modules/myModule.js').then((module) => {
  // 对模块进行操作
})
```

## 分解长任务

当浏览器运行 JavaScript 时，它会将脚本组织成按顺序运行的任务。

::: details 这段有长，我就先折叠了，感兴趣可以点开

例如进行 fetch 请求、通过事件处理程序驱动用户交互和输入、运行 JavaScript 驱动的动画等等。

大部分任务都在主线程上运行，其中包括运行在 Web Worker 中的 JavaScript。`主线程一次只能运行一个任务`。

当单个任务的执行时间超过 50 毫秒时，它被归类为长任务。如果用户在长任务正在运行时尝试与页面交互或请求重要的 UI 更新，他们的体验将受到影响。预期的响应或视觉更新将被延迟，导致 UI 看起来迟钝或无响应。

为了解决这个问题，你需要将长任务分解为较小的任务。这样可以给浏览器更多机会执行重要的用户交互处理或 UI 渲染更新，`浏览器可以在每个较小任务之间执行它们`，而不是仅仅在长任务之前或之后执行。在你的 JavaScript 中，你可以通过`将代码拆分为单独的函数`来实现这一点。这样做也有其他几个原因，比如更容易维护、调试和编写测试。

```js
function main() {
  a()
  b()
  c()
  d()
  e()
}
```

为了处理这个问题，我们倾向于定期运行一个“yield”函数，以使代码“让步给主线程”。这意味着我们的`代码被分成多个任务`，在执行每个任务之间，浏览器有机会处理高优先级任务，比如更新 UI。一个常见的模式是使用 setTimeout() 将执行推迟到一个单独的任务中：

```js
function yield() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}
```

可以在这样的任务运行模式中使用它，以在每个任务运行后让步给主线程：

```js
async function main() {
  // 创建要运行的函数数组
  const tasks = [a, b, c, d, e]

  // 循环遍历任务
  while (tasks.length > 0) {
    // 从任务数组中取出第一个任务
    const task = tasks.shift()

    // 运行任务
    task()

    // 让步给主线程
    await yield()
  }
}
```

为了进一步改进，我们可以使用 `navigator.scheduling.isInputPending()` ，仅在用户尝试与页面交互时运行 yield() 函数：

```js
async function main() {
  // 创建要运行的函数数组
  const tasks = [a, b, c, d, e]

  while (tasks.length > 0) {
    // 让步给挂起的用户输入
    if (navigator.scheduling.isInputPending()) {
      await yield()
    } else {
      // 从任务数组中取出第一个任务
      const task = tasks.shift()
      // 运行任务
      task()
    }
  }
}
```

:::

这样可以避免在用户积极与页面交互时阻塞主线程，从而提供更流畅的用户体验。

然而，通过**仅在必要时让步**，我们可以在没有用户输入需要处理时继续运行当前任务。这也避免了任务被放置在队列末尾，排在其他非必要的浏览器初始化任务之后。

## 处理 JavaScript 动画

动画可以改善感知性能，使界面更加流畅，让用户在等待页面加载时感觉到进展（例如加载旋转图标）。然而，更大更多的动画自然需要更多的处理能力来处理，这可能会降低性能。

1. 最显然的动画建议是使用更少的动画——去除任何非必要的动画，或考虑为用户提供一个偏好设置，让他们可以关闭动画，例如当他们使用低功率设备或电池电量有限的移动设备时。

2. 对于关键的 DOM 动画，建议尽可能使用 CSS 动画，而不是 JavaScript 动画（Web 动画 API 提供了一种通过 JavaScript 直接连接到 CSS 动画的方式）。

**直接使用浏览器执行 DOM 动画而不是使用 JavaScript 操纵内联样式表的效率更高**。

> 另请参阅 [CSS 性能优化 > 处理动画](https://developer.mozilla.org/zh-CN/docs/Learn/Performance/CSS#%E5%A4%84%E7%90%86%E5%8A%A8%E7%94%BB)。

3. 建议使用 `Window.requestAnimationFrame()`， 对无法在 JavaScript 中处理的动画效果明显。例如在 canvas 上创建的动画

> requestAnimationFrame() 方法专门设计用于高效、一致地处理动画帧，以获得流畅的用户体验。

::: details requestAnimationFrame() 示例

```js
function loop() {
  // 在绘制下一帧动画之前清除 canvas
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
  ctx.fillRect(0, 0, width, height)

  // 在 canvas 上绘制对象并更新其位置数据，
  // 准备下一帧动画
  for (const ball of balls) {
    ball.draw()
    ball.update()
  }

  // 调用 requestAnimationFrame，在正确的时间再次运行 loop() 函数，
  // 以保持动画的流畅性
  requestAnimationFrame(loop)
}

// 调用 loop() 函数一次，启动动画
loop()
```

:::

## 优化事件性能

跟踪及处理事件对于浏览器来说是很耗资源的，特别是当你持续运行一个事件时。例如，你可以使用 mousemove 事件来跟踪鼠标的位置，以检查它是否仍在页面的某个区域内

```js
function handleMouseMove() {
  // 当鼠标指针在 elem 内时执行一些操作
}

elem.addEventListener('mousemove', handleMouseMove)
```

实际上，继续保持监听该事件将浪费处理能力。因此，最好是删除不再需要的事件监听器。可以使用 removeEventListener() 来实现：

```js
elem.removeEventListener('mousemove', handleMouseMove)
```

::: details 另一个要点是尽可能使用事件委托。

当你有一些代码需要在用户与大量子元素中的任何一个进行交互时，可以在它们的父元素上设置事件监听器。在任何子元素上触发的事件都会冒泡到它们的父元素，这样你无需单独为每个子元素设置事件监听器。减少要跟踪的事件监听器数量可以提高性能。

:::

## 编写更高效代码的技巧

### 减少 DOM 操作

访问和更新 DOM 的计算成本很高，因此你应该尽量减少 JavaScript 这种操作方面的操作量，特别是在执行持续的 DOM 动画时

### 批量进行 DOM 更改

对于重要的 DOM 更改，你应该将它们按批次处理，而不是在每个更改发生时单独执行。这可以减少浏览器实际执行的工作量，并`改善感知性能`。**将多个更新一次性完成，而不是不断进行小的更新**，可以使界面看起来更流畅。

一个有用的技巧是，当你有大量 HTML 代码要添加到页面时，先构建整个片段（通常在 **DocumentFragment** 内部），然后一次性将其附加到 DOM 中，而不是逐个附加每个项目。

### 简化 HTML 代码

DOM 树越简单，使用 JavaScript 进行访问和操作的速度就越快。仔细思考你的用户界面的需求，并删除不必要的冗余代码。

### 减少循环代码的数量

循环是很消耗资源的，因此尽可能减少代码中的循环使用量。在不可避免使用循环的情况下

**1. 在不必要时避免运行完整的循环**，适时使用 `break` 或 `continue` 语句。 例如，如果你正在搜索数组中的特定名称，找到名称后就可以跳出循环；没有必要继续运行循环迭代：

```js
function processGroup(array) {
  const toFind = 'Bob'
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] === toFind) {
      processMatchingArray(array)
      break
    }
  }
}
```

**2. 在循环外执行只需要做一次的工作**

这可能听起来有点显而易见，但很容易被忽视。看下面的代码片段，它获取一个包含要进行某种处理的数据的 JSON 对象。在这种情况下，fetch() 操作在每次循环迭代中都被执行，这是一种浪费计算能力的做法。

```js
async function returnResults(number) {
  for (let i = 0; i < number; i++) {
    const response = await fetch(`/results?number=${number}`)
    const results = await response.json()
    processResult(results[i])
  }
}
```

优化：这样网络获取操作只会执行一次

```js{2,3}
async function returnResults(number) {
  const response = await fetch(`/results?number=${number}`)
  const results = await response.json()
  for (let i = 0; i < number; i++) {
    processResult(results[i])
  }
}
```

**3. 将计算任务移到主线程之外**

在前面我们谈到了 JavaScript 通常在主线程上运行任务，长时间的操作可能会阻塞主线程，从而导致 UI 性能很差。我们还展示了如何将长任务分解为较小的任务，以缓解这个问题。处理这类问题的另一种方法是将任务完全移到主线程之外。有几种方法可以实现这一点：

::: details 使用异步代码
异步 JavaScript 基本上是指`不会阻塞主线程`的 JavaScript。异步 API 通常用于处理诸如从网络获取资源、访问本地文件系统上的文件或打开用户网络摄像头流等操作。因为这些操作可能需要很长时间，所以在等待它们完成的过程中阻塞主线程是不好的。

相反，浏览器会执行这些函数，继续运行后续代码，这些函数将在将来某个时间点返回结果。`现代异步 API 基于 Promise`，这是一种用于处理异步操作的 JavaScript 语言特性。如果你有功能可以从异步运行中受益，则可以编写自己的基于 Promise 的函数。
:::

::: details 在 Web Worker 中进行计算
Web Worker 是一种机制，允许你`打开一个单独的线程来运行`一段 JavaScript 代码，以便`不会阻塞主线程`。Worker 有一些限制，最大的限制是你**不能在 Worker 内部运行 DOM 脚本**。你可以执行大多数其他操作，并且 Worker 可以与主线程之间发送和接收消息。

Worker 的主要用例是如果你有大量计算需要进行，而不希望它阻塞主线程，那么就需要使用 Worker。在 Worker 中进行计算，等待结果，并在准备好时将结果发送回主线程。
:::

::: details 使用 WebGPU
WebGPU 是一种浏览器 API，允许 Web 开发人员使用底层系统的 GPU（Graphics Processing Unit，图形处理单元）来进行`高性能计算和绘制复杂的图像`，这些图像可以在浏览器中呈现。它相对复杂，但可以提供比 Web Worker 更好的性能优势。
:::

## 参考

- MDN [JavaScript 性能优化](https://developer.mozilla.org/zh-CN/docs/Learn/Performance/JavaScript)
- MDN [优化长任务](https://web.dev/articles/optimize-long-tasks)
