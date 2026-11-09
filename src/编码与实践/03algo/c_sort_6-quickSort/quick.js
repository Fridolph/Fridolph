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

let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.time('🚢 ~ 快速排序耗时 ~ ➡️:')
let ret = quickSort(arr) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
console.log('ret:\n', ret)
console.timeEnd('🚢 ~ 快速排序耗时 ~ ➡️:')
