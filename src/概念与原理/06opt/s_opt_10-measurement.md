# 性能测量：从时间戳到真实用户体验

## 先定义问题

“网站慢”可能是加载慢、交互卡、后端慢或资源成本高。先建立指标、设备 / 网络条件、样本量和基线，再修改代码，最后比较同等条件的结果。一次 Lighthouse 分数提高不证明所有用户体验都改善。

| 层面 | 观察指标 | 要点 |
| --- | --- | --- |
| 加载体验 | LCP | 核心内容何时呈现，良好阈值通常为不超过2.5秒 |
| 交互响应 | INP | 页面交互响应，良好阈值通常为不超过200毫秒 |
| 视觉稳定 | CLS | 意外布局偏移，良好阈值通常为不超过0.1 |
| 网络 / 服务 | TTFB、请求耗时、错误率 | TTFB 包括网络、连接和服务端等待，不能全部归因后端 |
| 主线程 | 长任务、脚本 / 布局 / 绘制时间 | 实验室 TBT 可辅助定位，但不等于真实 INP |

Web Vitals 通常按真实访问第75百分位评估，并按移动 / 桌面等维度区分；不能拿本机一次最好结果代替真实分布。实验室工具用于复现和定位，RUM 用于观察真实用户，二者互补。

## Navigation / Resource Timing

旧 `performance.timing` / `performance.navigation` API 已过时，优先使用 Performance Timeline：

```js
// 在浏览器 Console 中于 load 完成后运行
const navigation = performance.getEntriesByType('navigation')[0]
if (navigation) {
  console.table({
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    connection: navigation.connectEnd - navigation.connectStart,
    responseWait: navigation.responseStart - navigation.requestStart,
    responseTransfer: navigation.responseEnd - navigation.responseStart,
    domContentLoaded: navigation.domContentLoadedEventEnd,
    load: navigation.loadEventEnd,
  })
}
```

这些时间通常相对 timeOrigin，不是 Unix 时间戳；load 尚未结束时相关值可能为0。复用连接时 DNS / 连接阶段可能为0，不能解释成“网络没有成本”。Resource Timing 的跨源细节需要服务端 Timing-Allow-Origin 等条件；访问到一个资源不代表能读取所有计时字段。

```js
const supported = PerformanceObserver.supportedEntryTypes ?? []
if (supported.includes('longtask')) {
  const observer = new PerformanceObserver(list => {
    for (const entry of list.getEntries()) console.log(entry.startTime, entry.duration)
  })
  observer.observe({ type: 'longtask', buffered: true })
  // 实际应用在采集结束 / 页面销毁时 observer.disconnect()
}
```

完整 LCP / INP 采集涉及页面生命周期与兼容性，优先成熟的 web-vitals 实现，不把这个长任务片段冒充完整监控 SDK。

## 实践记录模板

记录：场景 → 基线 → 瓶颈证据 → 修改 → 对照结果 → 代价 → 回退条件。用 Performance 面板定位主要时间，再看 Coverage、Network、服务端追踪和数据库执行计划；不要先背一串优化技巧再逐个加入。

**自测：** 首屏变快但 INP 变差可能是什么原因？为什么压缩包小了但 LCP 没改善？为什么第75百分位比平均值更能暴露部分慢用户？

> 来源：[个人性能基础笔记](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/性能优化相关/基础优化)（其中 Performance 摘记参考 [JokerWebFont / Performance](https://github.com/ChenChenJoke/JokerWebFont/tree/master/Performance)）；[Web Vitals](https://web.dev/articles/vitals)；[MDN Performance API](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance_API)。
