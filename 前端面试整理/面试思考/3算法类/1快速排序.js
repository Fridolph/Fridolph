// const quickSort = arr => {
//   if (arr.length <= 1) return arr

//   // 基准数的索引位置
//   let pointIdx = Math.floor(arr.length / 2)
//   // 基准值
//   let point = arr.splice(pointIdx, 1)[0]
//   let left = []
//   let right = []

//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] < point) {
//       left.push(arr[i])
//     } else {
//       right.push(arr[i])
//     }
//   }
//   // 连接左数组，基准数和右数组构成的数组
//   return quickSort(left).concat([point], quickSort(right))
// }

const quickSort = arr => {
  if (arr.length <= 1) return arr

  let pointIdx = Math.floor(arr.length / 2)
  let point = arr.splice(pointIdx, 1)[0]
  let left = []
  let right = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < point) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([point], quickSort(right))
}

console.log(quickSort([4,8,9,21,10,44,2]))