https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find

find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

如果你需要找到一个元素的位置或者一个元素是否存在于数组中，使用Array.prototype.indexOf() 或 Array.prototype.includes()。

---

语法
arr.find(callback[, thisArg])

参数
callback 在数组每一项上执行的函数，接收 3 个参数：
element 当前遍历到的元素。
index 当前遍历到的索引。
array 数组本身。
thisArg 可选，指定 callback 的 this 参数。

返回值
当某个元素通过 callback 的测试时，返回数组中的一个值，否则返回 undefined

描述

find方法对数组中的每一项元素执行一次callback函数，直至有一个callback返回true，当找到这样一个元素后，该方法会立即返回这个元素的值，否则返回undefined。注意callback函数会为数组中的每个索引调用即从0到length - 1，而不仅仅是那些被赋值的索引，这意味着对于稀疏数组来说，该方法的效率要低于那些只遍历有值的索引的方法

callback函数带有三个参数：当前元素值、当前元素索引以及数组本身

如果提供了thisArg参数，那么它将作为每次callback函数执行时的上下文对象，否则上下文对象为undefined

find方法不会改变数组

在第一次调用callback函数时会确定元素的索引范围，因此find方法开始执行之后添加到数组的新元素不会被callback函数访问到。如果数组中一个尚未被callback函数访问到的元素的值被callback函数所改变，那么当callback函数访问到它时，它的值将是根据它的数组中的索引所访问到的当前值。被删除的元素仍旧会被访问到。

---

用对象的属性查找数组里的对象

```js
var inventory = [
  {name: 'apples', quantity: 2},
  {name: 'bananas', quantity: 0},
  {name: 'cherries', quantity: 5}
]

inventory.find(fruit => fruit.name === 'cherries')
```
