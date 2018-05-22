// 1. 二维数组
const arr = [[1, 2], 3]

// [].concat.apply([], arr)
// 二维数组的es6版本
console.log([].concat(...arr))

// 2. 多维数组
const arr1 = [[1, 2], 3, [4, 3, [8, 9, [10, [11, [12, [13, [14, [15, [16, [17, [18]]]]]]]]]]]]

const flatten = arr => arr.reduce((a, b) => {
  if (Array.isArray(b)) {
    return a.concat(flatten(b))
  }
  return a.concat(b)
}, [])

const newArr = flatten(arr1)
console.log(newArr)


// 改版
const flatten2 = arr => {
  return Array.isArray(arr)
    ? [].concat(...arr.map(flatten2))
    : arr
}

const newArr2 = flatten(arr1)
console.log(newArr2)
