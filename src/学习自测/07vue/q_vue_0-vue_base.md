# Vue 核心

> 这里都是 Vue2 相关内容，毕竟还有很多公司在问 Vue 问题时是针对 Vue2（仅个人经历）建议还是先从 Vue3 来说

## 响应式 Reactive

### Vue 的响应式原理

::: details

Vue2 采用数据劫持结合发布订阅模式（PubSub 模式）的方式，通过 `Object.defineProperty` 来劫持各个属性的 setter、getter，在`数据变动时`发布消息给订阅者，`触发相应的监听回调`。

当把一个 JS 对象传给 Vue 实例来作为它的 data 选项时，Vue 将遍历它的属性，用 `Object.defineProperty` 将它们转为 `getter/setter`（用户不可见）。Vue 在内部进行`追踪依赖`，`在属性被访问和修改时通知变化`。

Vue 的数据双向绑定整合了 Observer，Compile 和 Watcher 三者，通过 `Observer 来监听自己的 model 的数据变化`，通过 `Compile 来解析编译模板指令`，最终利用 `Watcher 达到数据变化 -> 视图更新`（搭起 Observer 和 Compile 之间的通信桥梁）。

> Vue3.x 放弃了 Object.defineProperty ，使用 ES6 原生的 `Proxy`，来解决之前所存在的一些问题。

<Image src="/07vue/reactive.jpg" alt="Vue响应式原理"/>

:::

### Vue 如何检测数组的变化

::: details

- Vue2.x 中是将数组的常用方法进行了重写

Vue 将 data 中的数组进行了原型链重写，指向了自己定义的数组原型方法。这样当调用数组 api 时，可以通知依赖更新。如果数组中包含着引用类型，会对数组中的引用类型再次递归遍历进行监控。这样就实现了监测数组变化。过程如下：

1. 初始化传入 data 数据执行 `initData`
2. 将数据进行观测 `new Observer`
3. 将数组原型方法`指向重写的原型`
4. 深度观察数组中的引用类型

:::

### 无法检测数组时的解决方案

::: details 以下情况无法检测到数组的变化

1. 当利用索引直接设置一个数组项时，例如 `vm.items[indexOfItem] = newValue`。可利用索引设置数组来解决：

```js
// vm.$set，Vue.set的一个别名
vm.$set(vm.items, indexOfItem, newValue)
```

2. 当修改数组的长度时，例如 `vm.items.length = newLength`。修改数组的长度的替代方案：

```js
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

:::

## 编译 Compile

### Vue 模版编译原理

::: details
Vue 中的模板 template 无法被浏览器解析并渲染，因为这不属于浏览器的标准，所以需要`将 template 转化成一个 JavaScript 函数`，这样浏览器就可以`执行这一个函数并渲染出对应的 HTML 元素`，这一个转化的过程，就称为`模板编译`。

模板编译又分三个阶段：

- `解析阶段` **parse**：使用大量的正则表达式对 template 字符串进行解析，将标签、指令、属性等转化为抽象语法树 AST
- `优化阶段` **optimize**：遍历 AST，找到其中的一些静态节点并进行标记，方便 diff 比较时直接跳过这些静态节点，优化 runtime 的性能
- `生成阶段` **generate**：将最终的 AST 转化为 render 字符串，然后将 render 字符串通过 new Function 的方式转换成渲染函数
  :::

### computed 的实现原理

::: details
当组件实例触发生命周期函数 beforeCreate 后，它会做一系列事情，其中就包括对 computed 的处理：它会`遍历 computed 配置中的所有属性`，为每一个属性创建一个 `Watcher` 对象，并传入一个函数，该函数的本质其实就是 computed 配置中的 getter，这样一来，getter 运行过程中就会`收集依赖`。

计算属性创建的 Watcher `不会立即执行`，因为要考虑到该计算属性是否会被渲染函数使用，如果没有使用，就不会得到执行。因此，在创建 Watcher 的时候，它`使用了 lazy 配置`，lazy 配置可以让 Watcher 不会立即执行。受到 lazy 影响，Watcher 内部会保存两个关键属性来`实现缓存`：

- `value` 属性用于保存 Watcher 运行的结果，受 lazy 的影响，该值在最开始是 undefined
- `dirty` 属性用于指示当前的 value 是否已经过时了，即是否为脏值，受 lazy 的影响，该值在最开始是 true

Watcher 创建好后，vue 会使用`代理模式`，将计算属性挂载到组件实例中。当读取计算属性时，vue `检查其对应的 Watcher` 是否是脏值：

- 如果 dirty 为 true，则运行函数，计算依赖，并得到对应的值，保存在 Watcher 的 value 中，然后设置 dirty 为 false，然后返回；
- 如果 dirty 为 false，则直接返回 watcher 的 value。

巧妙的是，在依赖收集时，被依赖的数据不仅会收集到计算属性的 Watcher，还会收集到组件的 Watcher。`当计算属性的依赖变化时`，会先触发计算属性的 Watcher 执行，此时，它只需设置 dirty 为 true 即可，不做任何处理。

由于依赖同时会收集到组件的 Watcher，因此`组件会重新渲染`，而重新渲染时又读取到了计算属性，由于计算属性目前已为 dirty，因此会重新运行 getter 进行运算而对于计算属性的 setter，则极其简单，当设置计算属性时，直接运行 setter 即可。
:::

## 双向绑定

### v-model 双向绑定的原理

::: details
v-model 本质就是：**value + 对应方法 的语法糖**。可以通过 model 属性的 prop 和 event 属性来进行自定义。原生的 v-model，会根据标签的不同生成不同的事件和属性。例如：

- text 和 textarea 元素，使用 `value` 属性和 `input` 事件
- checkbox 和 radio，使用 `checked` 属性和 `change` 事件
- select 字段将 `value` 作为 prop 并将 `change` 作为事件

因此接下去我们执行以下 3 个步骤，实现数据的双向绑定：

- 实现一个`监听器 Observer`，用来劫持并监听所有属性，如果有变动的，就通知订阅者。
- 实现一个`订阅者 Watcher`，可以收到属性的变化通知并执行相应的函数，从而更新视图。
- 实现一个`解析器 Compile`，可以扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器。
  :::

### Vue 事件绑定原理

::: details
Vue 的事件绑定分为两种：

- **原生的事件绑定**

  Vue 在创建 dom 时会调用 createEle，默认调用 invokeCreateHooks，针对事件会调用 updateDOMListeners，其中就有 add 方法，`核心使用 addEventListener 绑在 dom 上`

- **组件的事件绑定**
  组件实例化 -> 获取到父给子绑定的`自定义事件` -> `调用 updateListeners（传入 add 方法，核心使用 $on）`
  :::

## 参考

- [2023 高频前端面试题合集之 Vue（上篇）](https://juejin.cn/post/7208005892313579576#heading-4)
