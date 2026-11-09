# 工具

## Directive - 指令

### 自定义指令有哪些生命周期

### Vue2 -> directive

::: details Vue2 自定义指令的生命周期，有 5 个事件钩子：

- `bind` 只调用一次，指令`第一次绑定到元素时`调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
- `inserted` 被绑定元素`插入父节点`时调用（父节点存在即可调用，不必存在于 document 中）。
- `update` 被绑定元素所在的`模板更新时`调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。
- `componentUpdated` 被绑定元素所在模板`完成一次更新周期`时调用。
- `unbind` 只调用一次， `指令与元素解绑时`调用。

钩子函数的参数 (包括 el，binding，vnode，oldVnode)：

1. el: 指令所绑定的元素，可以用来直接操作 DOM 。
2. binding: 一个对象，包含以下属性：name: 指令名、value: 指令的绑定值、oldValue: 指令绑定的前一个值、expression: 绑定值的字符串形式、arg: 传给指令的参数、modifiers: 一个包含修饰符的对象。
3. vnode: Vue 编译生成的虚拟节点。
4. oldVnode: 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
   :::

### Vue3 -> directive

::: details Vue3 自定义指令的生命周期，有 7 个事件钩子

- `created` 在绑定元素的 `attribute 前`或`事件监听器应用前`调用
- `beforeMount` 在元素`被插入到 DOM 前`调用
- `mounted` 在绑定元素的父组件及他自己的所有子节点都`挂载完成后`调用
- `beforeUpdate` 绑定元素的父组件更新前调用
- `updated` 在绑定元素的父组件及他自己的所有子节点都更新后调用
- `beforeUnmount` 绑定元素的父组件卸载前调用
- `unmounted` 绑定元素的父组件卸载后调用
  :::

## Vue 修饰符

### 用过 .sync 修饰符吗

::: details 是什么，怎么用

- 父组件 my-prop-name.sync 子组件 @update:my-prop-name 的模式来替代事件触发，实现父子组件间的双向绑定
- 一个组件可以多个属性用 .sync 修饰符，可以同时双向绑定多个“prop”
- .sync 针对更多的是各种各样的状态，是状态的互相传递，是 status
  :::

### 事件修饰符

::: details
|修饰符|说明|
|-|-|
|`.stop`|阻止冒泡。|
|`.prevent`|阻止默认事件。|
|`.capture`|使用事件捕获模式。|
|`.self`|只在当前元素本身触发。|
|`.once`|只触发一次。|
|`.passive`|默认行为将会立即触发|
:::

### 按键修饰符

::: details
|修饰符|说明|
|-|-|
|`.left`|左键|
|`.right`|右键|
|`.middle`|滚轮|
|`.enter`|回车|
|`.tab`|制表键|
|`.delete`|捕获| “删除” 和 “退格” 键
|`.esc`|返回|
|`.space`|空格|
|`.up`|上|
|`.down`|下|
|`.ctrl`|ctrl| 键
|`.alt`|alt| 键
|`.shift`|shift| 键
|`.meta`|meta| 键
:::

### 表单修饰符 (v-model)

::: details
|修饰符|说明|
|-|-|
|`.lazy`| 通过这个修饰符，转变为在 change 事件再同步|
|`.number`| 自动将用户的输入值转化为数值类型|
| `.trim`| 自动过滤用户输入的首尾空格|
:::

## 其他

### vue3常用工具函数

| 方法名         | 说明                                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| `isRef()`      | 检查某个值是否为 ref                                                                                       |
| `unref()`      | 如果参数是 ref，则返回内部值，否则返回参数本身                                                             |
| `toRef()`      | 可以将值、refs 或 getters 规范化为 refs；也可以基于响应式对象上的一个属性，创建一个对应的 ref              |
| `toValue()`    | 将值、refs 或 getters 规范化为值。这与 unref() 类似                                                        |
| `toRefs()`     | 将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。解构不会丢失响应性 |
| `isProxy()`    | 检查一个对象是否是由 reactive()、readonly()、shallowReactive() 或 shallowReadonly() 创建的代理             |
| `isReactive()` | 检查一个对象是否是由 reactive() 或 shallowReactive() 创建的代理                                            |
| `isReadonly()` | 检查传入的值是否为只读对象。只读对象的属性可以更改，但他们不能通过传入的对象直接赋值。                     |

### setup 中如何获得组件实例

::: details
在 setup 函数中，你可以使用 `getCurrentInstance()` 方法来获取组件实例。getCurrentInstance() 方法返回一个对象，该对象包含了组件实例以及其他相关信息。

> 需要注意的是，getCurrentInstance() 方法只能在 setup 函数中使用，而不能在组件的生命周期方法（如 created、mounted 等方法）中使用。另外，需要注意的是，如果在 setup 函数返回之前访问了 instance 对象，那么它可能是 undefined ，因此我们需要对其进行处理。

:::
