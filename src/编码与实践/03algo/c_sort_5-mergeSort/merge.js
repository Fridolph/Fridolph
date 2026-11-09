function mergeSort(array) {
  let length = array.length
  if (length < 2) return array

  let middle = Math.floor(length / 2)
  let left = array.slice(0, middle)
  let right = array.slice(middle)

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  let result = []
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  while (left.length) {
    result.push(left.shift())
  }
  while (right.length) {
    result.push(right.shift())
  }
  return result
}

console.time('🚢 ~ 归并排序耗时 ~ ➡️:')
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.log(mergeSort(arr)) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
console.timeEnd('🚢 ~ 归并排序耗时 ~ ➡️:')
