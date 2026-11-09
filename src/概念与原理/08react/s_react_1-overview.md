# React 概述

## 概念

React 是 Facebook（Meta）开源的用于构建**用户界面**的 JavaScript 库。它的核心理念是**声明式、组件化、一次学习随处编写**。React 不是框架——它只关注视图层，路由、状态管理等由社区生态补充。

## 核心特性

### 声明式

你只需要描述"界面应该长什么样"，React 负责高效地更新和渲染。当数据变化时，React 自动计算出最小 DOM 操作。

### 组件化

UI 被拆分为独立、可复用的组件，每个组件管理自己的状态和渲染逻辑。

### 单向数据流

数据从父组件通过 Props 流向子组件，子组件不能直接修改父组件数据，使数据流可预测、易于调试。

## Virtual DOM

React 在内存中维护虚拟 DOM 树，状态变化时：

1. 生成新虚拟 DOM 树
2. 与旧的进行 **Diff（差异对比）**
3. 计算最小 DOM 操作集合
4. 批量更新真实 DOM

避免直接频繁操作 DOM 带来的性能问题。

## React vs Vue vs Angular

| 维度 | React | Vue | Angular |
|------|-------|-----|---------|
| 类型 | UI 库 | 渐进式框架 | 完整框架 |
| 数据绑定 | 单向 | 双向（v-model） | 双向 |
| 状态管理 | 社区（Redux/Zustand） | Pinia | 内置 RxJS |
| 适用场景 | 中大型应用 | 快速开发 | 企业级 |

## 面试常问

- React 是框架还是库？为什么这样定位？
- Virtual DOM 的工作流程？解决了什么问题？

## 参考

- [React 官方文档](https://react.dev/)
- [React GitHub](https://github.com/facebook/react)
