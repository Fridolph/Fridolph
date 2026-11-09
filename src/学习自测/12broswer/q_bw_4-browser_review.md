# 浏览器机制串联自测

## 1. 事件循环和渲染如何配合？

**参考回答：** 主线程执行当前任务后会在规定时机进行微任务检查，浏览器在合适的渲染机会更新页面。Promise 回调和 queueMicrotask 常进入微任务；不断加入微任务可能延迟后续任务和渲染，不是“异步就不卡”。浏览器不会保证每轮都渲染，也不固定每16毫秒刷新一次。

**验证：** 比较 setTimeout 与 Promise 的日志顺序，再用长微任务链观察页面响应。不要把后台标签页节流当正常前台时序。

## 2. 捕获、目标与冒泡的顺序？

**参考回答：** 事件沿路径进行捕获，到达目标，再在支持冒泡的事件中向外传播。目标上的捕获和非捕获监听器也有各自阶段规则，不能一概说“同节点只按注册顺序”。stopPropagation 不等于阻止默认行为，preventDefault 也不停止传播；passive 监听器不能靠 preventDefault 阻止默认行为。

**验证：** 在父子元素分别注册捕获与冒泡监听，记录 eventPhase、target、currentTarget；事件委托还需考虑事件是否冒泡、Shadow DOM 重定向和组件销毁清理。

## 3. 从 HTML 到屏幕发生了什么？

**参考回答：** 解析 HTML / CSS，建立相关结构，计算样式和布局，再绘制与合成。脚本、样式和资源优先级会影响进程，不是所有步骤严格一次性串行。DOMContentLoaded 与解析及相关延迟脚本有关；load 也不代表所有懒加载资源都完成。

**追问：** transform 动画一定不重绘吗？读取 offsetWidth 为什么有时触发布局、有时不会？关联[资源与渲染](/概念与原理/06opt/s_opt_11-loading_rendering)。

## 4. 浏览器存储怎样选？

**参考回答：** 少量偏好可放 localStorage，大量结构化数据适合 IndexedDB；Cookie 用于随请求携带的状态，sessionStorage 面向页面会话。都要考虑作用域、同步成本、配额与回收。IndexedDB 不是无限空间，也不是无需同步的服务端替代品。

**追问：** 两个标签页的 sessionStorage 是否总相同？删除浏览器缓存会清掉哪些存储？应区分工具操作选项而非统一下结论。

## 5. 跨域问题如何定位？

**参考回答：** 先比较协议、主机、端口，再看是否预检、请求是否实际发出、返回哪些 CORS 字段、凭据模式是否匹配。CORS 限制浏览器脚本读取，不是服务器拒绝一切跨源流量。开发代理让浏览器请求同源地址，实际服务端仍要设计生产跨域策略。

**追问：** 为什么简单表单可造成跨站写操作？iframe 跨源通信应使用校验 origin 与数据结构的 postMessage，而不是放开整个同源策略。

关联：[CORS 与身份机制](/概念与原理/04http/s_http_8-cors_identity)、[浏览器存储](/概念与原理/06opt/s_opt_12-storage_cache)。

> 来源：[个人 interviewMap / Browser](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/interviewMap/Browser)；[MDN DOM 事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Events)；[HTML 事件循环规范](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)。
