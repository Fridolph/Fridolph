# MVVM、响应式与数据流自测

## 1. MVVM 是什么？和双向绑定等价吗？

**参考回答：** MVVM 按 Model、View、ViewModel 划分职责。Model 承载数据与业务，View 负责展示，ViewModel 提供视图所需状态与操作，让视图和业务之间更容易分离。自动绑定是常见手段，但双向绑定不是 MVVM 的唯一定义，也不是所有状态都应该双向共享。

**追问：** Vue 应用中服务、组件状态和模板怎样对应这些职责？映射是理解架构的工具，不必把每个框架文件硬塞进某一层。

## 2. Vue 2 和 Vue 3 响应式有什么差异？

**参考回答：** Vue 2 主要基于 Object.defineProperty，对新增 / 删除属性和部分数组操作有使用限制；Vue 3 的 reactive 以 Proxy 为核心，ref 等还有不同实现形式。Proxy 只是拦截机制，框架仍要做依赖追踪、触发、调度和嵌套对象处理。

**追问：** 为什么解构 reactive 对象的普通标量属性后会失去响应式连接？为什么 watch 要传 getter / ref 等合法来源？参见[Vue 响应式原理](/概念与原理/07vue/s_vue_1-reactive)。

## 3. 双向绑定和单向数据流冲突吗？

**参考回答：** Vue 组件默认依然是 props 向下、事件向上；v-model 可以看成特定属性与更新事件的约定。父组件拥有状态，子组件报告修改意图，比子组件直接改父组件数据更容易追踪。React 的单向数据流也能实现表单交互，不能由是否双向绑定判断框架优劣。

**追问：** 同一状态被多处展示时谁拥有它？用 computed 派生与 watcher 维护副本，哪一种更容易保持一致？

## 4. 响应式更新为什么不等于同步修改 DOM？

**参考回答：** 状态变化可以立即发生，但 DOM 更新通常由框架调度批处理。需要等待对应 DOM 刷新时使用 nextTick 等机制；副作用还要有清理与取消，防止旧请求覆盖新状态。nextTick 不代表图片加载、网络完成或浏览器已经绘制所有内容。

**追问验证：** 输入框触发搜索，用 watcher 取消旧请求并校验结果有效性；组件卸载时清理监听和计时器。历史 AngularJS 脏检查可作为对比，不代表当代所有 Angular 版本的实现。

> 来源：[个人 interviewMap / MVVM](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/interviewMap/框架通识/mvvm.md)；[Vue 响应式深入](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html)；[组件 v-model](https://cn.vuejs.org/guide/components/v-model.html)。
