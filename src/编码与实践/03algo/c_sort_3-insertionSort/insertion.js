// 原地排序；移动大于 key 的元素，保持相等元素的原顺序。
export function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    const key = array[i]
    let j = i - 1
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j]
      j--
    }
    array[j + 1] = key
  }
  return array
}
