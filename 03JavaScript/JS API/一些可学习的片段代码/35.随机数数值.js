// 使用Array.map（）和Math.random（）创建一个随机值的数组。使用Array.sort（）根据随机值对原始数组的元素进行排序。
const shuffle = (arr) => {
  let r = arr.map(Math.random)
  return arr.sort((a, b) => r[a] - r[b])
}

// shuffle([1, 2, 3] -> [2, 1, 3])
