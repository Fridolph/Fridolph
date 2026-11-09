# React 18/19 新特性

## React 18 关键特性

### Concurrent Rendering（并发渲染）

React 可以**中断渲染**去处理更高优先级的更新，保持 UI 响应：

```jsx
import { createRoot } from 'react-dom/client'

// 启用并发特性
const root = createRoot(document.getElementById('root'))
root.render(<App />)
```

### Suspense 改进

现在可以用于数据获取，不仅仅是代码分割：

```jsx
function ProfilePage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ProfileDetails />
      <Suspense fallback={<Spinner />}>
        <ProfileTimeline />
      </Suspense>
    </Suspense>
  )
}
```

### useTransition

标记非紧急更新，保持界面响应：

```jsx
const [isPending, startTransition] = useTransition()

function handleSearch(input) {
  setInputValue(input)  // 立即更新输入框

  startTransition(() => {
    setSearchResults(filterItems(input))  // 可以中断的慢操作
  })
}
```

### useDeferredValue

延迟更新某个值，类似防抖但更智能：

```jsx
const deferredQuery = useDeferredValue(query)
// query 变化时立即返回旧值，React 空闲时更新
```

### Automatic Batching

React 18 自动将所有状态更新批处理——包括 Promise、setTimeout 等异步场景。

## React 19 关键特性

### Actions（服务端 & 客户端）

用 `useActionState` 管理表单提交状态：

```jsx
const [state, formAction, isPending] = useActionState(async (prevState, formData) => {
  const result = await submitForm(formData)
  return result
}, initialState)

return <form action={formAction}>...</form>
```

### useOptimistic

乐观更新——先更新 UI，失败后回滚：

```jsx
const [optimisticMessages, addOptimistic] = useOptimistic(
  messages,
  (state, newMsg) => [...state, { ...newMsg, sending: true }]
)
```

### Server Components

组件在服务端渲染，零 JS 发送到客户端：

```jsx
// 服务端组件（默认）
async function PostList() {
  const posts = await db.posts.findMany()
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}
```

Server Components 不能使用 useState、useEffect、事件处理。

### use() Hook

在客户端组件中读取 Context 和 Promise：

```jsx
const theme = use(ThemeContext)
const data = use(fetchData())  // 配合 Suspense 使用
```

### Document Metadata

组件内直接写 SEO 标签：

```jsx
function BlogPost() {
  return (
    <article>
      <title>React 19 新特性</title>
      <meta name="description" content="深入了解 React 19" />
      <h1>React 19 新特性</h1>
    </article>
  )
}
```

## 面试常问

- React 18 的 Concurrent Rendering 解决了什么问题？
- useTransition 和 useDeferredValue 的使用场景区别？
- React 19 Server Components 和 Client Components 的边界如何划分？

## 参考

- [React 18 发布博文](https://react.dev/blog/2022/03/29/react-v18)
- [React 19 发布博文](https://react.dev/blog/2024/12/05/react-19)
