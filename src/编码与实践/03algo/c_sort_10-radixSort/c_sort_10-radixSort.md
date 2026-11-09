# 基数排序 Radix Sort

具体算法描述如下：[基数排序](../../../概念与原理/03algo/s_sort_10-radixSort.md)

1. 比较相邻的元素。如果第一个比第二个大，就交换它们两个；
   对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
2. 针对所有的元素重复以上的步骤，除了最后一个；
3. 重复步骤 1~3，直到排序完成。

## JavaScript 代码实现

::: details 代码实现
::: code-group

```js
function radixSort(array, maxDigit) {
  let mod = 10
  let dev = 1
  let counter = []
  for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    for (let j = 0; j < array.length; j++) {
      let bucket = parseInt((arr[j] % mod) / dev)
      if (counter[bucket] == null) {
        counter[bucket] = []
      }
      counter[bucket].push(arr[j])
    }
    let pos = 0
    for (let j = 0; j < counter.length; j++) {
      let value = null
      if (counter[j] != null) {
        while ((value = counter[j].shift()) != null) {
          arr[pos++] = value
        }
      }
    }
  }
  return arr
}
```

:::

```js
console.time('🚢 ~ 基数排序耗时 ~ ➡️:')
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.log(radixSort(arr, 2)) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
console.timeEnd('🚢 ~ 基数排序耗时 ~ ➡️:')
```

## 参考

- [十大经典排序算法总结（JavaScript 描述）](https://juejin.cn/post/6844903444365443080)
