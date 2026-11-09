# API

## 对 nextTick 的理解

::: details
官方定义：在**下次 DOM 更新循环结束之后执行延迟回调**。在修改数据之后立即使用这个方法，`获取更新后的 DOM`

个人理解：Vue 在`更新 DOM 时是异步`执行的。当数据发生变化，Vue 将开启一个`异步更新队列`，视图需要等队列中所有数据变化完成之后，再统一进行更新。

总结 nextTick 代码的流程：

- 把回调函数放入 callbacks 等待执行
- 将执行函数放到微任务或者宏任务中
- 事件循环到了微任务或者宏任务，执行函数依次执行 callbacks 中的回调
  :::

## 什么是 mixin

::: details

- 混入（mixin）提供了一种非常灵活的方式，来分发  Vue 组件中的`可复用功能`
- 一个混入对象可以包含任意组件选项（data、methods、mounted 等）
- 当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项
- 当组件和混入对象含有同名选项时进行合并
- 数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先
  :::

## Vue.set 的实现原理

::: details

Vue.set，调用方法： `Vue.set(target, key, value)`

- 给对应和数组本身都增加了 `dep` 属性
- 当给对象新增不存在的属性则 **触发对象依赖的 watcher 去更新**
- 当修改数组索引时，我们调用数组本身的 splice 去更新数组（数组的响应式原理就是重写了 splice 等方法，调用 splice 就会触发视图更新）

vm.$set 的实现原理

- 如果目标是数组 ，直接使用数组的 splice 方法触发相应式；
- 如果目标是对象 ，会先判读属性是否存在，对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理（ defineReactive 方法就是 Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）
  :::

## Vue.extend 使用和原理

::: details
Vue.extend 使用基础 Vue 构造器，创建一个子类。参数是一个包含组件选项的对象。

其实就是一个子类构造器，extend 是 Vue 组件的核心 api，实现思路就是`使用原型继承的方法返回了 Vue 的子类`，并且利用 `mergeOptions` 把传入组件的 options 和父类的 options 进行了合并。

```js
export default function initExtend(Vue) {
  // 组件的唯一标识
  let cid = 0
  // 创建子类继承Vue父类，便于属性扩展
  Vue.extend = function (extendOptions) {
    // 创建子类的构造函数，并且调用初始化方法
    const Sub = function VueComponent(options) {
      // 调用Vue初始化方法
      this._init(options)
    }
    Sub.cid = cid++
    // 子类原型指向父类
    Sub.prototype = Object.create(this.prototype)
    // constructor指向自己
    Sub.prototype.constructor = Sub
    // 合并自己的options 和 父类的 options
    Sub.options = mergeOptions(this.options, extendOptions)
    return Sub
  }
}
```

:::

## 其他

- shallowRef()
- triggerRef()
- customRef()
- shallowReactive()
- shallowReadonly()
- toRaw()
- markRaw()
- effectScope()
- getCurrentScope()
- onScopeDispose()

## 参考

- [2023 前端 Vue 面试题及答案](https://juejin.cn/post/7204844328111374391)
- [Vue2 源码解读 - 深入理解 this.$nextTick()](https://juejin.cn/post/7157552181582200863)
- [2023 高频前端面试题合集之 Vue（下篇）](https://juejin.cn/post/7275943802934149160)
- [Vue - 自定义指令](https://cn.vuejs.org/guide/reusability/custom-directives.html)
