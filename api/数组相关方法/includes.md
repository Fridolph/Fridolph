https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。

    let a = [1, 2, 3];

    a.includes(2);
    // true
    a.includes(4);
    // false

语法
arr.includes(searchElement)
arr.includes(searchElement, fromIndex)
参数
searchElement
需要查找的元素值。
fromIndex 可选
从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0。
返回值
一个 Boolean。

---

fromIndex 大于等于数组长度

如果fromIndex 大于等于数组长度 ，则返回 false 。该数组不会被搜索。

    var arr = ['a', 'b', 'c'];

    arr.includes('c', 3);   //false
    arr.includes('c', 100); // false

计算出的索引小于 0

如果 fromIndex 为负值，计算出的索引将作为开始搜索searchElement的位置。如果计算出的索引小于 0，则整个数组都会被搜索。

```js
// 数组长度是3
// fromIndex 是 -100
// computed index 是 3 + (-100) = -97

var arr = ['a', 'b', 'c'];

arr.includes('a', -100); // true
arr.includes('b', -100); // true
arr.includes('c', -100); // true
```
