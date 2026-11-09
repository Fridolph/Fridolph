# Vue3 核心

> 很多资料、文章很多说的是 Vue2，为了避免混淆，这个单独拎一个出来。

Vue3 是以后的大趋势，除了核心响应式原理外，其他部分内容整理都以 Vue3 为主了。

## Vue3 的响应式原理

Proxy 实现的响应式原理与 Vue2 的实现原理相同，实现方式大同小异：

::: details

当一个 Vue 实例创建时，Vue 会遍历 data 中的属性，
使用 `Proxy`将它们转为 `getter/setter`，并且在`内部追踪相关依赖`，**在属性被访问和修改时通知变化**。

每个组件实例都有相应的 watcher 程序实例，它会在组
件渲染的过程中把属性记录为依赖 Dependency，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。

- get 收集依赖
- Set、delete 等触发依赖
- 对于集合类型，就是对集合对象的方法做一层包装：原方法执行后执行依赖相关的收集或触发逻辑

<Image src="/07vue/reactive.jpg" alt="Vue响应式原理"/>

:::

## Vue3.0 为什么要用 proxy？

::: details

1. Object.defineProperty 无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应
2. Object.defineProperty `只能劫持对象的属性`，从而需要对每个对象，每个属性进行遍历，如果，`属性值是对象，还需要深度遍历`。Proxy 可以劫持整个对象，并返回一个新的对象
3. Proxy 不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性（解决 1）
4. Proxy 作为新标准将受到浏览器厂商重点持续的性能优化
   :::

## Vue 2 与 3 的差异

::: details

**一、响应式原理**

- Vue2 响应式原理基于 `Object.defineProperty`
- Vue3 响应式原理基于 `Proxy`

**二、API 不同**

- Vue2 使用 Options 选项式
- Vue3 推荐使用 Composition API 组合式

**三、定义响应式数据不同**

- vue2 在 data 里的数据都是响应式的
- vue3 使用 ref、reactive，ref 取值需要用 .value

**四、生命周期不同**

- Vue2
  - beforeCreate、created
  - beforeMount、mounted
  - beforeUpdate、updated
  - beforeDestroy、destroyed
- Vue3
  - setup
  - onBeforeMount、onMounted
  - onBeforeUpdate、onUpdated
  - onBeforeUnmount、onUnmounted

**五、获取组件实例方法不同**

- Vue2 ref 属性，通过 this.$refs 获取到实例
- Vue3 中不能直接使用 $refs ，需要用 ref 定义一个响应式数据并设置 null，且组件要设置 ref 的属性
- Vue3 获取子组件实例后，父组件只能使用子组件暴露 defineExpose 出来的方法或变量

**六、组件传值（通信）**

- Vue2 父组件 v-bind，子组件 props 拿到
- Vue3 setup(props, context)来接收；用 ts + setup，还需使用 defineProps 和 defineEmits 来定义 props 和 emit

七、其他（关联不大都放一起说了）

- Vue3 可以没有根节点了， `<> </>`
- 去掉了$Bus，推荐使用 `provide` 和 `inject`
- Vue3 Diff 算法优化：vue2 是全量 Diff，vue3 新增静态标记
- 新增 watchEffect，自动搜集依赖
- 新增 Teleport 组件：可以把组件内的一部分传到该组件的 DOM 结构外层的位置去
- 新增 Suspense 组件：在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态

相对优势：

Vue2 面对的问题：

- 代码架构：整体架构比较粗糙
- 性能优化空间：Vue2 编译器能力有限
- API 在大型项目中的可维护性：option API 在大型项目中维护遇到瓶颈
- 浏览器版本的限制：支持 IE9，不可能一直支持那么旧的浏览器

Vue3 比较成功的决定：

- 拥抱 TypeScript，Vue 本身的可维护性也大大提升
- 坚持 Composition API。`setup` 大大提升开发体验，提升了可重构性和可维护性
- 逻辑复用：Composition API 带来了 VueUse 等的工具库
- Vite，快快快! esbuild，esmodule，越来越完善
- Vue3 新文档对现有内容进行了大量的重写和代码调整
- Volar：大大提升 Vue SFC 的 TypeScript 支持
:::

## Proxy 只代理对象第一层，Vue3 如何处理

::: details
判断当前 `Reflect.get` 的返回值是否为 Object，如果是则再通过 `reactive` 方法做代理，这样就实现了深度观测。
:::

## 监测数组的时候可能触发多次 get/set，那么如何防止触发多次

::: details
我们可以**判断 key 是否为当前被代理对象 target 自身属性**，也可以**判断旧值与新值是否相等**，只有满足以上两个条件之一时，才有可能执行 trigger
:::

## 如何看待 Composition API

::: details

- Vue3 新引入组件编写方式，允许以函数形式编码与实践
- 提供模块化（按需加载）、类型推断等功能
- 更好组织代码，逻辑复用，提高可维护性和可扩展性
  :::


## 参考

- [Vue2 和 Vue3 的差异](https://mp.weixin.qq.com/s/21mt8zBjOqdhKfRO8SPLHg)
