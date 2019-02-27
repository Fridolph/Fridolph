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

```js
var data = {name: 'fridolph'}
observe(data)
let name = data.name // -> get value
data.name = 'fys' // -> change value

function observe(obj) {
  if (!obj || typeof obj !== 'object') return

  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

function defineReactive(obj, key, value) {
  // 递归子属性
  observe(value)

  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get: function reactiveGetter() {
      console.log('get value')
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('change value')
      value = newVal
    }
  })
}
```

上面是一个简单版，实现如何监听数据的get和set，但自定义事件一开始并不会执行。只有先执行依赖收集，才能在属性更新时派发更新

```html
<div>{{ name }}</div>
```

在解析模版时，遇到 `{{ name }}` 就会进行依赖收集

接下来我们来实现一个Dep类，用于解耦属性的依赖收集和派发更新操作

```js
// 通过Dep解耦属性的依赖和更新操作
class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
// 全局属性，通过该属性配置Watcher
Dep.target = null
```

以上的代码实现很简单，当需要依赖收集的时候调用 addSub，当需要派发更新的时候调用 notify。

接下来我们先来简单的了解下 Vue 组件挂载时添加响应式的过程。在组件挂载时，会先对所有需要的属性调用 Object.defineProperty()，然后实例化 Watcher，传入组件更新的回调。在实例化过程中，会对模板中的属性进行求值，触发依赖收集。

因为这一小节主要目的是学习响应式原理的细节，所以接下来的代码会简略的表达触发依赖收集时的操作。

```js
class Watcher {
  constructor(obj, key, cb) {
    // 将Dep.target指向自己
    // 然后触发属性的getter添加监听
    // 最后将Dep.target置空
    Dep.target = this
    this.cb = cb
    this.obj = obj
    this.key = key
    this.value = obj[key]
    Dep.targer = null
  }
  update() {
    // 获得新值
    this.value = this.obj[this.key]
    // 调用update方法更新dom
    this.cb(this.value)
  }
}
```

以上就是 Watcher 的简单实现，在执行构造函数的时候将 Dep.target 指向自身，从而使得收集到了对应的 Watcher，在派发更新的时候取出对应的 Watcher 然后执行 update 函数。

接下来，需要对 defineReactive 函数进行改造，在自定义函数中添加依赖收集和派发更新相关的代码。

```js
function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val)

  let dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log('get value')
      // 将 Watcher 添加到订阅
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('change value')
      val = newVal
      // 执行 watcher 的 update 方法
      dep.notify()
    }
  })
}
```

以上所有代码实现了一个简易的数据响应式，核心思路就是手动触发一次属性的 getter 来实现依赖收集。

现在我们就来测试下代码的效果，只需要把所有的代码复制到浏览器中执行，就会发现页面的内容全部被替换了。

```js
var data = { name: 'yck' }
observe(data)
function update(value) {
  document.querySelector('div').innerText = value
}
// 模拟解析到 `{{name}}` 触发的操作
new Watcher(data, 'name', update)
// update Dom innerText
data.name = 'yyy'
```

