JSX 本质：不是模版引擎，而是语法糖（动态创建组件的语法糖）

## 在 JSX 中使用表达式

1. JSX 本身也是表达式

```jsx
const element = <h1>hello, world!</h1>;
```

2. 在属性中使用表达式

```jsx
<MyComponent foo={1 + 2 + 3 + 4} />
```

3. 延展属性

```jsx
const props = { firstName: 'Ben', lastName: 'Hector' };
const greeting = <Greeting {...props} />;
```

4. 表达式作为子元素

```jsx
const element = <li>{props.message}</li>;
```

## JSX 优点

1. 声明式创建界面的直观
2. 代码动态创建界面的灵活
3. 无需学习新的模版语言
