https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

---

语法
var new_array = arr.filter(callback[, thisArg])

参数

callback
用来测试数组的每个元素的函数。调用时使用参数 (element, index, array)。
返回true表示保留该元素（通过测试），false则不保留。
thisArg
可选。执行 callback 时的用于 this 的值。
返回值
      一个新的通过测试的元素的集合的数组

ES6

    let [...spread]= [12, 5, 8, 130, 44];

等同于：`let spread = 浅克隆([12, 5, 8, 130, 44])`

描述

filter为数组中的每个元素调用一次callback函数，并利用所有使得callback返回true或`等价true的值`的元素创建一个新数组。callback只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被复制到索引不会被调用。那些没有通过callback测试的元素会被跳过，不会被包含在新数组中。

callback 被调用时传入三个参数

* 元素的值
* 元素的索引
* 被遍历的数组

如果为filter提供一个`thisArg`参数，则它会被作为callback被调用时的this值。否则，callback的this值在非严格模式下将会是全局对象

filter不会改变原数组，它返回过滤后的新数组

filter遍历的元素范围在第一次调用callback之前就已经确定了。在调用filter之后被添加到数组中的元素不会被filter遍历到。如果已经存在的元素被改变了，则他们传入callback的值是filter遍历到它们的那一刻的值。被删除或从来未被赋值的元素不会被遍历到。

---

筛选排除掉所有的小值

```js
function isBigEnough(element) {
  return element >= 10
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough)
// filtered is [12, 130, 44]
```
