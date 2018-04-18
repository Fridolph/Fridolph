// const selectSort = arr => {
//   // 处理边界条件
//   let len = arr.length
//   let minIdx
//   let temp

//   for (let i = 0; i < len - 1; i++) {
//     minIdx = i
//     for (let j = i + 1; j < len; j++) {
//       // 寻找最小的数
//       if (arr[j] < arr[minIdx]) {
//         // 将最小数的索引保存
//         minIdx = j
//       }
//     }
//     temp = arr[i]
//     arr[i] = arr[minIdx]
//     arr[minIdx] = temp
//   }
//   return arr
// }

const selectSort = arr => {
  // 处理边界条件
  let minIdx
  for (let i = 0; i < arr.length - 1; i++) {
    minIdx = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        minIdx = j
      }
    }
    temp = arr[i]
    arr[i] = arr[minIdx]
    arr[minIdx] = temp
  }

  return arr
}

console.log(selectSort([4,8,9,21,32,22,10,44,2]))