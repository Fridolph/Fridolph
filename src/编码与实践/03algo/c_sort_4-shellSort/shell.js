// 原地排序；divide 至少为2，保证步长严格缩小并最终到1。
export function shellSort(array, divide = 5) {
  if (!Number.isSafeInteger(divide) || divide < 2) {
    throw new RangeError('步长缩减因子必须是至少为2的安全整数')
  }
  let gap = 1
  while (gap < array.length / divide) gap = gap * divide + 1
  for (; gap > 0; gap = Math.floor(gap / divide)) {
    for (let i = gap; i < array.length; i++) {
      const key = array[i]
      let j = i - gap
      while (j >= 0 && array[j] > key) {
        array[j + gap] = array[j]
        j -= gap
      }
      array[j + gap] = key
    }
  }
  return array
}
