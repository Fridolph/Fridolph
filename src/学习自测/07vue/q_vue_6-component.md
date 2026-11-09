# Vue 组件

## Vue 组件的几种通信方式

可以从以下方面展开回答：

- 解释一下父组件与子组件传值实现过程
- 非父子组件的数据传递，兄弟组件传值是如何实现的
- 跨组件通信

### 1. props / $emit

父向子传值 `props`

子向父传值，通过 `$emit` 触发父组件的方法，可传递参数

### 2. eventBus 事件总线 $emit / $on

::: details

创建事件中心管理组件之间的通信：

```js
// event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()
```

在 firstCom 组件中发送事件：

```vue
<template>
  <button @click="add">add</button>
</template>
<script>
import { EventBus } from './event-bus.js'
export default {
  data() {
    return {
      num: 0,
    }
  },
  methods: {
    add() {
      EventBus.$emit('addition', {
        num: this.num++,
      })
    },
  },
}
</script>
```

在 secondCom 组件中接收事件

```vue
<template>
  <div>求和: {{ count }}</div>
</template>

<script>
import { EventBus } from './event-bus.js'
export default {
  data() {
    return {
      count: 0,
    }
  },
  mounted() {
    EventBus.$on('addition', param => {
      this.count = this.count + param.num
    })
  },
}
</script>
```

:::

### 3. 依赖注入 provide / inject

::: details
该方法用于父子（子孙）组件之间的通信。 provide / inject 是 Vue 提供的两个钩子，和 data 、 methods 是同级的。

- `provide` 钩子用来`发送数据或方法`
- `inject` 钩子用来`接收数据或方法`
  :::

### 4. ref / $refs

::: details
子组件定好 ref，父组件通过 `this.$refs[childRef]` 获取子组件实例，从而调用子组件的方法或访问子组件的数据。
:::

### 5. parent / children

::: details

- 通过 parent 访问到的是上一级父组件的实例，可以使用 `$root 来访问根组件`
- `在组件中使用 $children 拿到的是所有的子组件的实例`，它是一个无序数组
- children 的值是数组，而 $parent 是个对象
  :::

### 6. attrs / listeners

用于组件之间的跨代通信。`inheritAttrs` 默认值为 true，继承父组件除 props 之外的所有属性；当该值为false时，只继承 class 属性

- `attrs` 继承所有的父组件属性（除了prop传递的属性、class 和 style ），一般用在子组件的子元素上
- `listeners` 该属性是一个对象，里面包含了作用在这个组件上的所有监听器，可以配合 `v-on="$listeners"` 将所有的事件监听器指向这个组件的某个特定的子元素

### 7. Vuex


## Slot

### 说说你对 slot 的理解

::: details

1. 在 HTML 中 slot 元素 ，作为 Web Components 技术套件的一部分，是 Web 组件内的一个占位符

2. 该占位符可以在后期使用自己的标记语言填充

3. template 不会展示到页面中，需要用先获取它的引用，然后添加到 DOM 中，在 Vue 中的概念也是如此

4. Slot 艺名插槽。我们可以理解为 solt 在组件模板中占好了位置，当使用该组件标签时候，组件标签里面的内容就会自动填坑（替换组件模板中 slot 位置），作为承载分发内容的出口
   :::

### slot 使用场景有哪些

::: details

- 通过插槽可以拓展组件，去更好地复用组件和对其做定制化处理
- 通过 slot 插槽向组件内部指定位置传递内容，完成这个复用组件在不同场景的应用
- 比如：布局组件、表格列、下拉选、弹框显示内容等
  :::

## keep-alive

### 说一下 keep-alive

::: details
keep-alive 组件是 vue 的`内置组件`，用于`缓存内部组件实例`。这样做的目的在于，keep-alive **内部的组件切回时，不用重新创建组件实例，而直接使用缓存中的实例**，一方面能够`避免创建组件带来的开销`，另一方面可以`保留组件的状态`。
:::

### keep-alive 的常用属性有哪些

::: details

- `include` 和 `exclude` 属性，通过它们可以控制哪些组件进入缓存。
- `max` 属性，通过它可以设置最大缓存数，当缓存的实例超过该数时，vue 会移除最久没有使用的组件缓存。
  :::

### keep-alive 相关的生命周期函数是什么，什么场景下会进行使用

::: details
受 keep-alive 的影响，其内部所有嵌套的组件都具有两个生命周期钩子函数，分别是 `activated` 和 `deactivated`，它们分别在`组件激活`和`组件失活`时触发。**第一次 activated 触发是在 mounted 之后**。
:::

### keep-alive 实现原理

::: details
在具体的实现上，keep-alive 在**内部维护了一个 key 数组和一个缓存对象**

```js
// keep-alive 内部的生命周期函数
created () {
  this.cache = Object.create(null)
  this.keys = []
}
```

- key 数组记录目前缓存的组件 key 值，如果组件没有指定 key 值，则会为其自动生成一个唯一的 key 值
- cache 对象以 key 值为键，vnode 为值，用于缓存组件对应的虚拟 DOM
- 在 keep-alive 的渲染函数中，其基本逻辑是判断当前渲染的 vnode 是否有对应的缓存，如果有，从缓存中读取到对应的组件实例；如果没有则将其缓存。
- 当缓存数量超过 max 数值时，keep-alive 会移除掉 key 数组的第一个元素。

  :::

## 其他

### Vue 中组件 Component 和插件 Plugin 有什么区别

::: details

- 组件

  把一个页面分成多个模块，每个模块都可以看做是一个组件，或者把一些`公共的模块抽离出来`，`方便复用`提高可维护性，降低整个系统的耦合度。

- 插件

  插件 (Plugins) 是一种能为 `Vue 添加全局功能的工具代码`，对 Vue 功能的增强和补充

两者区别

- 编写形式
  - 组件 .vue 文件（html、css、js 代码）
  - 插件需暴露一个 install 方法
- 注册形式

  - 组件可以通过全局注册与局部注册（Vue.component）
  - 插件需要 Vue.use（）

  :::

  
### EventBus 与 mitt 区别

::: details
Vue2 中我们使用 EventBus 来实现跨组件之间的一些通信，它依赖于 Vue 自带的 $on/$emit/$off 等方法，这种方式使用非常简单方便，但如果使用不当也会带来难以维护的毁灭灾难。

而 Vue3 中移除了这些相关方法，这意味着 `EventBus` 这种方式我们使用不了， Vue3 推荐尽可能使用 `props/emits`、`provide/inject`、`vuex` 等其他方式来替代。
当然，如果 Vue3 内部的方式无法满足你，官方建议使用一些外部的辅助库，例如：`mitt`。
:::

## 参考

- [vue3 面试题八股集合——2023](https://juejin.cn/post/7227453567686033468?from=search-suggest#heading-14)
