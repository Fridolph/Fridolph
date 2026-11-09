// 原地排序；在已排好序的前缀中查找 upperBound。
export function binaryInsertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    const key = array[i]
    let left = 0
    let right = i
    while (left < right) {
      const middle = left + Math.floor((right - left) / 2)
      if (array[middle] > key) right = middle
      else left = middle + 1
    }
    for (let j = i; j > left; j--) array[j] = array[j - 1]
    array[left] = key
  }
  return array
}
