# React 进阶实战

> 以下问题考察 React 进阶用法和架构设计能力。

## 1. 实现受控 Modal 组件及其核心功能

**场景**：从零实现一个生产级别的 Modal/Dialog 组件，需要处理 Portal、焦点陷阱、键盘 ESC 关闭、body 滚动锁定、多 Modal 层级。

::: details

```jsx
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

function Modal({ isOpen, onClose, children, zIndex = 1000 }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const handleEsc = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'  // 锁定滚动

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // 焦点陷阱：可以用 focus-trap-react 或自行实现 Tab 键循环

  return createPortal(
    <div className="overlay" ref={overlayRef} style={{ zIndex }}>
      <div className="modal" role="dialog" aria-modal="true">
        <button onClick={onClose} aria-label="关闭">✕</button>
        {children}
      </div>
    </div>,
    document.body
  )
}
```

**层级管理**：全局维护一个 zIndex 计数器，每个 Modal 打开时 +10，关闭时回收。
:::

## 2. 实现拖拽排序列表且不触发其他组件重渲染

**场景**：DashBoard 页面左侧是拖拽排序的菜单列表，右侧是详情面板。拖拽时右侧面板不应重渲染。

::: details

**设计思路**：

```jsx
// 拖拽状态用 ref，避免触发 React 渲染链
function DragSortableList({ items, onReorder }) {
  const dragState = useRef({
    draggingIndex: null,
    overIndex: null,
    offsetY: 0,
  })

  const handleDragStart = (index) => {
    dragState.current.draggingIndex = index
    // 直接操作 DOM 显示拖拽效果，不通过 setState
  }

  const handleDrop = () => {
    const { draggingIndex, overIndex } = dragState.current
    if (draggingIndex !== overIndex) {
      // 仅在拖拽结束时更新 React 状态
      const newItems = arrayMove(items, draggingIndex, overIndex)
      onReorder(newItems)
    }
    dragState.current.draggingIndex = null
  }

  return (
    <>
      {items.map((item, i) => (
        <DragItem key={item.id} item={item} index={i}
          onDragStart={() => handleDragStart(i)}
          onDrop={handleDrop}
        />
      ))}
    </>
  )
}

// React.memo + 稳定的 props 确保非拖拽项不渲染
const DragItem = React.memo(({ item, index, onDragStart, onDrop }) => {
  // 拖拽期间其他项不需要更新
})
```

**核心**：拖拽过程中的视觉反馈用 ref + 直接 DOM 操作，仅在拖拽结束（drop）时通过 setState 触发一次 React 更新。
:::

## 3. 前端路由权限控制如何设计？

**场景**：系统有三种角色（admin/editor/viewer），不同角色看到不同菜单和页面，还需要按钮级别的权限控制。

::: details

**页面级权限**：

```jsx
// 路由守卫组件
function ProtectedRoute({ children, requiredRoles }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <Spinner />
  if (!user) return <Navigate to="/login" state={{ from: location }} />
  if (requiredRoles && !requiredRoles.some(r => user.roles.includes(r))) {
    return <Navigate to="/403" />
  }

  return children
}

// 路由配置
const routes = [
  { path: '/', element: <Home /> },
  { path: '/dashboard', element: <ProtectedRoute requiredRoles={['admin', 'editor']}><Dashboard /></ProtectedRoute> },
  { path: '/admin', element: <ProtectedRoute requiredRoles={['admin']}><Admin /></ProtectedRoute> },
]
```

**按钮级权限**：

```jsx
function Authorized({ roles, children, fallback = null }) {
  const { user } = useAuth()
  if (roles.some(r => user.roles?.includes(r))) return children
  return fallback
}

// 使用
<Authorized roles={['admin']}>
  <button>删除用户</button>   // 仅 admin 可见
</Authorized>
<Authorized roles={['admin', 'editor']} fallback={<button disabled>无权限</button>}>
  <button>编辑</button>
</Authorized>
```

**权限设计原则**：
- 前端权限只是 UX 优化（隐藏不可用按钮/菜单），真正的安全在后端
- 每次 API 调用仍需后端验证权限
- 权限配置集中管理，方便修改
:::

## 4. Error Boundary 在生产环境的最佳实践

**场景**：React 应用某处抛出错误导致整个页面白屏。如何设计合理的错误边界？

::: details

```jsx
// 基础 Error Boundary（类组件——React 暂不支持 Hooks 版 Error Boundary）
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // 上报错误到监控平台
    reportError({ error, componentStack: errorInfo.componentStack })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} />
    }
    return this.props.children
  }
}
```

**粒度设计**：
```
<ErrorBoundary fallback={<HeaderError />}>
  <Header />       ← 头挂了不影响主体
</ErrorBoundary>

<ErrorBoundary fallback={<SidebarError />}>
  <Sidebar />      ← 侧栏挂了不影响主内容
</ErrorBoundary>

<ErrorBoundary fallback={<ContentError />}>
  <MainContent />  ← 主内容挂了保持 Header/Sidebar
</ErrorBoundary>
```

**降级 UI**：提供"重试"按钮 + "返回首页"链接，不要让用户看到白屏或技术错误信息。
:::

## 5. 如何设计组件 Props API 使其灵活且不易误用？

**场景**：你正在开发一个设计系统的 Button 组件，需要设计其 Props API。

::: details

**设计原则**：

```tsx
// 灵活：支持多种变体，通过组合而不是枚举
interface ButtonProps {
  // 必须的
  children: ReactNode

  // 外观变体（用联合类型约束，避免非法组合）
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'

  // 行为
  onClick?: (e: MouseEvent) => void
  disabled?: boolean
  loading?: boolean

  // 扩展性
  type?: 'button' | 'submit' | 'reset'
  className?: string

  // 可访问性
  ariaLabel?: string

  // 不提供的：style（禁止外部覆盖核心样式）
  // 但可以通过 data-* 属性让外部 CSS 选择器定位
}
```

**设计法则**：
- 必须参数少（最好只有 children）
- 可选参数有合理默认值
- 互斥参数通过 TypeScript 联合类型表达（编译期报错）
- 保留 `className` 和 `data-*` 给外部样式控制
- 不要暴露内部实现细节（如 `innerRef` 改为通过 `ref` prop）
:::

## 6. 微前端场景下多个 React 子应用如何共享状态和通信？

**场景**：主应用 + 3 个 React 子应用（qiankun/micro-app 框架），子应用间需要共享登录态，部分页面需要跨子应用导航。

::: details

**共享登录态**：

```js
// 方案1：主应用下发
window.__AUTH__ = { token, user }
// 子应用初始化时读取
const auth = window.__AUTH__

// 方案2：CustomEvent 通信
window.addEventListener('auth:update', (e) => {
  updateAuth(e.detail)
})
// 主应用登录后
window.dispatchEvent(new CustomEvent('auth:update', { detail: { token } }))
```

**跨应用导航**：

```js
// 子应用A中跳转到子应用B
window.dispatchEvent(new CustomEvent('navigate', {
  detail: { app: 'app-b', path: '/detail/42' }
}))
// 主应用监听并调用框架的导航方法
```

**避免的设计**：
- 不要在所有子应用中各存一份用户状态（重复同步）
- 不要跨子应用直接引用对方的状态库
- 优先把共享状态上提到主应用层，通过事件或 props 下发给子应用
:::

> 参考：React 官方文档，qiankun 文档，个人实践经验
