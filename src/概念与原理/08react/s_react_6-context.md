# Context API

## 概念

Context 提供了一种**跨组件层级传递数据**的方式，无需逐层手动传递 props。它解决了 Props Drilling 问题。

## 创建和使用

```jsx
import { createContext, useContext, useState } from 'react'

// 1. 创建 Context
const ThemeContext = createContext('light')

// 2. 提供值
function App() {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  )
}

// 3. 消费值
function Toolbar() {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      当前主题：{theme}
    </button>
  )
}
```

## 性能陷阱

Context value 变化时，所有消费该 Context 的组件都会重渲染——即使它们只用到了 value 中没变的那部分。

### 优化策略

**拆分 Context**：将经常变化和很少变化的数据分开：

```jsx
const ThemeContext = createContext('light')        // 很少变
const UserContext = createContext(null)            // 登录后基本不变
const NotificationContext = createContext([])      // 频繁变化
```

**useMemo 包裹 value**：防止不必要的 Provider 重渲染：

```jsx
function App() {
  const [theme, setTheme] = useState('light')
  const [user, setUser] = useState(null)

  const themeValue = useMemo(() => ({ theme, setTheme }), [theme])
  const userValue = useMemo(() => ({ user, setUser }), [user])

  return (
    <ThemeContext.Provider value={themeValue}>
      <UserContext.Provider value={userValue}>
        <Page />
      </UserContext.Provider>
    </ThemeContext.Provider>
  )
}
```

## Context vs 状态管理库

| 维度 | Context | Redux/Zustand |
|------|---------|---------------|
| 适用场景 | 低频全局状态（主题、语言、认证） | 高频复杂状态 |
| 性能 | 无选择式订阅，Consumer 全量更新 | 选择式订阅，精准更新 |
| 中间件/DevTools | 无 | Redux DevTools |
| 学习成本 | 低 | Redux 较高，Zustand 低 |

## 面试常问

- Context 解决了什么问题？有什么性能隐患？
- Provider value 变化时哪些组件会重渲染？
- 什么情况下用 Context，什么情况下用状态管理库？

## 参考

- [React: Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [React: Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context)
