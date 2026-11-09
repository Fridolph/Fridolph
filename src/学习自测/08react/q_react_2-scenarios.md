# React 生产场景实战

> 以下问题模拟真实生产环境中前端开发者会遇到的实际场景。

## 1. 表单页面输入卡顿：如何定位和优化？

**场景**：一个复杂表单页面包含 30+ 个输入字段，每次输入都有明显延迟。React DevTools 显示每秒数十次渲染。

::: details

**排查思路**：

1. **React DevTools Profiler** 录制输入操作，查看 flamegraph 中哪些组件渲染耗时最长
2. 检查是否有组件在**不需要更新**时重渲染（Profiler 中灰色表示"没有变化但重渲染了"）
3. 在浏览器 Performance 面板中检查是否为 JS 执行阻塞，还是 layout/paint 瓶颈

**常见根因与修复**：

- **未使用受控组件但触发了大量渲染**：确保 `onChange` 中使用 `useCallback`，子组件用 `React.memo` 包裹
- **父组件 state 变化导致所有子组件重渲染**：将表单拆分为独立子组件，各自管理内部 state，仅在提交时聚合
- **计算属性每次渲染重新计算**：用 `useMemo` 缓存选项列表、校验结果等
- **Context 滥用**：全局 Context 频繁更新导致表单组件不断渲染 → 拆分 Context

**修复后验证**：用 `why-did-you-render` 库或 React DevTools 的 "Highlight updates" 确认渲染范围是否合理。
:::

## 2. 组件卸载后 setState 报错如何排查？

**场景**：页面快速切换时，控制台报 `Can't perform a React state update on an unmounted component`。

::: details

**根因**：异步操作（网络请求、定时器）的回调在组件已卸载后执行了 setState。

**排查**：找到报错堆栈中 setState 的位置，确认其所在的回调是否可能延迟执行。

**解决方案**：

```jsx
useEffect(() => {
  let isCancelled = false

  fetchUser(id).then(data => {
    if (!isCancelled) setUser(data)
  })

  return () => {
    isCancelled = true  // 卸载时标记，防止 setState
  }
}, [id])
```

**更完善的方案**：使用 `AbortController` 中断请求：

```jsx
useEffect(() => {
  const controller = new AbortController()

  fetch(`/api/user/${id}`, { signal: controller.signal })
    .then(r => r.json())
    .then(setUser)
    .catch(err => {
      if (err.name !== 'AbortError') setError(err)
    })

  return () => controller.abort()
}, [id])
```

生产环境建议用 React Query / SWR，自动处理竞态和取消。
:::

## 3. 搜索框防抖后结果与关键词错乱？

**场景**：搜索框输入 "react" 后立刻改为 "vue"，由于请求返回顺序不确定，结果先显示 "vue" 的，瞬间又变成 "react" 的。

::: details

**根因**：竞态条件（Race Condition）——后发出的请求可能先返回。

**解决方案**：

```jsx
useEffect(() => {
  let ignore = false

  setLoading(true)
  searchAPI(keyword).then(results => {
    if (!ignore) {
      setResults(results)
      setLoading(false)
    }
  })

  return () => { ignore = true }
}, [keyword])
```

更稳健：使用 `AbortController` 真正取消上一个请求，减少不必要的网络开销。

**生产最佳实践**：使用 React Query 的 `queryKey: ['search', keyword]`，它自动处理过期请求的丢弃。
:::

## 4. 10000 条数据列表渲染 + 实时搜索不卡顿？

**场景**：展示全部产品列表（10000+ 条），支持搜索过滤和滚动加载。

::: details

**不能做的事情**：一次性渲染 10000 个 DOM 节点。

**方案：虚拟列表 + 搜索优化**

1. **虚拟列表**：使用 `react-window` 或 `@tanstack/react-virtual`，仅渲染可视区域的 ~20 个元素
2. **搜索防抖**：输入停止 300ms 后再执行过滤
3. **搜索优化**：过滤逻辑用 `useMemo`，Web Worker 处理大量文本匹配
4. **分片渲染**：如果不用虚拟列表，用 `requestAnimationFrame` 分片插入 DOM

```jsx
import { FixedSizeList } from 'react-window'

function ProductList({ items }) {
  return (
    <FixedSizeList height={600} itemCount={items.length} itemSize={50}>
      {({ index, style }) => <div style={style}>{items[index].name}</div>}
    </FixedSizeList>
  )
}
```
:::

## 5. 全局 Context 更新导致大量无关组件重渲染？

**场景**：App 级 Context 包含 `{ user, theme, notifications }`，每次通知变化时所有消费组件都重渲染。

::: details

**未优化的危害**：Context value 中任何一个属性变化，所有 `useContext` 的组件都会重渲染。

**优化：拆分 Context**

```jsx
const UserContext = createContext()      // 登录后基本不变
const ThemeContext = createContext()     // 手动切换才变
const NotificationContext = createContext() // 频繁更新

// 用 useMemo 稳定 value 引用
function App() {
  const [notifications, setNots] = useState([])
  const notiValue = useMemo(() => ({ notifications, setNots }), [notifications])

  return (
    <NotificationContext.Provider value={notiValue}>
      {/* 只有 NotificationContext 变化时，相关组件才渲染 */}
    </NotificationContext.Provider>
  )
}
```

**判断标准**：如果数据不相关且变化频率不同，拆分到独立 Context。
:::

## 6. 实现通用 `useFetch` Hook 需要处理哪些边界？

**场景**：封装一个可复用的 useFetch Hook，需要处理 loading、error、data、重试、依赖变化自动请求、请求取消。

::: details

```jsx
function useFetch(url, options = {}) {
  const { retryCount = 0, retryDelay = 1000 } = options
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  })
  const retryRef = useRef(0)

  useEffect(() => {
    const controller = new AbortController()
    let isCancelled = false

    const fetchData = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }))

      try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (!isCancelled) setState({ data, loading: false, error: null })
      } catch (err) {
        if (isCancelled || err.name === 'AbortError') return

        if (retryRef.current < retryCount) {
          retryRef.current++
          setTimeout(fetchData, retryDelay)
        } else {
          setState({ data: null, loading: false, error: err.message })
        }
      }
    }

    fetchData()

    return () => {
      isCancelled = true
      controller.abort()
    }
  }, [url])

  return state
}
```

**考虑的边界**：组件卸载、快速切换 URL、网络错误、重试策略、请求取消。
:::

## 7. 多步骤表单：分步校验、最后汇总提交

**场景**：一个注册流程分 3 步（基本信息 → 详细资料 → 确认提交），每步独立校验，最后汇总提交。

::: details

**状态设计**：

```jsx
const [step, setStep] = useState(1)
const [formData, setFormData] = useState({
  basic: { name: '', email: '' },
  detail: { company: '', role: '' },
})
const [errors, setErrors] = useState({})

const validateStep = (stepNum) => {
  // 每步的校验逻辑，返回错误或 true
}

const nextStep = () => {
  const err = validateStep(step)
  if (Object.keys(err).length === 0) {
    setStep(prev => prev + 1)
  } else {
    setErrors(err)
  }
}

const submit = async () => {
  // 汇总所有数据，提交
  const allData = { ...formData.basic, ...formData.detail }
  await api.register(allData)
}
```

**关键设计**：
- 每步的 `formData[stepKey]` 独立管理，避免互相干扰
- 切换步骤时不清除已填写的数据
- 最终提交前做一次全量校验
- 步骤状态可持久化到 URL params（刷新不丢失）
:::

## 8. Next.js 水合错误：Text content does not match

**场景**：Next.js 项目控制台报 `Text content does not match server-rendered HTML`，页面内容闪烁后恢复正常。

::: details

**根因**：服务端渲染的 HTML 与客户端首次渲染不一致。

**常见触发**：
- 直接使用 `typeof window !== 'undefined'` 导致服务端/客户端分支
- 没有正确处理 `loading` 状态
- 依赖浏览器 API（localStorage、Date 等）在服务端不可用

**解决方案**：

```jsx
// 方案1：useEffect 延迟客户端渲染
const [isClient, setIsClient] = useState(false)
useEffect(() => setIsClient(true), [])

if (!isClient) return <Skeleton />  // 服务端渲染骨架屏
return <ClientOnlyComponent />

// 方案2：dynamic import with ssr: false
const NoSSRComponent = dynamic(() => import('./HeavyComponent'), { ssr: false })

// 方案3：suppressHydrationWarning（仅用于确定不重要的差异）
<div suppressHydrationWarning>{new Date().toLocaleString()}</div>
```
:::

> 参考：React 官方文档，Next.js 文档，个人实践经验整理
