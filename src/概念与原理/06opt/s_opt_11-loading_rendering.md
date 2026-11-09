# 资源加载、图片与渲染优化

## 从请求数量转向关键路径

HTTP/1.1 时代常通过合并文件减少连接和请求开销；HTTP/2 / 3 下仍有请求与解析成本，但过度合并会损害按需加载和缓存复用。拆包、压缩、CDN 与预加载都要结合访问路径和指标验证，不盲目域名分片。

构建压缩减少源代码体积，Brotli / gzip 减少传输大小，二者不是加密。图片与视频往往已有专用压缩，不应无条件重复压缩。优先移除未使用资源，再讨论传输层优化。

## 图片：内容、尺寸与加载时机

```html
<picture>
  <source type="image/avif" srcset="/images/cover.avif">
  <source type="image/webp" srcset="/images/cover.webp">
  <img src="/images/cover.jpg" alt="描述实际内容"
       width="1200" height="800" fetchpriority="high">
</picture>
```

这段是独立项目的示意路径，本项目未添加这些图片。根据目标浏览器提供格式回退，用 srcset / sizes 适配视口与像素密度；显式宽高预留比例，降低布局偏移。LCP 主图不宜设置 loading=lazy，优先级提示也不应给所有图片。

屏外非关键图可用原生 `loading="lazy"`；复杂场景用 IntersectionObserver 并在不再需要时解除观察，不必每次滚动遍历所有图片位置。Base64 约增加三分之一原始编码大小，还可能损害独立缓存，不适合一律内联大图。

## CSS 与脚本执行

| 方式 | 加载与执行 |
| --- | --- |
| 普通经典 script | 遇到后通常暂停解析，获取并执行；预加载扫描器可能提前发现后续资源 |
| defer | 并行获取，解析结束后按顺序执行，影响 DOMContentLoaded 时机 |
| async | 并行获取，就绪后执行，不保证顺序；执行本身仍会占用主线程 |
| module | 默认有类似 defer 的语义，依赖图和 async 属性还会影响执行 |

CSS 常阻塞渲染，并可能阻塞依赖样式的脚本执行，不能简单说成“CSS 阻止所有资源下载”。关键 CSS、代码拆分、preload / preconnect 都应适量：预加载过多会争抢真正关键资源。

## 回流、重绘与合成

修改布局相关属性可能触发布局，颜色等变化可能只需绘制。某些 transform / opacity 动画有机会在合成阶段处理，但是否升层和实际成本取决于浏览器与内容；不是加上 translateZ 就保证更快。

```js
// 反例：写入后立刻读取布局，可能强迫同步布局
for (const element of elements) {
  element.style.width = '200px'
  console.log(element.offsetWidth)
}
// 改进方向：先集中读取所需尺寸，再批量写入；用面板验证实际布局次数
```

并非每次读取都会触发布局；关键是此前样式 / 布局是否失效。`opacity: 0` 的元素仍可能接收点击和键盘焦点，不等于 `visibility: hidden`，更不能为了动画牺牲交互正确性。will-change 应局部、短期使用，过多合成层会消耗内存。

减少大 DOM、分批处理长任务、必要时虚拟列表；Web Worker 适合可迁移的计算，不能直接操作 DOM。requestAnimationFrame 与显示刷新率协作，不保证每16毫秒执行一次。

**练习：** 为一个图片列表记录冷加载瀑布、LCP 和滚动长任务；分别试验尺寸声明、懒加载和 DOM 批处理，说明每项改善的是哪一段。

> 来源：[个人资源、图片、加载与渲染笔记](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/性能优化相关)；[MDN 脚本元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script)；[web.dev 图片优化](https://web.dev/learn/images/)。
