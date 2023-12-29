`src/core/instance/index.js`

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```

Vue只能通过new关键字初始化，然后会调用 `this._init()`方法，

```js
Vue.prototype._init = function(options?: Object) {
  const vm: Component = this
  // a uid
  vm._uid = uid++

  let startTag, endTag
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    startTag = `vue-perf-start:${vm._uid}`
    endTag = `vue-perf-end:${vm._uid}`
    mark(startTag)
  }

  // a flag to avoid this being observed
  vm._isVue = true
  // merge options
  if (options && options._isComponent) {
    // 优化内部组件实例化，因为动态选项合并非常慢，并且没有一个内部组件选项需要特殊处理
    initInternalComponent(vm, options)
  } else {
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    )
  }
}
```

Vue初始化主要就干了几件事：

* 合并配置
* 初始化生命周期
* 初始化事件中心
* 初始化渲染
* 初始化data、props、computed、watcher等等

## 总结

Vue的初始化逻辑很清楚，把不同的功能逻辑拆成一个单独的函数执行，主线逻辑一目了然，这样的编程思想非常值得学习和借鉴。

```js
function test() {
  return () => {
    return () => {

    }
  }
}
```
