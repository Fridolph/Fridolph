# ES6

## Set

### 什么是 Set

::: details

Set 是一种叫做集合的数据结构。

- 集合是由一组`无序`且`唯一`(即不能重复)的项组成的，可以想象成集合是一个既没有重复元素，也没有顺序概念的数组
- ES6 提供了新的数据结构 Set。它`类似于数组`，但是成员的值都是唯一的，没有重复的值
- Set 本身是一个构造函数，用来生成 Set 数据结构

:::

### Set 实例的属性和方法

::: details

Set 的属性：

- `size` 返回集合所包含元素的数量

Set 操作方法

- `add(value)` 向集合添加一个新的项
- `delete(value)` 从集合中移除一个值
- `has(value)` 如果值在集合中存在，返回 true,否则 false
- `clear()` 移除集合里所有的项

Set 遍历方法

- `keys()` 返回一个包含集合中所有键的数组
- `values()` 返回一个包含集合中所有值的数组
- `entries()` 返回一个包含集合中所有键值对的数组
- `forEach()` 用于对集合成员执行某种操作，没有返回值

:::

### Set 完整实现

[ES6 - Set 完整实现](../../编码与实践/02js/c_es6_1-set/c_es6_1-set.md)

## Map

### 什么是 Map

::: details

Map 是一种数据结构（它很特别，是一种抽象的数据结构类型），数据一对对进行存储，其中包含键以及映射到该键的值。并且由于键的唯一性，因此不存在重复的键值对。
Map 便是为了快速搜索和查找数据而生的。

:::

### Map 基本操作

::: details

- 访问元素

  .get(key)

- 插入元素

  .set(key, value)

- 删除元素

  .delete(key)

- 获取大小

  .size()

- 元素的迭代

1. 可以通过 for...of 方法遍历

```js
//For map: { 2 => 3, 4 => 5 }
for (const item of map) {
  console.log(item)
  //Array[2,3]
  //Array[4,5]
}
//Or
for (const [key, value] of map) {
  console.log(`key: ${key}, value: ${value}`)
  //key: 2, value: 3
  //key: 4, value: 5
}
```

2. 或者使用其内置的 forEach()方法：

```js
map.forEach((value, key) => {
  console.log(`key: ${key}, value: ${value}`)
})
//key: 2, value: 3
//key: 4, value: 5
```

:::

### Map 和 Object 区别

::: details

- `JSON 支持` JSON 直接支持 Object，但尚未支持 Map。因此，在某些我们必须使用 JSON 的情况下，应将 Object 视为首选
- Map 是一个纯`哈希结构`，而 Object 不是（它拥有自己的内部逻辑）。使用 delete 对 Object 的属性进行删除操作存在很多性能问题。所以，针对于存在`大量增删操作的场景`，使用 `Map 更合适`。
- 不同于 Object，Map 会`保留所有元素的顺序`。Map 结构是在基于可迭代的基础上构建的，所以如果考虑到元素迭代或顺序，使用 Map 更好，它能够确保在所有浏览器中的`迭代性能`
- Map 在`存储大量数据的场景`下表现更好，尤其是在 key 为未知状态，并且所有 key 和所有 value 分别为相同类型的情况下
- 遍历方式不同：
  - Object 迭代的是 key，通过 for in
  - Map 迭代的是 [key, value]，通过 for of

:::

## 参考

- [ES6 的 Set 和 Map 数据结构，由你制造](https://juejin.cn/post/6844903589920374792)——chenhongdong
- [Object 与 Map 的异同及使用场景](https://juejin.cn/post/6844903792094232584)——Enivia
