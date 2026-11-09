# Web API

## 遍历

### for in 和 for of 的区别

::: details

- 遍历 Map/Set/generator 数组/字符串：用 `for of（可迭代）`，得到 value
- 遍历对象/数组/字符串：用 `for in（可枚举数据）`，得到 key
- for in 会`遍历对象的整个原型链`，性能非常差不推荐使用，而 for of 只`遍历当前对象不会遍历原型链`；
- for of 遍历获取的是对象的`键值`，for in 获取的是对象的`键名`；

> 总结： for in 循环主要是为了遍历对象而生，不适用于遍历数组；for of 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象。

:::

## Array

### forEach 和 map 的区别

::: details

1. `forEach() 没有返回值`，而 `map() 有返回值`。
2. forEach 遍历通常都是直接引入当前遍历数组的内存地址，`会改变原数组`，生成的数组的值发生变化，当前遍历的数组对应的值也会发生变化。类似于浅拷贝
3. map 遍历的后的数组通常都是`生成一个新的数组`，新的数组的值发生变化，当前遍历的数组值不会变化。 地址和值都改变 类似于深拷贝。
4. 总的来说 map 的速度大于 forEach，性能上来说 for > forEach > map

:::

## DOM

### DocumentFragment

是 Web API 中的一种节点类型，它是一个轻量级的文档对象，可以用来存储临时节点，而不会直接影响到 DOM 树的结构。

::: details

使用场景：

- 批量操作：当个要添加多个节点到 DOM 树时，使用 DocumentFragment 可以将这些节点预先对方在一个轻量级对象中，一次性添加，减少 DOM 操作
- 离屏操作：如需创建复杂 DOM 结构，可通过 DocumentFragment 在不触发页面重排和重绘的情况下进行
- 内容填充：在填充 DOM 元素内容之前，可以先创建一个 DocumentFragment 完成所有节点的添加和排序，然后把它添加到 DOM 树中
- 避免内存泄漏

```js
// 创建
const fragment = document.createDocumentFragment()
// 创建多个节点或元素
const div = document.createElement('div')
const p = document.createElement('p')
// 将节点添加到DocumentFragment中
fragment.appendChild(div)
fragment.appendChild(p)
// 一次性将DocumentFragment添加到DOM树中
document.body.appendChild(fragment)
```

:::

DocumentFragment 提供了一个高效的方式去操作 DOM 而不影响页面的渲染性能，在很多需要进行批量 DOM 操作的场合很有用。

## BOM

### requestIdleCallback

requestIdleCallback 是一个 Web API，它允许开发者请求浏览器在主线程空闲时执行一些低优先级的后台任务。该方法可提高用户的响应性和页面的整体性能。

什么时候使用？

适合不直接关联用户交互及响应的人物，这些人物可以延后执行不会影响用户体验，如：

- 清理工作：如标记的 DOM 节点删除，数据的本场存储同步等
- 非关键的解析：如解析大量数据
- 状态更新：如发送不紧急的状态变更

如何使用？

```js
// myNonCriticalFucntion 浏览器空闲时执行的函数
// timeout 可选，回调执行时间的上线，若超市浏览器在下次空闲时执行
requestIdleCallback(myNonCriticalFucntion, { timeout: 5000 })
```
