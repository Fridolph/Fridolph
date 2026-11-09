# State 与生命周期

## 概念

State 是组件的**私有数据**，随时间变化。当 state 改变时，React 自动重新渲染组件。

**Props vs State**：Props 是父组件传入的（只读），State 是组件自己管理的（可变）。

## useState

```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>当前计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(prev => prev + 1)}>+1（函数式）</button>
    </div>
  )
}
```

### 关键特性

**异步批处理**：同一事件中多次 setState 合并为一次更新：

```jsx
setCount(count + 1)
setCount(count + 1) // 只加了一次

// 使用函数式更新确保基于最新值
setCount(prev => prev + 1)
setCount(prev => prev + 1) // 正确加了两次
```

**不可变更新**：始终创建新对象/数组，不直接修改：

```jsx
// 正确
setUser({ ...user, name: '新名字' })
setItems([...items, newItem])

// 错误：直接修改不会触发重渲染
user.name = '新名字'
```

## useEffect

处理**副作用**（数据请求、订阅、DOM 操作等）：

```jsx
import { useEffect, useState } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let ignore = false

    fetch(`/api/user/${userId}`)
      .then(res => res.json())
      .then(data => { if (!ignore) setUser(data) })

    return () => { ignore = true }  // 清理函数
  }, [userId])

  return <div>{user?.name}</div>
}
```

### 依赖数组

| 依赖数组 | 执行时机 |
|---------|---------|
| `[]` | 仅在挂载时执行一次 |
| `[a, b]` | 挂载时 + a 或 b 变化时 |
| 不传 | 每次渲染后都执行 |

### 清理函数

用于取消订阅、清除定时器、中断请求——防止内存泄漏和组件卸载后 setState。

## 类组件生命周期映射

| 类组件 | Hooks |
|--------|-------|
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate` | `useEffect(() => {})` |
| `componentWillUnmount` | `useEffect` 的清理函数 |
| `shouldComponentUpdate` | `React.memo` + `useMemo` |

## 面试常问

- 直接修改 state 为什么不会触发重渲染？
- `setCount(count+1)` 连续调用两次，count 变化几次？
- useEffect 的三种依赖数组区别？cleanup 何时执行？

## 参考

- [React: State - A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [useEffect 完整指南 - Dan Abramov](https://overreacted.io/a-complete-guide-to-useeffect/)
