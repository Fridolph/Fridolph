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

console.time('🚢 ~ 桶排序耗时 ~ ➡️:')
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.log(bucketSort(arr, 4)) //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
console.timeEnd('🚢 ~ 桶排序耗时 ~ ➡️:')
