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

/**
 * 维护堆的性质
 * @param array 数组
 * @param x 数组下标
 * @param length 堆大小
 */
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

console.time('🚢 ~ 堆排序耗时 ~ ➡️:')
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.log(heapSort(arr)) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]

console.timeEnd('🚢 ~ 堆排序耗时 ~ ➡️:')
