# React Router

## 概念

React Router 是 React 应用最主流的路由库，实现了**声明式路由**——通过组件声明 URL 与 UI 的映射关系。当前最新版本为 v6。

## 基础用法

```jsx
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="stats" element={<Stats />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
```

## 核心 Hook

### useParams

获取动态路由参数：

```jsx
function UserProfile() {
  const { id } = useParams()  // /users/42 → id = "42"
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(`/api/users/${id}`).then(r => r.json()).then(setUser)
  }, [id])
}
```

### useNavigate

编程式导航：

```jsx
const navigate = useNavigate()
navigate('/dashboard')
navigate(-1)  // 返回上一页
navigate('/login', { replace: true })  // 替换历史记录
```

### useSearchParams

读写 URL 查询参数：

```jsx
const [searchParams, setSearchParams] = useSearchParams()
const keyword = searchParams.get('q')

setSearchParams({ q: 'react' })
```

### useLocation

获取当前 location 对象（pathname、search、state 等）。

## 嵌套路由与 Outlet

```jsx
function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Sidebar />
      <Outlet />  {/* 子路由在此渲染 */}
    </div>
  )
}

// /dashboard/stats 渲染 Stats 组件在 Outlet 位置
```

## 路由守卫

React Router v6 没有内置的路由守卫，通过封装组件实现：

```jsx
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <Spinner />
  if (!user) return <Navigate to="/login" replace />

  return children
}

<Route path="/dashboard" element={
  <ProtectedRoute><Dashboard /></ProtectedRoute>
} />
```

## 面试常问

- React Router v6 相比 v5 有哪些重大变化？
- useParams 和 useSearchParams 的区别？
- 如何实现路由级别的权限控制（路由守卫）？

## 参考

- [React Router 官方文档](https://reactrouter.com/)
