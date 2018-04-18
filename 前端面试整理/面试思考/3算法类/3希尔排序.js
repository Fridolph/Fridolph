const shellSort = arr => {
  let len = arr.length
  let temp
  let gap = 1

  // 定义动态间隔序列
  while(gap < len / 3) {
    gap = gap * 3 + 1
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < len; i++) {
      temp = arr[i]
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = temp
    }
  }
  return arr
}

console.log(shellSort([4,8,9,21,32,22,10,44,2]))