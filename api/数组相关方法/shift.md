https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift

shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。

let a = [1, 2, 3];
let b = a.shift();

console.log(a);
// [2, 3]

console.log(b);
// 1
返回值
从数组中删除的元素; 如果数组为空则返回undefined 。

语法
arr.shift()
