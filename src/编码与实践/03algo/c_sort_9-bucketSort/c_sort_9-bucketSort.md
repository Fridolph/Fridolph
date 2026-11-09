# 选择排序 Selection Sort

具体算法描述如下：[桶排序](../../../概念与原理/03algo/s_sort_9-bucketSort.md)

1. 设置一个定量的数组当作空桶；
2. 遍历输入数据，并且把数据一个一个放到对应的桶里去；
3. 对每个不是空的桶进行排序；
4. 从不是空的桶里把排好序的数据拼接起来。

## JavaScript 代码实现

::: details 代码实现
::: code-group

```js
function bucketSort(array, num) {
  if (array.length <= 1) return array
  let length = array.length
  let buckets = []
  let result = []
  let min = array[0]
  let max = array[0]
  let regexp = '/^[1-9]+[0-9]*$/'
  let n = 0
  let space
  num = num || (num > 1 && regexp.test(num) ? num : 10)

  for (let i = 0; i < length; i++) {
    min = min <= array[i] ? min : array[i]
    max = max >= array[i] ? max : array[i]
  }
  space = (max - min + 1) / num
  for (let j = 0; j < length; j++) {
    let index = Math.floor((array[j] - min) / space)
    // 非空桶，插入排序
    if (buckets[index]) {
      let k = buckets[index].length - 1
      while (k >= 0 && buckets[index][k] > array[j]) {
        buckets[index][k + 1] = buckets[index][k]
        k--
      }
      buckets[index][k + 1] = array[j]
    }
    // 空桶，初始化
    else {
      buckets[index] = []
      buckets[index].push(array[j])
    }
  }

  while (n < num) {
    result = result.concat(buckets[n])
    n++
  }
  return result
}
```

:::

```js
console.time('🚢 ~ 桶排序耗时 ~ ➡️:')
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.log(bucketSort(arr, 4)) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
console.timeEnd('🚢 ~ 桶排序耗时 ~ ➡️:')
```

## 参考

- [十大经典排序算法总结（JavaScript 描述）](https://juejin.cn/post/6844903444365443080)
- [算法通关手册 - 桶排序](https://algo.itcharge.cn/01.Array/02.Array-Sort/09.Array-Bucket-Sort/)
