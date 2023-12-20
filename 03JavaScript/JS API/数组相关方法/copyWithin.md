https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin

语法
arr.copyWithin(target[, start[, end]])
参数
target
0 为基底的索引，复制序列到该位置。如果是负数，target 将从末尾开始计算。
如果 target 大于等于 arr.length，将会不发生拷贝。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length。
start
0 为基底的索引，开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。
如果 start 被忽略，copyWithin 将会从0开始复制。
end
0 为基底的索引，开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数， end 将从末尾开始计算。
如果 end 被忽略，copyWithin 将会复制到 arr.length。
返回值
改变了的数组。

---

copyWithin() 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，而不修改其大小。

```js
['a', 'b', 'c', 'd'].copyWithin(1,2,3)
// ["a", "c", "c", "d"]

[1, 2, 3, 4, 5].copyWithin(-2);
// [1, 2, 3, 1, 2]

[1, 2, 3, 4, 5].copyWithin(0, 3);
// [4, 5, 3, 4, 5]

[1, 2, 3, 4, 5].copyWithin(0, 3, 4);
// [4, 2, 3, 4, 5]

[1, 2, 3, 4, 5].copyWithin(-2, -3, -1);
// [1, 2, 3, 3, 4]

[].copyWithin.call({length: 5, 3: 1}, 0, 3);
// {0: 1, 3: 1, length: 5}

// ES2015 Typed Arrays are subclasses of Array
var i32a = new Int32Array([1, 2, 3, 4, 5]);

i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// On platforms that are not yet ES2015 compliant:
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```
