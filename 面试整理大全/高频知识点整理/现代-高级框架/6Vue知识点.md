## 说一下 Vue 生命周期

当我们创建一个Vue实例对象时，进入 _init方法（将el data methods等绑定到Vue原型上） 首先调用 beforeCreate 钩子，等到 injections 和 reactivity 作用后再去调 created钩子。

所以说要操作data最早也要到created钩子做。created后会去判断 实例是否有el属性 没就调用 $mount 方法，有el再看template，将 template 转为 render function，这里会执行beforeMount钩子。接着调用render渲染并挂载到DOM节点上，然后执行mounted钩子。

当数据更新时会分别调用 beforeUpdate 和 updated 这两个钩子。

另外还有keep-alive独有的生命周期 activated 和 deactivated。

最后就是销毁组件的钩子 beforeDestory 和 destoryed

## Vue组件通信

- 父子组件通信
  - props
  - 子到父通过emit
- 兄弟组件通信
  - this.$parent.$children 在子组件通过name查询实例通信
- 跨多层级组件通信
  - provide / inject
- 任意组件
  - Event Bus
- Vuex

##  mixin和mixins的区别

mixin用于全局混入，会影响到每个组件实例，Vue插件都是这样做初始化的

```js
Vue.mixin({
  beforeCreate() {
    // 逻辑
  }
})
```

mixins 用于扩展组件，混入的钩子函数会先于组件内的钩子函数执行

## computed 和 watch的区别

computed 是计算属性，依赖其他属性计算值，并且 computed 的值有缓存，只有当计算值变化才会返回内容。

watch 监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作。

## keep-alive组件作用

在组件切换时保存组件状态，防止多次渲染 

## v-show 与 v-if 区别

v-show只是单纯display:none block的切换，无论初始条件是什么都会被渲染。初始渲染开销较大，但切换开销小，适合频繁切换场景

v-if 当为false组件不会渲染，直到为true，切换条件会触发 销毁和挂载组件，切换开销较大，适合经常不切换的场景。

基于v-if的惰性渲染机制，可适当使用，在初始渲染时减少开销。

---

## 响应式原理

Vue内部使用了Object.defineProperty 来实现数据响应式，通过这个函数可以监听到set和get事件

