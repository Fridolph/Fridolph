# TypeScript + React：组件模式

此列表是使用 TypeScript 时 React 的组件模式的集合。将它们视为处理整体概念和类型的 TypeScript + React 指南的扩展。该列表深受 chantastic 原始 React 模式列表的启发。

- Basic function components
- Props
- Default Props
- Children
- WithChildren Helper type
- Spread attributes
- Preset attributes
- Styled components
- Required properties
- Controlled input

## Basic function components

在使用不带任何属性的函数组件时，您不需要使用额外的类型。所有的类型都可以进行推断。在旧式函数（我个人更喜欢这种方式）以及箭头函数中也是如此。这意味着对于简单的函数组件，TypeScript 可以自动推断出参数和返回值的类型，从而简化了代码，并提高了可读性。

```tsx
function Title() {
  return <h1>Welcome to this application</h1>
}
```

## Props

在使用 props 时，我们通常根据所编写的组件为 props 命名，后缀为 "Props"。不需要使用 FC 组件包装器或其他类似的东西。这种命名约定有助于提高代码的可读性和维护性，使得其他开发者更容易理解每个组件的属性结构。

```tsx
type GreetingProps = {
  name: string
}

function Greeting(props: GreetingProps) {
  return <p>Hi {props.name} 👋</p>
}
```

解构使其更具可读性

```tsx
function Greeting({ name }: GreetingProps) {
  return <p>Hi {name} 👋</p>
}
```

## Default props

在基于类的 React 中，我们通常需要设置默认属性。然而，在函数式组件中，我们更倾向于为属性设置默认值。我们标记带有默认值的属性为可选（使用问号运算符）。默认值确保名称永远不会为 undefined。

```tsx
type LoginMsgProps = {
  name?: string
}

function LoginMsg({ name = 'Guest' }: LoginMsgProps) {
  return <p>Logged in as {name}</p>
}
```

## Children

我们更喜欢显式地设置子元素而不是使用 FC 或 FunctionComponent 助手，这样它就遵循与其他组件相同的模式。我们将子元素设置为 React.ReactNode 类型，因为它接受大多数（JSX 元素、字符串等）。

```tsx
type CardProps = {
  title: string
  children: React.ReactNode
}

export function Card({ title, children }: CardProps) {
  return (
    <section className="cards">
      <h2>{title}</h2>
      {children}
    </section>
  )
}
```

当我们显式设置子项时，我们还可以确保我们永远不会传递任何子项。

```tsx
// This throws errors when we pass children
type SaveButtonProps = {
  //... whatever
  children: never
}
```

## WithChildren helper type

这是一个自定义的辅助类型，旨在帮助我们更轻松地设置子组件。

```tsx
type WithChildren<T = {}> = T & { children?: React.ReactNode }

type CardProps = WithChildren<{
  title: string
}>
```

它与 FC 非常相似，但由于其默认泛型参数设置为 {}，因此可以更加灵活。

```tsx
// works as well
type CardProps = { title: string } & WithChildren
```

如果你使用的是 Preact，则可以使用 h.JSX.Element 或 VNode 作为类型，而不是 React.ReactNode。

换句话说，这个辅助类型是用来帮助开发者更简单地创建具有子组件的组件的。在 Preact 中，由于其使用的渲染方式和类型定义与 React 不同，使用这个辅助类型可以更准确地描述组件的预期结构，并简化代码编写过程。通过使用 WithChildren 辅助类型，你可以确保你的组件具有正确的子节点类型，并避免类型错误或不符合预期的行为。

自定义帮助类型可以帮助我们更轻松地设置子项。

## Spread attributes to HTML elements

在 HTML 元素中展开属性是一个很好的功能，它可以确保您能够设置元素的所有 HTML 属性，而无需事先知道要设置哪些属性。您可以将它们传递下去。这是一个按钮包装组件，我们将属性扩展在这里。为了获取正确的属性，我们通过 JSX.IntrinsicElements 访问按钮的 props。这包括子元素，我们同样将它们传递下去。

```tsx
type ButtonProps = JSX.IntrinsicElements['button']

function Button({ ...allProps }: ButtonProps) {
  return <button {...allProps} />
}
```

## Preset attributes

假设我们想要预设类型为按钮作为默认提交行为提交表单的方式，而只希望将事情点击以显示触发响应的效果。我们可以通过从按钮属性集合中省略类型来获取类型安全保护（以防止由于不正确的输入而可能出现的意外提交操作）。简单地说，我们在构建按钮时不设置按钮的类型，允许提交时基于需要来进行指定操作（例如发送表单）。

```tsx
type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'type'>

function Button({ ...allProps }: ButtonProps) {
  return (
    <button
      type="button"
      {...allProps}
    />
  )
}

// 💥 This breaks, as we omitted type
const z = <Button type="button">Hi</Button>
```

## Styled components

不要与 styled-components 的 CSS-in-JS 库混淆。我们希望基于定义的属性来设置 CSS 类。

例如一个新型的属性可以设置为主要类型或次要类型。我们省略原始的 type 和 className，并将其与自定义的类型结合：

```tsx
type StyledButton = Omit<JSX.IntrinsicElements['button'], 'type' | 'className'> & {
  type: 'primary' | 'secondary'
}

function styledButton({ type, ...allProps }: StyledButton) {
  return <Button className={`btn-${type}`} />
}
```

## Required properties

我们从类型定义中删除了一些属性并预设了合理的默认值。现在，我们希望确保用户不会忘记设置某些属性，比如图片的 alt 属性或 src 属性。为此，我们创建了一个 MakeRequired 辅助类型，该类型移除了可选标志。

换句话说，我们的目标是确保用户在定义这些属性时不能遗漏它们。

```tsx
type MakeRequired<> = Omit<T, K> & Required<{ [P in K]: T[P] }>
```

并用它来构建我们的 props：

```tsx
type ImgProps = MakeRequired<JSX.IntrinsicElements['img'], 'alt' | 'src'>

export function Img({ alt, ...allProps }: ImgProps) {
  return (
    <img
      alt={alt}
      {...allProps}
    />
  )
}

const zz = (
  <Img
    alt="..."
    src="..."
  />
)
```

## Controlled Input

当你在 React 中使用常规输入元素并希望预先填充它们时，之后就不能再更改它们了。这是因为值属性现在由 React 控制。我们必须将值放入状态并对其进行控制。通常，只需将原始输入元素的属性与自定义类型进行交集操作就足够了。它是可选的，因为我们想在组件中将其设置为默认的空字符串。

```tsx
type ControlledProps = JSX.IntrinsicElements['input'] & {
  value?: string
}
```

或者，我们可以删除旧属性并重写它：

```tsx
type ControlledProps = Omit<JSX.IntrinsicElements['input'], 'value'> & {
  value?: string
}
```

并使用`useState`与默认值来使其工作。我们还会转发从原始输入属性传递的`onChange`处理程序。这样可以确保输入的状态能够正确更新，同时保持原本的事件处理逻辑。

```tsx
function Controlled({ value = '', onChange, ...allProps }): ControlledProps {
  const [val, setVal] = useState(value)
  return (
    <input
      value={val}
      {...allProps}
      onChange={e => {
        setVal(() => e.target?.value)
        onChange && onChange(e)
      }}
    />
  )
}
```
