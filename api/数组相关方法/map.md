https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map

map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

语法

    let new_array = arr.map(function callback(currentValue, index, array) {
        // Return element for new_array
    }[, thisArg])

参数

* callback 生成新数组元素的函数，使用三个参数：
* currentValue callback 的第一个参数，数组中正在处理的当前元素。
* index callback 的第二个参数，数组中正在处理的当前元素的索引。
* array callback 的第三个参数，map 方法被调用的数组。
* thisArg 可选的。执行 callback 函数时 使用的this 值。

返回值
一个新数组，每个元素都是回调函数的结果。

描述

map方法会给原数组中的每个元素都按顺序调用一次callback函数。callback每次执行后的返回值组合起来形成一个新数组。callback函数只会在有值的索引上被调用；那些从来没被赋值过或者使用delete删除的索引则不会被调用。

callback函数会被自动传入三个参数：数组元素，元素索引，原数组本身

如果thisArg参数有值，则每次callback函数被调用时，this都会指向thisArg参数上的这个对象。如果忽略了thisArg参数，或者赋值为null或undefined，则this指向全局对象。map不修改调用它的数组本身

使用map方法处理数组时，数组的范围是在callback方法第一次调用前就已经确定了。在map方法执行过程中，原数组中新增加的元素将不会被callback访问到；若已经存在的元素被改变或删除了，则它们的传递到callback的值是map方法遍历到它们的那一时刻的值；而被删除的元素则不会被访问到。

---

求分平方根

```js
var numbers = [1, 4, 9]
var roots = number.map(Math.sqrt)
// roots [1, 2, 3]
```

使用 map 重新格式化数组中的对象

```js
var kvArray = [
  {key: 1, value: 10},
  {key: 2, value: 20},
  {key: 3, value: 30}
]
var reformattedArray = kvArray.map(obj => {
  var rObj = {}
  rObj[obj.key] = obj.value
  return rObj
})
// reformattedArray 数组为： [{1: 10}, {2: 20}, {3: 30}]
```

用一个仅有一个参数的函数来mapping一个数字数组

```js
var numbers = [1, 4, 9]
var doubles = numbers.map(num => num * 2) // [2, 8, 18]
```

---

```js
["1", "2", "3"].map(parseInt);
// 你可能觉的会是[1, 2, 3]
// 但实际的结果是 [1, NaN, NaN]

function returnInt(element) {
  return parseInt(element, 10);
}

['1', '2', '3'].map(returnInt); // [1, 2, 3]
// 意料之中的结果

// 也可以使用简单的箭头函数，结果同上
['1', '2', '3'].map( str => parseInt(str) );

// 一个更简单的方式:
['1', '2', '3'].map(Number); // [1, 2, 3]
// 与`parseInt` 不同，下面的结果会返回浮点数或指数:
['1.1', '2.2e2', '3e300'].map(Number); // [1.1, 220, 3e+300]
```
