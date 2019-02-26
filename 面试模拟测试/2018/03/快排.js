// 思路
// 随机选择数组中的一个数A，以这个数为基准
// 其他数字跟这个数进行比较，比这个数小的放其左，大的放其右
// 经过循环后，A左边小于A，右边大于A
// 左边和右边的数递归上面的过程
const arr = [1, 10, 2, 20, 3, 30, 4, 40, 5, 50]

function quickSort(arr) {
  if (arr.length <= 1) return arr

  let pivotIndex = Math.floor(arr.length / 2)
  let pivot = arr.splice(pivotIndex, 1)[0]
  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  // 递归
  return quickSort(left).concat([pivot], quickSort(right))
}
