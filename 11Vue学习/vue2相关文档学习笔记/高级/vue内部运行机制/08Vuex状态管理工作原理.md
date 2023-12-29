## Vuex状态管理的工作原理

### 为什么要使用Vuex

当我们使用Vue来开发单页应用时，经常会遇到一些组件间共享数据或状态，或是需要通过props深层传递的一些数据。在应用规模较小时，我们会使用props、事件等常用的父子组件的组件间通信方法。或者是通过事件总线`eventBus`来进行任意两个组件的通信。但是当应用逐渐复杂后，问题就开始出现了，这样的通信方式会导致数据流异常地混乱。

<img src="https://user-gold-cdn.xitu.io/2018/2/9/1617a011064cc43e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

这个时候，我们就需要用到我们的状态管理工具 Vuex 了。Vuex 是一个专门为 Vue.js 框架设计的、专门用来对于 Vue.js 应用进行状态管理的库。它借鉴了 Flux、redux 的基本思想，将状态抽离到全局，形成一个 Store。因为 Vuex 内部采用了 new Vue 来将 Store 内的数据进行「响应式化」，所以 Vuex 是一款利用 Vue 内部机制的库，与 Vue 高度契合，与 Vue 搭配使用显得更加简单高效，但缺点是不能与其他的框架（如 react）配合使用。

本节将简单介绍 Vuex 最核心的内部机制，起个抛砖引玉的作用，想了解更多细节可以参考笔者 Github 上的另一篇文章 [《Vuex源码解析》](https://github.com/answershuto/learnVue/blob/master/docs/Vuex%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.MarkDown)或者直接阅读 Vuex源码。

### 安装

Vue提供了一个Vue.use的方法来安装插件，内部会调用插件提供的install方法

    Vue.use(Vuex)

我们的插件需要提供一个`install`方法来安装

```js
let Vue

export default install(_Vue) {
  Vue.mixin({ beforeCreate: vuexInit })
  Vue = _Vue
}
```

我们采用`Vue.mixin`方法将`vuexInit`方法混淆进`beforeCreate`钩子中，并用Vue保存_Vue对象，那么`vuexInit`什么了什么？

我们知道在使用Vuex时，需要将store传入到Vue实例中。

```js
new Vue({
  // ...省略
  store
})
```

但是我们却在每一个vm中都可以访问该store，这个就需要靠vuexInit了。

```js
function vuexInit() {
  const options = this.$options
  if (options.store) {
    this.$store = options.store
  } else {
    this.$store = options.parent.$store
  }
}
```
因为之前已经调用`Vue.mixin`方法将vuexInit方法混淆进`beforeCreate`钩子中，所以每一个vm实例都会调用vuexInit方法。

如果是根节点（$options中存在store说明是根节点），则直接将options.store赋值给`this.$store`。否则则说明不是根节点，从父节点的`$store`中获取。

通过这步操作，我们已经可以在任意一个vm中通过`this.$store`来访问`Store`的实例了。

### Store

数据的响应式化

首先我们需要在Store构造函数中对`state`进行响应式化

```js
constructor() {
  this._vm = new Vue({
    data: {
      $$state: this.state
    }
  })
}
```

在这个步骤以后，`state`会将需要的依赖收集在Dep中，在被修改时更新对应视图。我们来看例子：

```js
let globalData = {
  text: 'hello world'
}
new Vue({
  data() {
    return {
      $$state: {
        globalData
      }
    }
  }
})
// modify
setTimeout(() => {
  globalData.text = 'hello vue'
}, 1000)

Vue.prototype.globalData = globalData
```

任意模版中

    <div>{{globalData.text}}</div>

上述代码在全局有一个globalData，它被传入一个Vue对象的data中，之后在任意Vue模版中对该变量进行展示，因为此时globalData已经在Vue的`prototype`上了所以直接通过`this.prototype`访问，也就是在模版中的`{{prototype.text}}`。

此时，setTimeout在1s后将`globalData.text`修改了，我们发现模版中的`globalData.text`发生变化，上述部分是Vuex依赖Vue核心实现数据的响应式化。

讲完了Vuex最核心的通过Vue进行数据的响应式化，接下来我们再来介绍两个`Store`API

### commit

首先是commit方法，我们知道commit方法是用来触发`mutation`的

```js
commit(type, payload, _options) {
  const entry = this._mutations[type]
  entry.forEach(function commitIterator(handler) {
    handler(payload)
  })
}
```

从`_mutations`中取出相应的mutation，循环执行其中每一个mutation

### dispatch

`dispatch`同理，用于触发action，可以包含异步状态

```js
dispatch(type, payload) {
  const entry = this._actions[type]
  return entry.length > 1
    ? Promise.all(entry.map(handler => handler(payload)))
    : entry[0](payload)
}
```

同样的，取出 `_actions`中所有对应的action，将其执行，如果有多个则用 `Promise.all`进行包装

## 最后

理解Vuex的核心在于理解其如何与Vue本身结合，如果利用Vue的响应式机制来实现核心Store的响应式化。

参考自 [Vuex状态管理的工作原理](https://github.com/answershuto/VueDemo/blob/master/%E3%80%8AVuex%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E3%80%8B.js)