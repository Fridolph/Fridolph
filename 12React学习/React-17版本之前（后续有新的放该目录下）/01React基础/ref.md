绝大部分场景应避免使用 ref，因为它破坏了 React 中以 props 为数据传递介质的典型数据流。

下面介绍下 ref 的常用使用场景

## 在 DOM 上使用 ref

ref 接受一个回调函数作为值，在组件被挂载或卸载时，回调函数会被调用，在组件被挂载时，回调函数会接受当前 DOM 元素作为参数；组件被卸载时回调函数会接受 null 作为参数

```jsx
class AutoFocusTextInput extends Component {
  render() {
    return (
      <div>
        <input type="text" ref={input => (this.textInput = input)} />
      </div>
    );
  }
  componentDidMount() {
    // 通过ref让input自动获取焦点
    this.textInput.focus();
  }
}
```

AutoFocusTextInput 中为 input 定义 ref，在组件挂载后，通过 ref 获取 input 元素，让其自动获取焦点，否则就很难实现该功能

### 在组件上使用 ref

例，在使用 AutoFocusTextInput 组件的外部组件 Containter 中控制：

```jsx
class AutoFocusTextInput extends Component {
  constructor() {
    super();
  }
  blur = () => {
    this.textInput.blur();
  };
  render() {
    return (
      <div>
        <input type="text" ref={input => (this.textInput = input)} />
      </div>
    );
  }
}

// AutoFocusTextInputContainer.jsx
class AutoFocusTextInputContainer extends Component {
  handleClick = () => {
    // 通过ref调用 组件的方法
    this.inputInstance.blur();
  };
  render() {
    return (
      <div>
        <AutoFocusTextInput ref={(this.inputInstance = input)} />
        <button onClick={this.handleClick}>失去焦点</button>
      </div>
    );
  }
}
```

通过 ref 获取到了 AutoFocusTextInput 组件的实例对象，并把它赋值给 Container 的 inputInstance 属性，这样就可以通过 inputInstance 调用 AutoFocusTextInput 中的 blur 方法，让已经处于获取焦点状态的 input 失去焦点。

### 父组件访问子组件的 DOM 节点

某些场景可能会需要。例如父组件需知道这个 DOM 元素的尺寸或位置信息，直接使用 ref 是无法实现的。

这时，可在子组件的 DOM 元素上定义 ref，ref 的值是父组件传递给子组件的一个回调函数，回调函数可以通过一个自定义的属性传递，例如 inputRef, 这样父组件的回调函数中就能获取到这个 DOM 元素

```jsx
function Children(props) {
  // 子组件使用父组件传递的inputRef, 为input的ref赋值
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends Component {
  render() {
    // 自定义一个属性inputRef，值是一个函数
    return <Children inputRef={el => (this.inputElement = el)} />;
  }
}
```

从该例中还可发现，即时子组件是函数组件，这种方式同样有效。

---
