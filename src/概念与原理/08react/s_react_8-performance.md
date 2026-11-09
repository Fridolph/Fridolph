# React 性能优化

## 概念

React 默认行为相对高效，但在复杂应用中仍需主动优化。性能优化的核心是**减少不必要的重渲染**和**减少 JavaScript 体积**。

## 优化策略

### React.memo

纯展示组件，props 不变时跳过渲染：

```jsx
const ExpensiveList = React.memo(({ items }) => {
  return <ul>{items.map(i => <li key={i.id}>{i.text}</li>)}</ul>
})
```

**适用**：纯展示组件、props 变化不频繁。**不适用**：props 每次都会变化的组件（memo 对比本身也有开销）。

### useMemo

缓存昂贵计算：

```jsx
const sorted = useMemo(() => {
  return items.sort((a, b) => a.score - b.score)
}, [items])
```

### useCallback

稳定函数引用，配合 memo 使用：

```jsx
const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(i => i.id !== id))
}, [])
```

### 代码分割与懒加载

```jsx
import { lazy, Suspense } from 'react'

const HeavyChart = lazy(() => import('./HeavyChart'))

function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyChart />
    </Suspense>
  )
}
```

配合路由实现页面级代码分割：

```jsx
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))

<Routes>
  <Route path="/" element={<Suspense fallback={<Spinner />}><Home /></Suspense>} />
  <Route path="/about" element={<Suspense fallback={<Spinner />}><About /></Suspense>} />
</Routes>
```

### 虚拟列表

对于长列表（1000+ 条），只渲染可视区域内的元素：

- `react-window`：轻量虚拟列表
- `@tanstack/react-virtual`：更灵活
- `react-virtuoso`：功能丰富

### 优化手段对比

| 手段 | 作用 | 代价 |
|------|------|------|
| memo | 跳过渲染 | 浅比较开销 |
| useMemo | 缓存值 | 内存 + deps 比对 |
| useCallback | 稳定引用 | 内存 + deps 比对 |
| lazy + Suspense | 代码分块 | 增加网络请求 |
| Virtual List | 减少 DOM 节点 | 滚动计算开销 |

## 面试常问

- React.memo 和 useMemo 的区别？各自使用场景？
- 如何用 React DevTools Profiler 定位性能瓶颈？
- useMemo 是否越多越好？举例滥用场景。

## 参考

- [React: useMemo](https://react.dev/reference/react/useMemo)
- [React 性能优化 - React 官方文档](https://react.dev/learn/render-and-commit)
