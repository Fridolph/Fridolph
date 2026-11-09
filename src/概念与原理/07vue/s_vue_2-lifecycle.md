# Vue 生命周期

> 你看 Vue 源码干嘛？你使用 Vue 又不需要它的源码，你只需要会用就行了 —— 尤大 （说得很有道理，但不卷找不到工作）

## Vue 的生命周期到底是什么

- 简单来说，是用来描述一个组件`从创建到销毁`的全过程。
- 那复杂来说呢？ 就是一个**组件从创建开始经历了数据初始化，挂载，更新等步骤后，最后被销毁**这一完整过程。

<Image src="/07vue/lifecycle.webp" alt="Vue2组件生命周期详解"/>

### 挂载阶段

- `beforeCreate` 是最先的，并且在此时的状态下，我们打印的信息什么都拿不到
- 之后进入了 `created` 状态，在这个状态中我们的 el，也就是 Dom 元素依旧是拿不到的，但是我们已经可以拿到 data 了，这意味着 created 已经将数据加载进来了 ，已经为这个 Vue 实例开辟了内存空间。
- `beforeMount`，DOM 挂载前状态，挂载就是将虚拟 Dom 转变成真实 Dom 的过程，所以在这之前，我们的 el 当然还是拿不到的。
- `mounted`，挂载结束，意味着虚拟 Dom 已经挂载在了真实的元素上，所以从此开始我们就可以拿到 el 了。我们可以用 console.dir 去打印一些我们需要的元素的属性。
- 至此，我们的挂载阶段就结束了。

### 更新阶段

每当我们去改变页面元素的时候，就会进入更新阶段，也就是 `beforeUpdate` , `updated` 这两个状态。

### 销毁阶段

- `beforeDestroy`，销毁前状态，在销毁之前，所以我们的元素、data 都是如同挂载之后的阶段一样，都是可以打印出来的。
- `destroyed`，销毁完成的状态，我以为销毁了，那应该什么都打印不出来了，其实不然，他还是什么都可以打印出来的。
- `beforeDestroy` 和 `destroyed`，组件离开（卸载时）被调用。

## 生命周期的每个阶段适合做什么

### created

在 Vue 实例创建完毕状态，我们可以去访问 data、computed、watch、methods 上的方法和数据，但现在还没有将虚拟 Dom 挂载到真实 Dom 上，所以我们在此时访问不到我们的 Dom 元素（el 属性，ref 属性此时都为空）。

> 我们可以进行一些简单的 Ajax，并可以对页面进行初始化之类的操作

### beforeMount

它是在挂载之前被调用的，会在此时去找到虚拟 Dom，并将其编译成 Render

### mounted

虚拟 Dom 已经被挂载到真实 Dom 上，此时我们可以获取 Dom 节点，$ref 在此时也是可以访问的。

> 我们在此时可以去获取节点信息，做 Ajax 请求，对节点做一些操作

### beforeupdate

响应式数据更新的时候会被调用，beforeupdate 的阶段虚拟 Dom 还没更新，所以在此时依旧可以访问现有的 Dom。

> 我们可以在此时访问现有的 Dom，手动移除一些添加的监听事件

### updated

此时补丁已经打完了，Dom 已经更新完毕，可以执行一些依赖新 Dom 的操作。

> 注：若进行数据等敏感操作，请避免和防止死循环等造成的内存溢出

### beforeDestroy

在 Vue 实例销毁之前被调用，在此时我们的实例还未被销毁。

> 在此时可以做一些操作，比如销毁定时器，解绑全局事件，销毁插件对象等

## 父子组件的生命周期

在父组件挂载前阶段，子组件已经挂载完成了。

不光是挂载阶段，其他两个阶段我们也可以打印出来，但是在这里我就不细说了，直接上结论：

- 挂载阶段：父组件 beforeMount -> 子组件 created -> 子组件 mounted -> 父组件 mounted
- 更新阶段：父组件 beforeUpdate -> 子组件 beforeUpdate -> 子组件 updated -> 父组件 updated
- 销毁阶段：父组件 beforeDestroy -> 子组件 beforeDestroy -> 子组件 destroyed -> 父组件 destroyed

### 请求放在哪个生命周期会更合适

- created
- mounted

上文已经讲了，这两个回答，前者是数据已经准备好了，后者是连 dom 也已经加载完成了，两个都是可以的，但是 mounted 会更好。

> 以上为作者观点。Vue3 后我们的请求其实都在放到 setup 中的，这一阶段其实是 created。当然答案没有对错，欢迎批评、讨论和补充。

## Vue3 生命周期图

<Image src="/07vue/lifecycle.png" alt="Vue3组件生命周期详解"/>

## 组合式 API：生命周期钩子

### onBeforeMount

在组件被挂载之前被调用。

当这个钩子被调用时，组件已经完成了其响应式状态的设置，但还没有创建 DOM 节点。它即将首次执行 DOM 渲染过程。

### onMounted

在组件挂载完成后执行。

组件在以下情况下被视为已挂载：

- 其所有同步子组件都已经被挂载 (不包含异步组件或 `<Suspense>` 树内的组件)。

- 其自身的 DOM 树已经创建完成并插入了父容器中。注意仅当根容器在文档中时，才可以保证组件 DOM 树也在文档中。

### onBeforeUpdate

在组件即将因为响应式状态变更而更新其 DOM 树之前调用。

这个钩子可以用来在 Vue 更新 DOM 之前访问 DOM 状态。在这个钩子中更改状态也是安全的。

### onUpdated

在组件因为响应式状态变更而更新其 DOM 树之后调用。父组件的更新钩子将在其子组件的更新钩子之后调用。

::: warning

- 若需要在某个特定的状态更改后访问更新后的 DOM，请使用 nextTick() 作为替代
- 不要在 updated 钩子中更改组件的状态，这可能会导致无限的更新循环！
  :::

### onActivated

注册一个回调函数，若组件实例是 `<KeepAlive>` 缓存树的一部分，当组件被插入到 DOM 中时调用。

### onDeactivated

注册一个回调函数，若组件实例是 `<KeepAlive>` 缓存树的一部分，当组件从 DOM 中被移除时调用。

### onBeforeUnmount

在组件实例被卸载之前调用。

当这个钩子被调用时，组件实例依然还保有全部的功能。

### onUnmounted

在组件实例被卸载之后调用。

一个组件在以下情况下被视为已卸载：

- 其所有子组件都已经被卸载。

- 所有相关的响应式作用 (渲染作用以及 setup() 时创建的计算属性和侦听器) 都已经停止。

> 可以在这个钩子中手动清理一些副作用，例如计时器、DOM 事件监听器或者与服务器的连接。

### onErrorCaptured

在捕获了后代组件传递的错误时调用。

错误可以从以下几个来源中捕获：

- 组件渲染
- 事件处理器
- 生命周期钩子
- setup() 函数
- 侦听器
- 自定义指令钩子
- 过渡钩子

```ts
function onErrorCaptured(callback: ErrorCapturedHook): void

type ErrorCapturedHook = (
  err: unknown,
  instance: ComponentPublicInstance | null,
  info: string
) => boolean | void
```

你可以在 errorCaptured() 中更改组件状态来为用户显示一个错误状态。注意不要让错误状态再次渲染导致本次错误的内容，否则组件会陷入无限循环。

这个钩子可以通过返回 false 来阻止错误继续向上传递

#### 错误传递规则

- 默认情况下，所有的错误都会被发送到应用级的 app.config.errorHandler (前提是这个函数已经定义)，这样这些错误都能在一个统一的地方报告给分析服务。

- 如果组件的继承链或组件链上存在多个 errorCaptured 钩子，对于同一个错误，这些钩子会被按从底至上的顺序一一调用。这个过程被称为“向上传递”，类似于原生 DOM 事件的冒泡机制。

- 如果 errorCaptured 钩子本身抛出了一个错误，那么这个错误和原来捕获到的错误都将被发送到 app.config.errorHandler。

- errorCaptured 钩子可以通过返回 false 来阻止错误继续向上传递。即表示“这个错误已经被处理了，应当被忽略”，它将阻止其他的 errorCaptured 钩子或 app.config.errorHandler 因这个错误而被调用。

## 自测

[学习自测 - Vue 生命周期](../../学习自测/07vue/q_vue_2-lifecycle.md)

## 参考

- [Vuejs 官方文档 - 组合式 API：生命周期钩子](https://cn.vuejs.org/api/composition-api-lifecycle.html)
- [详解 Vue 的生命周期](https://juejin.cn/post/7032881219524100132?searchId=20240220114253D90DBE51C91D49740FAF)
