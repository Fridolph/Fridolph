# React 44 个前端面试问题

原贴地址： <https://dev.to/m_midas/44-react-frontend-interview-questions-2o63>

## 1. 你知道哪些 React Hooks

::: details

- useState：用于在函数组件中管理状态。
- useEffect：用于在函数组件中执行副作用操作，如获取数据或订阅事件。
- useContext：用于在函数组件中访问 React 上下文(Context)的值。
- useRef：用于创建可变引用，这些引用指向的元素或值可以在渲染间持续存在。
- useCallback：用于记忆化函数，以防止不必要的重渲染。
- useMemo：用于记忆化值，通过缓存昂贵的计算来提升性能。
- useReducer：用于通过一个 reducer 函数来管理状态，类似于 Redux 的工作方式。
- useLayoutEffect：类似于 useEffect，但其效果是在所有 DOM 变更之后同步执行的。

在 React 函数组件中管理状态、处理副作用以及重用逻辑使用这些 hooks 可以更加便捷、高效。
:::

## 2. 什么是虚拟 DOM

::: details
虚拟 DOM 是 React 中的一个概念，指的是在内存中创建并存储实际 DOM（文档对象模型）的轻量级、虚拟表示。这是一种用于优化 Web 应用程序性能的编程技术。

当对 React 组件的数据或状态进行更改时，更新的对象是虚拟 DOM，而不是直接操作真实 DOM。虚拟 DOM 接着计算组件先前状态与更新状态之间的差异，这个过程被称为“差异对比”过程。

一旦确定了差异，React 就会高效地只更新真实 DOM 中必要的部分以反映这些变化。这种方法减少了实际 DOM 操作的数量，并提升了应用程序的整体性能。

通过使用虚拟 DOM，React 提供了一种创建动态和交互式用户界面的方法，同时确保最佳效率和渲染速度。
:::

## 3. 如何渲染数组

::: details

要渲染一个元素数组，您可以使用 map()方法遍历数组，并返回一个新的 React 元素数组。

```jsx
const arr = ['JavaScript', 'HTML', 'CSS3']
function App() {
  return (
    <ul>
      {arr.map(item => (
        <li>{item}</li>
      ))}
    </ul>
  )
}
```

:::

## 4. 受控组件和非受控组件有什么区别

::: details

**受控组件和非受控组件的区别在于它们如何管理和更新它们的状态。**

- 受控组件是由 React 控制状态的组件。该组件通过 props 接收当前的值并进行更新。当值发生变化时，它还会触发回调函数。这意味着组件不存储自己的内部状态，而是由父组件进行管理并将值传递给受控组件。

```jsx
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('')
  return (
    <div>
      <h3>Controlled Component</h3>
      <input
        name="name"
        value={name}
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={() => console.log(value)}>Get Value</button>
    </div>
  )
}
```

- 非受控组件则使用 ref 或其它方法内部管理自己的状态。它们独立存储和更新状态，不依赖于 props 或回调函数。父组件对非受控组件的状态控制较少。

```jsx
import { useRef } from 'react'

function App() {
  const inputRef = useRef(null)
  return (
    <div>
      <h3>Uncontrolled Component</h3>
      <input
        type="text"
        name={name}
        ref={inputRef}
      />
      <button onClick={() => console.log(inputRef.current.value)}>Get Value!</button>
    </div>
  )
}
```

:::

## 5. 基于类的 React 组件和函数式组件有什么区别

::: details
**类组件和函数组件的主要区别在于它们的定义方式和所使用的语法。**

- 类组件是使用 ES6 类定义，并且扩展 React.Component 类。它们使用 render 方法返回定义组件输出的 JSX。类组件可以通过 `this.state` 和 `this.setState()` 访问组件的生命周期方法和状态管理。

```jsx
class App extends React.Component {
  state = {
    value: 0,
  }
  handleChange = () => {
    this.setState({
      value: this.state.value++,
    })
  }
  render() {
    return (
      <>
        <p>value is {this.state.value}</p>
        <button onClick={this.handleChange}>Increase Value</button>
      </>
    )
  }
}
```

- 函数组件被定义为简单的 JavaScript 函数。它们接受 props 作为参数并直接返回 JSX。函数组件没有生命周期方法或状态（state）的访问能力。然而，随着 React 16.8 中 React Hooks 的引入，函数组件现在可以管理状态，并使用其他特性，如上下文（context）和效果（effects）。

```jsx
import { useState } from 'react'
const App = () => {
  const [value, setValue] = useState(0)
  const handleChange = () => {
    setValue(value + 1)
  }
  return (
    <>
      <p>value is {this.state.value}</p>
      <button onClick={this.handleChange}>Increase Value</button>
    </>
  )
}
```

总的来说，函数组件被认为更简单、更易于阅读和测试。只要可能，建议使用函数组件，除非有特定需求必须使用基于类的组件。

:::

## 6. React 组件的生命周期方法

::: details
生命周期方法是一种能够在组件生命周期的不同阶段介入的机制，它允许你在特定时间执行特定代码。

以下是 React 主要的生命周期方法：

1. 构造器 `constructor` - 这是创建组件时调用的第一个方法。它用于初始化状态（state）和绑定事件处理程序。在函数组件中，你会使用 useState 钩子来实现类似目的。

2. 渲染器 `render` - 此方法负责渲染 JSX 标记，并返回要在屏幕上显示的内容。

3. 组件挂载后 `componentDidMount` - 该方法在组件在 DOM 中渲染完毕后立即调用。它通常用于初始化任务，例如 API 调用或设置事件监听器。

4. 组件更新后 `componentDidUpdate` - 当组件的 props 或 state 发生变化时，会调用此方法。它允许你执行副作用（side effects），根据变化更新组件，或触发额外的 API 调用。

5. 组件卸载前 `componentWillUnmount` - 该方法在组件即将从 DOM 中移除之前调用。它用于清理在 componentDidMount 中设置的任何资源，例如移除事件监听器或取消计时器。

一些生命周期方法，如 ~~componentWillUnmount、componentWillReceiveProps 和 componentWillUpdate~~ 已被弃用或替换为其他方法或钩子。
:::

## 7. 使用 useState 有什么特点

::: details
useState 钩子返回一个状态值及一个更新它的函数。

```js
const [value, setValue] = useState('some state')
```

在初始渲染期间，返回的状态值与作为第一个参数传递的值相匹配。setState 函数被用来更新状态。它接受一个新的状态值作为参数，并将重新渲染组件放到队列中。

setState 函数也可以接受一个回调函数作为参数，该回调函数接受前一个状态值作为参数。
:::

## 8. 使用 useEffect 有什么特点

::: details
useEffect 钩子允许你在函数组件中执行副作用操作。

在函数组件的主体中，也就是 `React 的渲染阶段`，**不允许进行数据修改、订阅、定时器设置、日志记录以及其他副作用操作**。这可能会导致用户界面出现令人困惑的错误和不一致性。

相反，建议使用 useEffect 钩子。传递给 useEffect 的函数将在组件的渲染提交到屏幕后执行，或者如果你传递了一个依赖项数组作为第二个参数，那么每当依赖项之一发生变化时，该函数都会被调用。

```jsx
useEffect(() => {
  console.log('toggle something')
}, [])
```

:::

## 9. 如何跟踪函数组件的卸载

::: details
通常情况下，useEffect 会创建在组件离开屏幕之前需要被清除或重置的资源，比如订阅或定时器标识符。

为了做到这一点，传递给 useEffect 的函数可以返回一个清理函数。这个清理函数会在组件从用户界面移除之前运行，以防止内存泄漏。此外，如果组件多次渲染（这通常是情况），那么在执行下一个副作用之前，会先清理上一个副作用。

```jsx
useEffect(() => {
  function handleChange(value) {
    setValue(value)
  }
  SomeAPI.doSomething(id, handleChange)

  return function cleanup() {
    someAPI.undoSomething(id, handleChange)
  }
})
```

:::

## 10. React 中的 Props 是什么

::: details

- Props 是从父组件传递给子组件的数据
- Props 是只读的，不能被修改

```jsx
// Parent Component
const Parent = () => {
  const data = 'Hello React'
  return (
    <div>
      <Child data={data} />
    </div>
  )
}
// Child Component
const Child = ({ data }) => {
  return <p>{data}</p>
}
```

:::

## 11. 什么是 React 状态管理

::: details
状态管理器是一种工具或库，用于帮助管理应用程序的状态。它提供了一个集中的存储容器，用于存储和管理可由应用程序中不同组件访问和更新的数据。

常用的状态管理方案：

- Redux
- MobX
- React Context

状态管理器解决了几个问题。首先，将数据及其相关逻辑与组件分离是一种良好的做法。其次，当使用本地状态并在组件之间传递时，由于组件可能存在深层嵌套，代码可能变得复杂难懂。有了全局存储，我们可以从任何组件访问和修改数据。
:::

## 12. 在哪些情况下可以使用本地状态，哪些情况下使用全局状态

::: details

- 仅当状态在一个组件内部使用并且没有计划传递给其他组件时，使用本地状态。本地状态同样适用于代表列表中单个条目的组件

- 如果组件拆分包括嵌套组件，并且数据需要沿组件层次结构传递，那么使用全局状态会更佳。
  :::

## 13. Redux 中的 reducer 是什么，它需要哪些参数

::: details
Redux 中的 reducer 是一个纯函数，接受状态(state)和动作(action)作为参数。在 reducer 内部，我们追踪接收到的动作的类型，并根据该类型修改状态，最终返回一个新的状态对象。

```jsx
export default function appReducer(state = initialState, action) {
  // Reducer 通常会检查动作的类型字段来决定接下来发生什么
  switch (action.type) {
    // 根据不同类型的动作进行相应的处理
    default:
      // 如果这个 reducer 无法识别动作的类型，或者不关心这个特定的动作，就返回现有的状态，不做任何改变
      return state
  }
}
```

:::

## 14. 什么是 Action / 如何在 Redux 中更改状态

::: details
Action 是一个简单的 JavaScript 对象，必须包含一个带有类型字段的对象。

```js
{
  type: 'SOME_TYPE'
}
```

在 Redux 中，你可以通过创建并分发这些动作对象来改变状态。Reducers 会根据这些动作的类型来处理状态的变化。

```jsx
{
  type: 'SOME_TYPE',
  payload: 'Any payload'
}
```

:::

## 15. 说一下对 Redux 的理解

::: details
Redux 实现了 Flux 模式，这是一种可预测的应用程序状态管理模式。 它通过引入单向数据流和应用程序状态的集中式存储，有助于管理应用程序的状态。
:::

## 16. Mobx 实现哪种模式

::: details
Mobx 实现了`观察者模式`，也被称为`发布订阅模式`。
:::

## 17. 使用 Mobx 有什么特点

::: details
Mobx 提供了像 observable 和 computed 这样的装饰器来定义可观察状态和响应函数。

使用 @action 装饰的动作用于修改状态，确保所有更改都被跟踪。Mobx 还提供了自动依赖跟踪、不同类型的反应、对反应性的精细控制，以及通过 mobx-react 包与 React 的无缝集成。

总的来说，Mobx 通过根据可观察状态的变化自动化更新过程，简化了状态管理。
:::

## 18. 如何访问 Mobx 状态的改变

::: details
你可以使用 observable 装饰器来将变量定义为可观察状态，从而访问状态中的变量。以下是一个示例：

```jsx
import { observable, computed } from 'mobx'

class MyStore {
  @observable foo = 'Hello Mobx!'
  @computed get upperFoo() {
    return this.foo.toUpperCase()
  }
}

const store = new MyStore()
console.log('🚢 ~ 当前打印的内容 ~ store.foo:', store.foo)
// Hello Mobx!
store.foo = 'Hi Mobx!'
console.log('🚢 ~ 当前打印的内容 ~ store.upperFoo:', store.upperFoo)
// HI MOBX!
```

在这个示例中，使用 observable 装饰器将 foo 定义为可观察状态。然后，你可以通过 store.foo 来访问这个变量。对 foo 所做的任何更改都将自动触发相关组件或反应的更新。
:::

## 19. Redux 和 Mobx 的区别

::: details

- Redux 是一个更简单、更具指导性的状态管理库，遵循严格的单向数据流，并且倡导不可变性。它需要更多样板代码和显式更新，但与 React 的集成非常出色。

- Mobx 提供了更灵活、更直观的 API，样板代码更少。它允许直接修改状态，并自动跟踪更改以获得更好的性能。在 Redux 和 Mobx 之间的选择取决于您的特定需求和偏好。
  :::

## 20. 什么是 JSX

::: details
默认情况下，使用以下语法在 React 中创建元素。

```jsx
React.createElement('div', { className: 'App' }, 'Hello, React!')
```

但是我们习惯看到的是这样的：

```html
<div className="App">Hello, React!</div>
```

这就是所谓的 JSX 标记。这是一种语言扩展，简化了代码的理解和开发。
:::

## 21. 什么是 props drilling 属性下发（属性传递）

::: details

属性下发是指通过多层嵌套组件传递 props 的过程，即使一些中间组件并不直接使用这些 props。这可能导致复杂而繁琐的代码结构。

```jsx
// Parent component
const Parent = () => {
  const data = 'Hello, World!'

  return (
    <div>
      <ChildA data={data} />
    </div>
  )
}

// Intermediate ChildA component
const ChildA = ({ data }) => {
  return (
    <div>
      <ChildB data={data} />
    </div>
  )
}

// Leaf ChildB component
const ChildB = ({ data }) => {
  return <div>{data}</div>
}
```

在这个例子中，数据属性（data prop）从父组件传递到子组件 A，然后从子组件 A 传递到子组件 B，即使子组件 A 并不直接使用这个属性。当嵌套层级很多或者需要在组件树的深层组件中访问数据时，这可能会导致问题。这样做会使代码变得更难以维护和理解。

通过使用其他模式，比如上下文（context）或状态管理库（如 Redux 或 MobX），可以减轻属性下发的问题。这些方法允许组件访问数据，而无需通过每个中间组件传递属性。
:::

## 22. 如何有条件地渲染元素

::: details

你可以使用任何条件运算符，包括三元运算符。

```jsx
// 运算符
return <div>{isVisible && <span>I'm visible!</span>}</div>

// 三元表达式
return <div>{isOnline ? <span>I'm online!</span> : <span>I'm offline</span>}</div>

// 条件判断
if (isOnline) {
  element = <span>I'm online!</span>
} else {
  element = <span>I'm offline</span>
}

// 花括号 渲染变量
return <div>{element}</div>
```

:::

## 23. useMemo 及它是如何工作的

::: details

useMemo 被用来缓存和记忆计算结果。

通过传递创建函数和一个依赖项数组，useMemo 仅在依赖项的值发生变化时重新计算记忆值。这种优化有助于避免在每次渲染时进行昂贵的计算。

通过第一个参数，函数接受一个回调函数，在其中执行计算；而第二个参数是一个依赖项数组，该函数只有在依赖项发生变化时才会重新执行计算。

```js
const memoValue = useMemo(() => computeFunc(paramA, paramB), [paramA, paramB])
```

:::

## 24. useCallback 及它是如何工作的

::: details
useCallback 用于返回一个记忆化的回调函数，仅在其中一个依赖项的值发生变化时才会更新。这在将回调函数传递给依赖于引用相等性以防止不必要渲染的优化子组件时非常有用。

```js
const callbackValue = useCallback(() => computeFunc(paramA, paramB), [paramA, paramB])
```

:::

## 25. useMemo 和 useCallback 有什么区别

::: details

- useMemo 用于记忆计算的结果，而 useCallback 用于记忆函数本身。
- useMemo 缓存计算得到的值，并在后续渲染中返回该值，除非依赖项发生了变化。
- useCallback 缓存函数本身并返回相同的实例，除非依赖项发生了变化。
  :::

## 26. 什么是 React Context

::: details
React Context 是一项功能，它提供了一种在组件树中传递数据的方式，无需在每个级别手动传递 props。它允许您创建一个全局状态，可以被树中的任何组件访问，无论其位置如何。当需要在多个组件之间共享数据但它们并非通过 props 直接连接时，Context 就显得尤为有用。

React Context API 由三个主要部分组成：

1. createContext：此函数用于创建一个新的 context 对象。
2. Context.Provider：该组件用于向 context 提供值。它包裹需要访问该值的组件。
3. Context.Consumer 或 useContext 钩子：该组件或钩子用于从 context 中获取值。它可以在 context 的提供者内的任何组件中使用。

通过使用 React Context，您可以避免 prop drilling（在多层组件之间传递 props），轻松地在更高层级管理状态，从而使您的代码更加有条理和高效。
:::

## 27. useContext 及它是如何工作的

::: details
在典型的 React 应用中，数据通常通过 props 从上至下（从父组件传递到子组件）。然而，对于某些类型的 props（例如，选定的语言、UI 主题）来说，这种方法可能过于繁琐，因为这些 props 需要传递给应用中的许多组件。

上下文提供了一种在组件之间共享此类数据的方式，而无需明确地通过树的每个级别传递 props。使用 useContext 调用的组件会在上下文值变化时重新渲染。如果组件的重新渲染成本很高，您可以使用记忆化来进行优化。

```jsx
const App = () => {
  const theme = useContext(ThemeContext)
  return <div style={{ color: theme.palette.primary.main }}>Some div</div>
}
```

:::

## 28. useRef 及它是如何工作的

::: details

useRef 返回一个可修改的 ref 对象，其 current 属性由传入的参数初始化。返回的对象将在组件的整个生命周期中持续存在，并且在每次渲染时不会发生变化。

通常的用例是以命令式的方式访问后代组件。也就是说，通过 ref，我们可以明确地引用 DOM 元素。

```jsx
const App = () => {
  const inputRef = useRef(null)
  const buttonClick = () => {
    inputRef.current.focus()
  }

  return (
    <>
      <input
        ref={inputRef}
        type="text"
      />
      <button onClick={buttonClick}>Focus on input tag</button>
    </>
  )
}
```

:::

## 29. 什么是 React.memo

::: details

React.memo() 是一个高阶组件。如果你的组件总是使用不会改变的 props 渲染相同的内容，你可以将其包装在 React.memo() 调用中，以在某些情况下提高性能，从而记忆渲染结果。

这意味着 React 将使用上一次渲染的结果，避免重新渲染。React.memo() 只影响 props 的变化。

如果一个函数式组件被 React.memo 包装，并且使用了 useState、useReducer 或 useContext，那么在状态或上下文发生变化时，它将被重新渲染。

```jsx
import { memo } from 'react'
const MemoComponent = memo(
  (MemoComponent = props => {
    // ...
  })
)
```

:::

## 30. 什么是 React Fragment

::: details

从组件返回多个元素是 React 中的常见做法。片段（Fragments）允许您在不在 DOM 中创建不必要的节点的情况下形成子元素列表。

```jsx
// 可以这样使用
<>
  <OneChild />
  <AnotherChild />
</>

// or
<React.Fragment>
  <OneChild />
  <AnotherChild />
</React.Fragment>
```

:::

## 31. 什么是 React Reconciliation

::: details

协调（Reconciliation）是 React 中用于区分一个元素树与另一个元素树，以确定需要被替换的部分的算法。

协调是我们过去所说的虚拟 DOM 背后的算法。它的定义大致是这样的：

- 当你渲染一个 React 应用程序时，描述应用程序的元素树在保留内存中生成。
- 然后将此树包含在渲染环境中——例如，在浏览器应用程序中，它被转换为一组 DOM 操作。
- 当应用程序状态更新时，会生成一个新的树。
- 新树会与先前的树进行比较，以计算并确切执行重绘更新后应用程序所需的操作。
  :::

## 32. 为什么我们在使用 map()时需要列表中的 key

::: details

key 能帮助 React 确定哪些元素已更改、添加或删除。必须指定它们，以便 React 能够随时间匹配数组元素。选择键的最佳方法是使用一个能清晰地将列表项与其相邻项区分开的字符串。通常情况下，你会使用数据中的 ID 作为键。

```jsx
const languages = [
  {
    id: 1,
    lang: 'JavaScript',
  },
  {
    id: 2,
    lang: 'TypeScript',
  },
  {
    id: 3,
    lang: 'Python',
  },
]

const App = () => {
  return (
    <div>
      <ul>
        {languages.map(language => (
          <li key={`${language.id}_${language.lang}`}>{language.lang}</li>
        ))}
      </ul>
    </div>
  )
}
```

:::

## 33. 如何在 Redux Thunk 中处理异步操作

::: details

使用 Redux Thunk，你需要将其作为中间件导入。动作创建者应该返回的不仅是一个对象，而是一个以 dispatch 为参数的函数。

```jsx
export const addUser = ({ firstName, lastName }) => {
  return dispatch => {
    dispatch(addUserStart())
  }

  axios
    .post('https://jsonplaceholder.typicode.com/users', {
      firstName,
      lastName,
      completed: false,
    })
    .then(res => {
      dispatch(addUserSuccess(res.data))
    })
    .catch(error => {
      dispatch(addUserError(error.message))
    })
}
```

:::

## 34. 如何跟踪函数组件中对象字段的变化

::: details

为了实现这一点，你需要使用 useEffect 钩子，并将对象的字段作为依赖项数组传递进去。

```jsx
useEffect(() => {
  console.log('Changed!')
}, [obj.someField])
```

:::

## 35. 使用 React 如何访问 DOM 元素

::: details

使用 React.createRef()或 useRef()钩子创建引用，并通过 ref 属性附加到 React 元素。通过访问所创建的引用，我们可以使用 ref.current 访问 DOM 元素。

```jsx
const App = () => {
  const myRef = useRef(null)

  const handleClick = () => {
    console.log(myRef.current) // Accessing the DOM element
  }

  return (
    <div>
      <input
        type="text"
        ref={myRef}
      />
      <button onClick={handleClick}>Click Me</button>
    </div>
  )
}

export default App
```

:::

## 36. 什么是自定义 hook

::: details
自定义钩子是一种函数，允许您在不同的组件之间重用逻辑。这是一种封装可重用逻辑的方式，以便可以轻松在多个组件之间共享和重用。

自定义钩子通常是以"use"开头的函数，并且在需要时可以调用其他钩子。
:::

## 37. React 有哪些公共 API

::: details
在索引文件的上下文中，公共 API 通常指向向外部模块或组件公开且可访问的接口或函数。以下是代表公共 API 的索引文件的代码示例：

```jsx
// index.js
export function greet(name) {
  return `Hello, ${name}!`
}

export function calculateSum(a, b) {
  return a + b
}
```

在这个示例中，index.js 文件充当公共 API，在那里函数 greet()和 calculateSum()被导出，其他模块可以通过导入它们来访问这些函数。其他模块可以导入并使用这些函数作为其实现的一部分：

```jsx
// main.js
import { greet, calculateSum } from './index.js'

console.log(greet('John')) // Hello, John!
console.log(calculateSum(5, 3)) // 8
```

通过从索引文件中导出特定的函数，我们正在定义模块的公共 API，允许其他模块使用这些函数。
:::

## 38. 创建自定义 hook 应遵循哪些原则

::: details

- 确保以 `"use"` 开头命名钩子。
- 必要时使用现有的钩子。
- 不要有条件地调用钩子。
- 将可重用逻辑提取到自定义钩子中。
- 自定义钩子必须是纯函数。
- 自定义钩子可以返回值或其他钩子。
- 为自定义钩子选择描述性的名称。
  :::

## 39. 了解 SSR 吗

::: details

服务器端渲染 (Server-Side Rendering，缩写 SSR) 是一种用于在服务器上渲染页面并将完全渲染的页面发送到客户端进行显示的技术。它允许服务器生成网页的完整 HTML 标记，包括动态内容，并将其作为对请求的响应发送给客户端。

在传统的客户端渲染方式中，客户端接收到一个最小的 HTML 页面，然后对服务器进行额外的数据和资源请求，用于在客户端渲染页面。这可能导致较慢的初始页面加载时间，并且对搜索引擎优化 (SEO) 产生负面影响，因为搜索引擎爬虫很难索引基于 JavaScript 的内容。

通过 SSR，服务器负责渲染网页，执行必要的 JavaScript 代码生成最终的 HTML。这意味着客户端从服务器接收完全渲染的页面，减少了对额外资源请求的需求。SSR 改善了初始页面加载时间，并使搜索引擎能够轻松索引内容，从而提高了 SEO。

在诸如 Next.js (用于 React) 和 Nuxt.js (用于 Vue.js) 等框架和库中常用 SSR，以实现服务器端渲染的功能。这些框架为您处理服务器端渲染逻辑，使实现 SSR 更加容易。
:::

## 40. 使用 SSR 有什么好处

::: details

- `改善初始加载时间：` SSR 使服务器能够将完全渲染的 HTML 页面发送到客户端，减少了客户端所需的处理量。这提高了初始加载时间，因为用户能更快地看到完整的页面。

- `有利于SEO：` 由于完全渲染的 HTML 在初始响应中可用，搜索引擎可以高效地爬取和索引 SSR 页面的内容。这改善了搜索引擎的可见性，并有助于提高搜索排名。

- `可访问性：` SSR 确保内容对于禁用 JavaScript 或使用辅助技术的用户是可访问的。通过在服务器上生成 HTML，SSR 为所有用户提供可靠和可访问的用户体验。

- `在低带宽环境中的性能：` SSR 减少了客户端需要下载的数据量，对于低带宽或高延迟环境中的用户非常有益。这对于移动用户或具有较慢互联网连接的用户尤为重要。

尽管 SSR 具有这些优点，但要注意，与客户端渲染方法相比，它可能会引入更多的服务器负载和维护复杂性。需要仔细考虑诸如缓存、可扩展性和服务器端渲染性能优化等因素。
:::

## 41. 了解 Next.js 吗

- `getStaticProps`（获取静态属性）：该方法用于在构建时获取数据并将页面预渲染为静态 HTML。它确保数据在构建时可用，并在随后的请求中不会更改。

::: details

```jsx
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}
```

- `getServerSideProps`（获取服务器端属性）：该方法用于在每个请求上获取数据并在服务器上预渲染页面。当需要获取可能频繁更改或特定于用户的数据时，可以使用此方法。

```jsx
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}
```

- `getStaticPaths`（获取静态路径）：该方法用于动态路由，在其中指定应在构建时预渲染的路径列表。通常用于带参数的动态路由获取数据。

```jsx
export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()

  const paths = posts.map(post => ({
    params: { id: post.id },
  }))

  return {
    paths,
    fallback: false,
  }
}
```

:::

## 42. 了解代码校验工具吗

::: details
Linters（代码检查工具）是一种用于检查源代码潜在错误、bug、风格不一致和可维护性问题的工具。它们有助于强制执行编码标准，确保代码库的质量和一致性。

Linters 的工作原理是通过扫描源代码并将其与一组预定义的规则或指南进行比较。这些规则可以包括语法和格式约定、最佳实践、潜在 bug 和代码异味。当代码检查工具识别到违反规则时，它会生成警告或错误，突出显示需要关注的特定行或行代码。

使用代码检查工具可以提供几个好处：

- `代码质量：` 代码检查工具有助于识别和防止潜在的 bug、代码异味和反模式，提高代码质量。

- `一致性：` 代码检查工具强制执行编码约定和风格指南，确保即使多个开发人员在同一个项目上工作的情况下，代码库中的格式和结构始终保持一致。

- `可维护性：` 通过及早发现问题并促进良好的编码实践，代码检查工具有助于提高代码的可维护性，使代码库更易于理解、修改和扩展。

- `效率：` 代码检查工具可以节省开发人员的时间，通过自动化代码审查流程并在开发过程中或生产中捕捉常见错误之前，提高效率。

一些流行的代码检查工具包括 ESLint（用于 JavaScript）以及 Stylelint（用于 CSS 和 Sass）。
:::

## 43. 知道哪些 React 架构解决方案

::: details
有几种用于构建 React 项目的架构解决方案和模式。其中一些流行的包括：

- `MVC`（Model-View-Controller）：MVC 是一种传统的架构模式，将应用程序分为三个主要组件 - 模型（Model）、视图（View）和控制器（Controller）。React 可以用于视图层以渲染用户界面，而其他库或框架可以用于模型层和控制器层。

- `Flux` ：Flux 是 Facebook 专为 React 应用引入的应用程序架构。它遵循单向数据流，其中数据以单一方向流动，使得更容易理解和调试应用程序的状态变化。

- `原子设计`（Atomic Design）：原子设计不专门针对 React，而是一种将用户界面分解为更小、可重复使用组件的设计方法。它鼓励构建小型、自包含的组件，并可组合成更复杂的用户界面。

- `容器和组件模式`：此模式将展示（组件）与逻辑和状态管理（容器）分离。组件负责呈现用户界面，而容器处理业务逻辑和状态管理。

- `特性切分设计`（Feature-Sliced Design）：这是一种用于组织和构建 React 应用程序的现代架构方法。它的目标是通过基于特性或模块划分应用程序代码库来解决可扩展性、可维护性和可重用性的挑战。
  :::

## 44. 什么是功能切片设计 Feature-Sliced Design

::: details
现代架构方法用于组织和构建React应用程序，旨在通过按特性或模块划分应用程序代码库，解决可扩展性、可维护性和可重用性方面的挑战。

在特性分割设计中，应用程序的每个特性或模块被组织到单独的目录中，包含所有必要的组件、操作、减速器和其他相关文件。这有助于保持代码库的模块化和隔离，使其更容易开发、测试和维护。

<Image src="/08react/feature-sliced.png" alt="功能切片设计" />

特性分割设计促进了关注点的明确分离，并将功能封装在单独的特性内。这使不同的团队或开发人员能够独立地处理不同的特性，而不必担心冲突或依赖关系。
:::