Vue 的 _render 方法是实例的一个私有方法，它用来把实例渲染成一个虚拟Node。它的定义在 `src/core/instance/render.js` 文件中：

```js
Vue.prototype._render = function(): VNode {
  const vm: Component = this
  const {render, _parentVnode} = vm.$options

  // reset _rendered flag on slots for duplicate slot check
  if (process.env.NODE_ENV !== 'production') {
    for (const key in vm.$slots) {
      // $flow-disabled-line
      vm.$slots[key]._rendered = false
    }
  }

  if (_parentVnode) {
    vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject
  }

  // set parent vnode. this allows render functions to have access
  // to the data on the placehoder node.
  vm.$vnode = _parentVnode
  // render self
  let vnode
  try {
    vnode = render.call(vm._renderProxy, vm.$createElement)
  } catch (e) {
    handleError(e, vm, `render`)
    // return error render result,
    // or previous vnode to prevent render error causing blank component
  }
}
```

这段代码最关键的是 `render` 方法的调用，我们在平时的开发工作中手写 render 方法的场景比较少，而写的比较多的是template模版，在之前的mounted方法的实现中，会把template编译成render方法，但这个编译过程很复杂（这里暂略过）。

在Vue的官方文档中介绍了render函数的第一个参数是`createElement`，那么结合之前的例子：

```html
<div id="app">
  {{message}}
</div>
```

相当于我们编写了如下render函数：

```js
render: function(createElement) {
  return createElement('div', {
    attrs: {
      id: 'app'
    },
  }, this.message)
}
```

再回到 _render 函数中的render方法的调用：

```js
vnode = render.call(vm._renderProxy, vm.$createElement)
```

可以看到，`render`函数中的`createElement`方法就是`vm.$createElement`方法：

```js
export function initRender(vm: Component) {
  // ...
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
  // normalization is always applied for the public version, used in
  // user-written render functions
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)
}
```

实际上，vm.$createElement 方法定义是在执行`initRender`方法时，可以看到除了`vm.$createElement`方法，还有一个 `vm.c` 方法，它是被模版编译成的render函数使用，而vm.$createElement是用户手写render方法使用的，这两个方法支持的参数相同，并且内部都调用了createElement方法。

## 总结

vm._render 最终是通过执行createElement 方法并返回的是vnode，它是一个虚拟Node. Vue2版本相比之前最大的提升就是利用了Virtual DOM。因此在分析createElement的实现前，我们先了解一下Virtual DOM的概念。
