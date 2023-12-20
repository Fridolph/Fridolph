https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some

some() 方法测试数组中的某些元素是否通过由提供的函数实现的测试。

```js
var array = [1, 2, 3, 4, 5];

var even = function(element) {
  // checks whether an element is even
  return element % 2 === 0;
};

console.log(array.some(even));
// expected output: true
```

语法
arr.some(callback[, thisArg])

参数

callback
用来测试每个元素的函数，接受三个参数：
currentValue
数组中正在处理的元素。
index 可选
数组中正在处理的元素的索引值。
array可选
some()被调用的数组。
thisArg可选
执行 callback 时使用的 this 值。

返回值

如果回调函数返回任何数组元素的truthy值，则返回true；否则为false。

---

测试数组元素的值 - 下面的例子检测在数组中是否有元素大于 10

```js
function isBiggerThan10(element, index, array) {
  return element > 10
}
[2, 5, 8, 1, 4].some(isBiggerThan10);  // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true

// 用箭头函数
[2, 5, 8, 1, 4].some(x => x > 10)
```

判断元素中是否存在某个值

```js
var fruits = ['apple', 'banana', 'mango', 'guava'];

function checkAvailability(arr, val) {
  return arr.some(function(arrVal) {
    return val === arrVal
  })
}
checkAvailability(fruits, 'kela');   // false
checkAvailability(fruits, 'banana'); // true

// 使用箭头函数
function checkAvailability(arr, val) {
  return arr.some(arrVal => val === arrVal);
}
checkAvailability(fruits, 'kela');   // false
checkAvailability(fruits, 'banana'); // true
```

将任意值转换为布尔类型

```js
var TRUTHY_VALUES = [true, 'true', 1];

function getBoolean(value) {
  if (typeof value === 'string') {
    value = value.toLowerCase().trim()
  }
  return TRUTHY_VALUES.some(function(t) {
    return t === value
  })
}

getBoolean(false);   // false
getBoolean('false'); // false
getBoolean(1);       // true
getBoolean('true');  // true
```
