//* 使用递归，使用reduce 来获取所有不是数组的元素，
//* flatten每个元素都是数组
const deepFlatten = arr => (
  arr.reduce((a, v) => a.concat(Array.isArray(v) ? deepFlatten(v) : v), [])  
)

const arr = [1,[2],[[3],4],5, [1, [2, [3,4,5]]]]

const newArr = Array.from(new Set(deepFlatten(arr)))
console.log(newArr)