# 堆排序 Heap Sort

具体算法描述如下：[堆排序](../../../概念与原理/03algo/s_sort_7-heapSort.md)

1. 将初始待排序关键字序列(R1,R2....Rn)构建成大顶堆，此堆为初始的无序区；
2. 将堆顶元素 R[1]与最后一个元素 R[n]交换，此时得到新的无序区(R1,R2,......Rn-1)和新的有序区(Rn),且满足 R[1,2...n-1]<=R[n]；
3. 由于交换后新的堆顶 R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,......Rn-1)调整为新堆，然后再次将 R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2....Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为 n-1，则整个排序过程完成。

## JavaScript 代码实现

::: details 代码实现
::: code-group

```js
function heapSort(array) {
  let heapSize = array.length
  let temp
  // 建堆
  for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
    heapify(array, i, heapSize)
  }
  // 堆排序
  for (let j = heapSize - 1; j >= 1; j--) {
    temp = array[0]
    array[0] = array[j]
    array[j] = temp
    heapify(array, 0, --heapSize)
  }
  return array
}

function heapify(array, x, length) {
  let l = 2 * x + 1
  let r = 2 * x + 2
  let largest = x
  let temp
  if (l < length && array[l] > arr[largest]) {
    largest = l
  }
  if (r < length && array[r] > arr[largest]) {
    largest = r
  }
  if (largest != x) {
    temp = arr[x]
    arr[x] = arr[largest]
    arr[largest] = temp
    heapify(array, largest, length)
  }
}
```

:::

```js
console.time('🚢 ~ 堆排序耗时 ~ ➡️:')
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.log(heapSort(arr)) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
console.timeEnd('🚢 ~ 堆排序耗时 ~ ➡️:')
```

## 参考

- [十大经典排序算法总结（JavaScript 描述）](https://juejin.cn/post/6844903444365443080)
