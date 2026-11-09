// 原地排序；输入为有限数值数组。
export function bubbleSort(array) {
  for (let end = array.length - 1; end > 0; end--) {
    let swapped = false
    for (let i = 0; i < end; i++) {
      if (array[i] > array[i + 1]) {
        ;[array[i], array[i + 1]] = [array[i + 1], array[i]]
        swapped = true
      }
    }
    if (!swapped) break
  }
  return array
}
