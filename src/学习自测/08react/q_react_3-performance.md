# React 性能优化实战

> 以下问题考察真实项目中的性能诊断与优化能力。

## 1. 如何用 React DevTools Profiler 定位性能瓶颈？

**场景**：产品反馈"这个页面加载后操作很卡"，你需要找出原因。

::: details

**步骤**：

1. React DevTools → Profiler 面板 → 录制操作过程（点击、输入、切换等）
2. 分析 **Flamegraph**：横条越宽 = 渲染耗时越长
3. 分析 **Ranked** 视图：按耗时排序，找最慢的组件
4. 关注**灰色条**（commit 但未实际改变的组件）：说明这些组件做了无意义的重渲染

**典型发现与修复**：
- 某个叶子组件重复渲染很多次 → 检查父组件是否每次都传新引用 → 加 `useCallback` / `useMemo`
- 列表项全部重渲染 → 检查 key 是否稳定 → 加 `React.memo`
- Context consumer 过多 → 检查是否需要拆分 Context

**量化目标**：把单次操作的 commit 时间从 200ms 降到 16ms 以内（60fps）。
:::

## 2. 哪些组件该用 React.memo？哪些不该用？

**场景**：团队新人给每个组件都加了 `React.memo`。Code Review 时你如何引导？

::: details

**应该用 memo 的组件**：

- **纯展示组件**：props 进来只做渲染，无副作用，props 变化频率低
- **列表项组件**：列表数据变化时只有少数项需要更新
- **渲染开销大的组件**：内部有大量计算或复杂 DOM 结构

**不该用 memo 的组件**：

- **props 每次都会变的组件**：memo 的浅比较本身也有开销，且最终还是要渲染
- **已经足够快的简单组件**：一个简单的 `<div>` 加 memo 得不偿失
- **从 Context 消费的组件**：Context 变化时 memo 无效

**判断方法**：

```jsx
// 用 Profiler 看 memo 前后差异
// 如果 props 浅比较的耗时 ≈ 组件渲染耗时，不要用 memo
// 如果 props 浅比较的耗时 << 组件渲染耗时，可以用 memo
```

**原则**：先测后加，不是先加后测。
:::

## 3. 代码分割的最佳实践：lazy + Suspense + 路由

**场景**：项目越来越大，首屏 bundle chunk 已超过 500KB，需要代码分割。

::: details

**页面级分割**（最重要）：

```jsx
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings = lazy(() => import('./pages/Settings'))
const Reports = lazy(() => import('./pages/Reports'))

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Suspense>
  )
}
```

**组件级分割**：

```jsx
// 大型图表库、编辑器等仅在需要时加载
const HeavyChart = lazy(() => import('./HeavyChart'))

function Dashboard() {
  const [showChart, setShowChart] = useState(false)

  return (
    <div>
      <button onClick={() => setShowChart(true)}>查看图表</button>
      {showChart && (
        <Suspense fallback={<Skeleton />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  )
}
```

**错误处理**：

```jsx
class LazyErrorBoundary extends React.Component {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>加载失败</p>
          <button onClick={() => this.setState({ hasError: false })}>重试</button>
        </div>
      )
    }
    return this.props.children
  }
}
```

**分割原则**：页面路由是第一优先级，大型第三方库是第二优先级。
:::

## 4. 虚拟列表的实现原理与生产环境踩坑

**场景**：产品列表页有几千条数据，需要流畅滚动和快速搜索。

::: details

**原理**：

```
滚动容器高度 600px
单项高度 50px
→ 可见项 = 600 / 50 = 12 项（渲染 12~14 个 DOM 节点即可）

根据 scrollTop 计算 startIndex，只渲染 startIndex ~ startIndex+12 的项
其他项的 DOM 不创建（用空白 div 占位）
```

**关键计算**：

```javascript
const startIndex = Math.floor(scrollTop / itemHeight)
const endIndex = Math.min(startIndex + visibleCount + overscan, items.length)
const visibleItems = items.slice(startIndex, endIndex)
const offsetY = startIndex * itemHeight  // 顶部偏移量
```

**生产踩坑**：
- 项高度不一致 → 需要动态高度方案（react-virtuoso 或自己维护高度缓存）
- 快速滚动白屏 → 增加 overscan（预渲染上下各 3~5 项）
- 滚动条跳动 → 确保总高度计算正确，占位容器高度 = items.length * itemHeight
- 搜索过滤后位置跳变 → 过滤后重置 scrollTop

**库推荐**：`@tanstack/react-virtual`（灵活），`react-virtuoso`（动态高度开箱即用）。
:::

## 5. useMemo 是否越多越好？举例滥用场景

**场景**：Code Review 中看到大量 useMemo 和 useCallback，几乎每个变量和函数都包了一层。

::: details

**滥用案例**：

```jsx
// 滥用1：简单计算不需要 memo
const double = useMemo(() => count * 2, [count])
// useMemo 的内存分配 + 依赖比较开销 > count * 2 的计算开销

// 滥用2：传递简单值给原生 DOM
const onClick = useCallback(() => handleClick(id), [id])
<button onClick={onClick}>  // 没必要，button 不是 memo 组件

// 滥用3：每次都变的依赖
const value = useMemo(() => heavy(data), [data])  // data 每次渲染都变，memo 无效
```

**正确使用**：

```jsx
// 正确1：复杂计算
const sorted = useMemo(() => items.sort(complexCompare), [items])

// 正确2：配合 memo 子组件
const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(i => i.id !== id))
}, [])  // 依赖为空，引用永远不变

<ExpensiveChild onDelete={handleDelete} />  // ExpensiveChild 是 memo 组件
```

**判断标准**：能用 Profiler 证明不加 memo 造成了实际性能问题再考虑加，不要出于"预防"目的添加。
:::

## 6. 首屏加载 3 秒优化到 1 秒，从 React 角度可以做什么？

**场景**：Lighthouse 评分 45，首屏加载 3.2s。作为前端，你从 React 层面如何优化？

::: details

**React 层面优化清单**：

1. **代码分割**（收益最大）：路由级 lazy + Suspense，减小主 bundle
2. **Tree Shaking**：检查是否引入了整个库而非按需导入（如 lodash → lodash-es）
3. **减少第三方库**：moment.js → day.js（节省 90%），移除重复功能库
4. **React.memo + useMemo**：减少不必要的重渲染和重计算
5. **SSR / SSG**：Next.js getStaticProps 预渲染首屏静态内容
6. **图片优化**：next/image、WebP 格式、懒加载
7. **预加载关键资源**：`<link rel="preload">` 首屏必需 JS/CSS
8. **移除阻塞渲染的 JS**：非首屏 JS 加 `defer` 或 `async`
9. **虚拟列表**：首屏大量数据的场景
10. **分析 bundle**：`next build --analyze` 或 `source-map-explorer`，找出大模块

**优化的顺序**：先分析 → 找最大 ROI 的项 → 一次改一项 → 重新测量。不要同时改多项，无法判断哪个有效。
:::

> 参考：React 官方性能优化指南，web.dev/vitals
