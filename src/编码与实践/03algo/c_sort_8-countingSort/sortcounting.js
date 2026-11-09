function countingSort(array) {
  let length = array.length
  let B = []
  let C = []
  let min = array[0]
  let max = array[0]

  for (let i = 0; i < length; i++) {
    min = min <= array[i] ? min : array[i]
    max = max >= array[i] ? max : array[i]
    C[array[i]] = C[array[i]] ? C[array[i]] + 1 : 1
  }

  for (let j = min; j < max; j++) {
    C[j + 1] = (C[j + 1] || 0) + (C[j] || 0)
  }

  for (let k = length - 1; k >= 0; k--) {
    B[C[array[k]] - 1] = array[k]
    C[array[k]]--
  }

  return B
}

console.time('🚢 ~ 计数排序耗时 ~ ➡️:')
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.log(countingSort(arr)) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
console.timeEnd('🚢 ~ 计数排序耗时 ~ ➡️:')
