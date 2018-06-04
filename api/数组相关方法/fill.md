https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill

fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。

---

语法
arr.fill(value[, start[, end]])
参数
value
用来填充数组元素的值。
start 可选
起始索引，默认值为0。
end 可选
终止索引，默认值为 this.length。
返回值
修改后的数组。

```js
var array1 = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]

// fill with 5 from position 1
console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]

console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]
```
