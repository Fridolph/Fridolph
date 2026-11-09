# JSX

## 概念

JSX（JavaScript XML）是 JavaScript 的**语法扩展**，允许在 JS 中编写类似 HTML 的标记。

```jsx
// JSX 写法
const element = <h1 className="greeting">Hello, React!</h1>

// 等价于纯 JS
const element = React.createElement('h1', { className: 'greeting' }, 'Hello, React!')
```

JSX 在构建时被 Babel 等编译器转换为 `React.createElement()` 调用。

## 核心规则

### 表达式嵌入

用 `{}` 嵌入任意 JavaScript 表达式：

```jsx
const name = 'React'
const element = <h1>Hello, {name}!</h1>
```

### 属性命名

HTML 属性转为 **camelCase**：

| HTML | JSX |
|------|-----|
| `class` | `className` |
| `for` | `htmlFor` |
| `tabindex` | `tabIndex` |
| `onclick` | `onClick` |

### 条件渲染

```jsx
// 三元表达式
<div>{isLoggedIn ? <Dashboard /> : <Login />}</div>

// 短路运算
<div>{unread > 0 && <Badge count={unread} />}</div>
```

### 列表渲染

```jsx
const todos = [{ id: 1, text: 'Learn' }, { id: 2, text: 'Build' }]

<ul>
  {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
</ul>
```

**key 必须唯一且稳定**——不能用 array index，不能用随机值。

### Fragments

返回多个元素而不增加额外 DOM 节点：

```jsx
<>
  <Header />
  <Main />
  <Footer />
</>
```

## 面试常问

- JSX 和 HTML 有哪些区别？至少说 3 个。
- 为什么列表渲染需要 key？为什么不能用 index？

## 参考

- [React: Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
- [React: Rendering Lists](https://react.dev/learn/rendering-lists)
