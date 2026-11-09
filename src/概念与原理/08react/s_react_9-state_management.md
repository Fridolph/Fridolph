# React 状态管理

## 概念

状态管理解决的核心问题：**多组件共享数据，且数据变化时相关组件自动更新**。React 提供 useState 和 Context 作为内置方案，复杂场景可使用第三方库。

## 内置方案 vs 第三方库

| 方案 | 适用场景 | 局限性 |
|------|---------|--------|
| useState | 组件内部状态 | 无法跨组件共享 |
| Context | 低频全局状态（主题/语言） | 性能问题、无中间件 |
| useReducer | 复杂局部状态 | 仍无法跨组件 |

## 主流库对比

### Redux Toolkit

React 生态最成熟的方案，单向数据流、时间旅行调试：

```js
import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1 },
    decrement: state => { state.value -= 1 },
  },
})

const store = configureStore({ reducer: counterSlice.reducer })
```

**适用**：大型项目、需要 Redux DevTools、团队熟悉 Redux。

### Zustand

极简 API，无 boilerplate，基于 Hook：

```js
import { create } from 'zustand'

const useStore = create(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
}))

// 组件中
const count = useStore(state => state.count)  // 自动选择式订阅
```

**适用**：中小型项目、追求简洁、不想写 Redux 样板代码。

### Jotai

原子化状态，Recoil 风格，按需订阅：

```js
import { atom, useAtom } from 'jotai'

const countAtom = atom(0)

function Counter() {
  const [count, setCount] = useAtom(countAtom)
}
```

**适用**：需要细粒度按需渲染、状态间有依赖关系。

### React Query / SWR

专注**服务端状态**（异步数据），自动管理 loading/error/cache/refetch：

```js
import { useQuery } from '@tanstack/react-query'

const { data, isLoading, error } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetch(`/api/user/${userId}`).then(r => r.json()),
})
```

## 选型决策

| 场景 | 推荐 |
|------|------|
| 简单全局状态 | Context + useReducer |
| 中型项目、快速开发 | Zustand |
| 大型项目、需要中间件 | Redux Toolkit |
| 细粒度响应式 | Jotai |
| 异步数据/服务端状态 | React Query / SWR |

**核心原则**：服务端数据用 React Query，客户端状态用 Zustand，避免所有数据塞 Redux。

## 面试常问

- Redux / Zustand / Jotai 的核心区别和选型依据？
- React Query 与传统状态管理库的分工是什么？
- 设计支持撤销/重做的状态管理方案。

## 参考

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Zustand](https://docs.pmnd.rs/zustand)
- [TanStack Query](https://tanstack.com/query)
