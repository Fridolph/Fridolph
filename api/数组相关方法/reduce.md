https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

reduce() 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。

```js
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```

语法
arr.reduce(callback[, initialValue])

参数

callback 执行数组中每个值的函数，包含四个参数：

* accumulator 累加器累加回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（如下所示）
* currentValue 数组中正在处理的元素
* currentIndex 可选, 数组中正在处理的当前元素的索引。 如果提供了* initialValue，则索引号为0，否则为索引为1。
* array 调用reduce的数组
* initialValue 可选 用作第一个调用 callback的第一个参数的值。如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

返回值
函数累计处理的结果

描述

reduce为数组中的每一元素依次执行callback函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：

* accumulator
* crrentValue
* currentIndex
* array

回调函数第一次执行时，accumulator 和currentValue的取值有两种情况：调用reduce时提供initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；没有提供 initialValue，accumulator取数组中的第一个值，currentValue取数组中的第二个值。

> 如果没有提供initialValue，reduce会从索引1的地方开始执行callback方法，跳过第一个索引。如果提供initialValue，从索引0开始

---


求数组的和

```js
var sum = [0,1,2,3,4]
sum.reduce((acc, cur) => acc + cur) // 10
```

将二维数组转化为一维

```js
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
  (acc, cur) => acc.concat(cur),
  []
)
```

计算数组中每个元素出现的次数

```js
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice', 'Alice', 'fridolph', 'Tiff']
var countedNames = names.reduce((all, name) => {
  if (name in all) {
    all[name]++
  } else {
    all[name] = 1
  }
  return all
}, {})
```

使用扩展运算符和initialValue绑定包含在对象数组中的数组

```js
var friends = [{
  name: 'Anna',
  books: ['Bible', 'Harry Potter'],
  age: 21
}, {
  name: 'Bob',
  books: ['War and peace', 'Romeo and Juliet'],
  age: 26
}, {
  name: 'Alice',
  books: ['The Lord of the Rings', 'The Shining'],
  age: 18
}]

var allbooks = friends.reduce((prev, cur) => {
  return [...prev, ...cur.books]
}, ['Alphabet'])

```

数组去重

```js
let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4]
let result = arr.sort().reduce((init, cur) => {
  if (init.length === 0 || init[init.length - 1] !== cur) {
    init.push(cur)
  }
  return init
}, [])
```
