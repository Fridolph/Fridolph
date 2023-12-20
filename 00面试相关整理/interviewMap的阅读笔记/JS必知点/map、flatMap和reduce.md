map作用是生成一个新数组，遍历原数组，将每个元素拿出来做一些变换然后append到新的数组中。

```js
[1,2,3].map(v => v + 1)
```

map有三个参数，分别是当前索引元素，索引，原数组

```js
['1', '2', '3'].map(parseInt)
// parseInt('1', 0) -> 1
// parseInt('2', 1) -> NaN
// parseInt('3', 2) -> NaN
```

flatMap和map作用几乎相同，但是对于多维数组来说，会将原数组降维。可以将flatMap看作map + flatten，目前该函数在浏览器中还不支持

```js
[1, [2], 3].flatMap(v => v + 1) // [2, 3, 4]
```

如果想将一个多维数组彻底地降维，可以这样实现

```js
const flattenDeep = arr => Array.isArray(arr)
  ? arr.reduce((a, b) => [...a, ...flattenDeep(b)], [])
  : [arr]
```

reduce作用是数组中的值组合起来，最终得到一个值
