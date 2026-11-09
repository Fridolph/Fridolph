# Hooks 深入

## 概念

Hooks 让函数组件使用 state 和 React 其他特性。

**规则**：只在函数顶层调用；只在 React 函数中调用。

## 核心 Hooks 详解

### useReducer

state 逻辑复杂时替代 useState：

```jsx
const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 }
    case 'decrement': return { count: state.count - 1 }
    default: return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)
}
```

### useMemo

缓存计算结果，仅在依赖变化时重新计算：

```jsx
const filtered = useMemo(() => {
  return items.filter(item => item.cat === filter)
}, [items, filter])
```

**适用**：复杂计算。**不要滥用**：简单计算的开销可能大于 useMemo 本身。

### useCallback

缓存函数引用，避免子组件不必要重渲染：

```jsx
const handleClick = useCallback(() => {
  setCount(prev => prev + 1)
}, [])
```

`useCallback(fn, deps)` 等价于 `useMemo(() => fn, deps)`

### useRef

创建在渲染间保持不变的引用，修改不触发重渲染：

```jsx
const inputRef = useRef(null)
// inputRef.current?.focus()
```

**常见用途**：访问 DOM、存储不触发渲染的变量、避免闭包陷阱。

### useLayoutEffect

与 `useEffect` 签名相同，但在**浏览器绘制之前**同步执行：

```jsx
useLayoutEffect(() => {
  // 测量 DOM 尺寸，避免闪烁
}, [])
```

优先用 `useEffect`，仅在遇到布局闪烁时改用 `useLayoutEffect`。

## 自定义 Hook

封装可复用逻辑：

```jsx
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false
    setLoading(true)

    fetch(url)
      .then(r => r.json())
      .then(d => { if (!ignore) setData(d) })
      .catch(e => { if (!ignore) setError(e) })
      .finally(() => { if (!ignore) setLoading(false) })

    return () => { ignore = true }
  }, [url])

  return { data, loading, error }
}
```

## 面试常问

- useMemo 和 useCallback 的区别？各适合什么场景？
- useRef 除了操作 DOM 还有哪些用法？
- useLayoutEffect 和 useEffect 的执行时机区别？
- 设计通用 useFetch 需要考虑哪些边界情况？

## 参考

- [React: Built-in React Hooks](https://react.dev/reference/react/hooks)
- [useMemo 与 useCallback 使用哲学](https://kentcdodds.com/blog/usememo-and-usecallback)
