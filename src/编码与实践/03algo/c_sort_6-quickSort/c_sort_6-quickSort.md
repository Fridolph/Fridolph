# 快速排序 Quick Sort

具体算法描述如下：[快速排序](../../../概念与原理/03algo/s_sort_6-quickSort.md)

1. 从数列中挑出一个元素，称为 "基准"（pivot）；
2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

## JavaScript 代码实现

::: details 代码实现
::: code-group

```js
function quickSort(array) {
  if (array.length <= 1) return array
  let pivotIndex = Math.floor(array.length / 2)
  let pivot = array.splice(pivotIndex, 1)[0]
  let left = []
  let right = []
  for (let i = 0; i < array.length; i++) {
    if (array[i] < pivot) {
      left.push(array[i])
    } else {
      right.push(array[i])
    }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}
```

:::

```js
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.time('🚢 ~ 快速排序耗时 ~ ➡️:')
let ret = quickSort(arr) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
console.log('ret:\n', ret)
console.timeEnd('🚢 ~ 快速排序耗时 ~ ➡️:')
```

## 参考

- [十大经典排序算法总结（JavaScript 描述）](https://juejin.cn/post/6844903444365443080)
