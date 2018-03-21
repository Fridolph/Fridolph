# 说一下 React setState 的过程

## 先说一下 setState

### setState 的异步

```js
constructor() {
  super()
  this.state = {
    list: ['a', 'b']
  }
}
addTitle(title) {  
  console.log(this.state.list) // ['a', 'b']
  this.setState({
    list: this.state.list.concat(title) // 'c'
  })
  console.log(this.state.list)
}
```

### setState 为何需要异步

* 可能会一次执行多次 setState
* 无法得知用户何时使用 setState
* 没必要每次 setState 都重新渲染，考虑性能

### Vue 修改属性也是异步的

* 效果、原因与 setState 一样
* 对比记忆，印象深刻
* 权当复习一下 vue 的渲染流程

## setState 的过程

* 每个组件实例，都有 renderComponent 方法
* 执行 renderComponent 会重新执行实例的 render
* render 函数返回 newVnode，然后拿到 preVnode
* 执行 patch(preVnode, newVnode)

简单模拟一下此过程

```js
class Component {
  constructor() {
    super()
  }
  renderComponent() {
    const preVnode = this._vnode
    const newVnode = this.render()
    patch(preVnode, newVnode)
    this._vnode = newVnode
  }
}
```