https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every

every() 方法测试数组的所有元素是否都通过了指定函数的测试。

语法
arr.every(callback[, thisArg])

参数
callback
用来测试每个元素的函数。
thisArg
执行 callback 时使用的 this 值。

下例检测数组中的所有元素是否都大于 10。

```js
function isBigEnough(element, index, array) {
  return (element >= 10);
}
var passed = [12, 5, 8, 130, 44].every(isBigEnough);
// passed is false
passed = [12, 54, 18, 130, 44].every(isBigEnough);
// passed is true
```
