// 二分查找主要解决在[一堆有序数中找出指定数]这类问题，是一种分治思想
// 1. 数组中排在中间的数A，与要找的数字相比较
// 2. 因数组有序，所以 a) A较大则说明要找的数应从前半部分找
// b) A较小则说明应该从后半部分找
// 3. 这样不断查找缩小量级，直到找完数组为止
function find(target, arr) {
  let i = 0
  let j = arr[i].length - 1
  while (i < arr.length && j >= 0) {
    if (arr[i][j] < target) {
      i++
    } else if (arr[i][j] > target) {
      j--
    } else {
      return true
    }
  }
  return false
}
