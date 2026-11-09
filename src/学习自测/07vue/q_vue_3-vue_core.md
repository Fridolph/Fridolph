# Vue 核心

> 顺序不分先后，推荐使用 ctrl + K 站内搜索
> 答案仅供参考，欢迎补充、纠正。

## Vue3 核心方法

| 方法名              | 使用说明                                                                                           |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| `ref()`             | 接受一个内部值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的属性 .value。     |
| `computed()`        | 接受一个 getter 函数，返回一个只读的响应式 ref 对象。该 ref 通过 .value 暴露 getter 函数的返回值。 |
| `reactive()`        | 返回一个对象的响应式代理。                                                                         |
| `readonly()`        | 接受一个对象 (不论是响应式还是普通的) 或是一个 ref，返回一个原值的只读代理。                       |
| `watchEffect()`     | 立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。                                 |
| `watchPostEffect()` | watchEffect() 使用 flush: 'post' 选项时的别名。                                                    |
| `watchSyncEffect()` | watchEffect() 使用 flush: 'sync' 选项时的别名。                                                    |
| `watch()`           | 侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。                                   |

### 进阶方法

::: details 进阶方法

| 方法名              | 使用说明                                                                                                        |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| `shallowRef()`      | ref 浅层作用形式，和 ref() 不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式            |
| `triggerRef()`      | 强制触发依赖于一个浅层 ref 的副作用，这通常在对浅引用的内部值进行深度变更后使用。                               |
| `customRef()`       | 创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式。                                                |
| `shallowReactive()` | reactive() 的浅层作用形式                                                                                       |
| `shallowReadonly()` | readonly() 的浅层作用形式                                                                                       |
| `toRaw()`           | 可以返回由 reactive()、readonly()、shallowReactive() 或者 shallowReadonly() 创建的代理对应的原始对象            |
| `markRaw()`         | 将一个对象标记为不可被转为代理。返回该对象本身。                                                                |
| `effectScope()`     | 创建一个 effect 作用域，可以捕获其中所创建的响应式副作用 (即计算属性和侦听器)，这样捕获到的副作用可以一起处理。 |
| `getCurrentScope()` | 如果有的话，返回当前活跃的 effect 作用域。                                                                      |
| `onScopeDispose()`  | 在当前活跃的 effect 作用域上注册一个处理回调函数。当相关的 effect 作用域停止时会调用这个回调函数。              |

:::

## 指令

### v-model 是如何实现的

::: details
v-model 本质上是一个 value 和 input 语法糖（Vue2），会对用户的输入做一些特殊处理以达到更新数据，而所谓的处理其实就是给使用的元素默认绑定属性和事件。

```html
<input v-model="something" />
<!-- 相当于 -->
<input
  v-bind:value="something"
  v-on:input="something = $event.target.value" />
```

:::

### v-model 在 Vue2 和 Vue3 中的区别

::: details

- `修改默认 prop 名和事件名`

  当用在自定义组件上时， v-model 默认绑定的 prop 名从 value 变为 `modelValue` ，而事件名也从默认的 input 改为 `update:modelValue`

- 废除 model 选项

```html
<!-- 要修改默认 prop 名，只需在 v-model 后面接上 :propName，例如修改为 title -->
<my-input v-model:title="msg"></my-input>
<!-- 等同于 -->
<my-input
  :title="msg"
  @update:title="msg = $event"></my-input>
```

:::

### v-html 的原理

::: details
v-html 会`先移除节点下的所有节点`，调用 DOM 方法，通过 addProp `添加 innerHTML 属性`，归根结底还是设置 innerHTML 为 v-html 的值
:::

### 说一下 v-if 与 v-show 的区别

::: details 考虑编译、条件、性能、场景等方面：
|特性|v-if|v-show|
|-|-|-|
|显隐|`动态`的向 DOM 树内添加或删除元素 |通过设置 DOM 元素的 `display` 控制显隐|
|编译|存在`局部编译/卸载`，切换时会适时销毁或重建内部时间监听和子组件|基于 CSS 的切换，`无编译开销`|
|条件|具有惰性，只有在条件第一次变为真时才开始`局部编译`|在首次条件是否为真时被编译，然后`缓存，且 DOM 元素保留`|
|性能|有更高的切换消耗|有更高的初始渲染消耗|
|场景|适合条件不大可能改变|适合频繁切换|
:::

### v-if 和 v-for 的优先级哪个高

::: details 区分 Vue2 和 Vue3 的差异

- vue2 中 v-for 的优先级更高
- vue3 中 v-if 的优先级更高
  :::

### computed 和 watch 的区别

::: details 可从缓存，是否支持异步，运用场景等方面进行比较
|特性|computed|watchEffect|
|-|-|-|
|是否支持缓存|支持缓存，依赖数据发生变化才重新计算|不支持缓存，数据一变就会触发相应操作|
|是否支持异步|不支持异步监听|支持异步监听|
|运用场景|数值计算或其他依赖数据时使用|执行异步函数，或较大开销的操作时使用|
:::

### watch 和 watchEffect 的区别

::: details watch 和 watchEffect 都是监听器，watchEffect 是一个副作用函数，它们之间的区别有：

| 特性             | watch                          | watchEffect              |
| ---------------- | ------------------------------ | ------------------------ |
| 监听方式         | 需指明要监听的值，给定相应回调 | 自动监听回调中用到的数据 |
| 访问变化前后的值 | 可以访问变化前，与变化后的值   | 值能获取改变后的值       |
| 是否立即执行     | 不会立即执行，当值改变后才执行 | 运行后立即执行           |

---

watch 与 vue2.x 中 watch 配置功能一致，但也有两个小坑。

1. 监视 reactive 定义的响应式数据时，oldValue 无法正确获取，强制开启了深度监视（deep 配置失效）
2. 监视 reactive 定义的响应式数据中某个属性时，deep 配置有效。
   :::

### 说一下 ref 的作用是什么

- 对于 Vue2

::: details

1. 获取 DOM 元素

```vue
<template>
  <div ref="myref">123</div>
</template>

<script>
export default {
  mounted() {
    console.log('获取 DOM 元素', this.$refs.myref)
  },
}
</script>
```

2. 获取子组件中的 data

```vue
<template>
  <div>{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: '我是子组件',
    }
  },
  methods: {
    getMsg() {
      return this.msg
    },
  },
}
</script>
```

```vue
<template>
  <div title="父组件">
    <Child ref="child" />
  </div>
</template>

<script>
import Child from './child.vue'
export default {
  components: { Child },
  mounted() {
    console.log('获取子组件中的 data', this.$refs.child.msg)
  },
}
</script>
```

3. 调用子组件中的方法

同上，通过 `this.$refs.child.getMsg()` 会获取到子组件中 methods 里的 `getMsg` 方法

:::

- 对于 Vue3

::: details

1. ref 用来定义响应式数据

```js
import { ref } from 'vue'
const msg = ref('hello world')
```

2. 获取实例

```vue
<template>
  <div ref="dom"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const dom = ref(null)
onMounted(() => {
  console.log('获取 DOM 元素', dom.value)
})
</script>
```

:::

## 方法

### v-on 常用的修饰符

::: details

- `.stop` 调用 event.stopPropagation()，阻止冒泡事件
- `.prevent` 调用 event.preventDefault()，阻止默认行为
- `.native` 监听组件根元素的原生事件

:::

### data 为什么是一个函数而不是对象

::: details
JS 中的对象是引用类型的数据，当多个实例引用同一个对象时，只要一个实例对这个对象进行操作，其他实例中的数据也会发生变化。

而在 Vue 中，更多的是想要`复用组件`，那就需要每个组件有`自己的作用域`，所以组件的数据不能写成对象的形式，而是要写成函数的形式。这样当每次复用组件的时候，就会通过函数`返回一个新的 data`，也就是说每个组件都有自己的私有数据空间，它们各自维护自己的数据，不会干扰其他组件的正常运行。
:::

### 常见事件修饰符及其作用

::: details

- `.stop` 阻止事件冒泡（等同于 JS 中的 event.stopPropagation()）
- `.prevent` 阻止事件的默认行为，等同于 JS 中的 event.preventDefault()
- `.capture` 使事件捕获由外到内，默认是冒泡（由内到外）
- `.self` 只会触发自己范围内的事件，不包含子元素
- `.once` 只会触发一次
  :::

## API

### 对 nextTick 的理解

::: details
官方定义：在**下次 DOM 更新循环结束之后执行延迟回调**。在修改数据之后立即使用这个方法，`获取更新后的 DOM`

个人理解：Vue 在`更新 DOM 时是异步`执行的。当数据发生变化，Vue 将开启一个`异步更新队列`，视图需要等队列中所有数据变化完成之后，再统一进行更新。

总结 nextTick 代码的流程：

- 把回调函数放入 callbacks 等待执行
- 将执行函数放到微任务或者宏任务中
- 事件循环到了微任务或者宏任务，执行函数依次执行 callbacks 中的回调
  :::

### 什么是 mixin

::: details

- 混入（mixin）提供了一种非常灵活的方式，来分发  Vue 组件中的`可复用功能`
- 一个混入对象可以包含任意组件选项（data、methods、mounted 等）
- 当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项
- 当组件和混入对象含有同名选项时进行合并
- 数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先
  :::

### Vue.set 的实现原理

::: details

Vue.set，调用方法： `Vue.set(target, key, value)`

- 给对应和数组本身都增加了 `dep` 属性
- 当给对象新增不存在的属性则 **触发对象依赖的 watcher 去更新**
- 当修改数组索引时，我们调用数组本身的 splice 去更新数组（数组的响应式原理就是重写了 splice 等方法，调用 splice 就会触发视图更新）

vm.$set 的实现原理

- 如果目标是数组 ，直接使用数组的 splice 方法触发相应式；
- 如果目标是对象 ，会先判读属性是否存在，对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理（ defineReactive 方法就是 Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）
  :::

### Vue.extend 使用和原理

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

## 参考

- [2023 前端 Vue 面试题及答案](https://juejin.cn/post/7204844328111374391)
- [Vue2 源码解读 - 深入理解 this.$nextTick()](https://juejin.cn/post/7157552181582200863)
- [2023 高频前端面试题合集之 Vue（下篇）](https://juejin.cn/post/7275943802934149160)
- [Vue - 自定义指令](https://cn.vuejs.org/guide/reusability/custom-directives.html)
