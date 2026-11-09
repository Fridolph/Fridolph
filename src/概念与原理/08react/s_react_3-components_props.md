# 组件与 Props

## 概念

组件是 React 应用的**基本构建单元**。Props 是从父组件传递给子组件的数据，**只读不可变**。

## 函数组件 vs 类组件

### 函数组件（现代标准）

```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>
}
```

- React 16.8 引入 Hooks 后拥有完整能力
- 简洁、易测试、性能更好
- **React 官方推荐首选**

### 类组件（遗留）

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

- 使用 `this.state` 和生命周期方法
- 新项目不建议使用

## Props 深入

### Children

`children` 是特殊的隐式 prop：

```jsx
function Card({ children, title }) {
  return (
    <div className="card">
      {title && <h2>{title}</h2>}
      <div className="card-body">{children}</div>
    </div>
  )
}

<Card title="用户信息">
  <p>姓名：张三</p>
</Card>
```

### 展开 Props

```jsx
const common = { className: 'input', placeholder: '请输入' }
<input {...common} type="text" />
```

### TypeScript 类型

```tsx
interface ButtonProps {
  text: string
  type?: 'primary' | 'secondary'
  onClick?: () => void
  disabled?: boolean
}

function Button({ text, type = 'primary', onClick, disabled }: ButtonProps) {
  return <button className={`btn-${type}`} onClick={onClick} disabled={disabled}>{text}</button>
}
```

## Props Drilling

Props 通过多层组件传递时称为 Props Drilling。**解决方案**：Context API、状态管理库、组合模式。

## 面试常问

- 函数组件和类组件的区别？
- Props 为什么是只读的？子组件需要修改父组件数据怎么办？
- 什么是 Props Drilling？有哪些解决方案？

## 参考

- [React: Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
