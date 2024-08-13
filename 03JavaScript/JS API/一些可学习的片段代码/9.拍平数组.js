// 使用递归，使用reduce（）来获取所有不是数组的元素，flatten每个元素都是数组。

const deepFlatten = (arr) => {
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? deepFlatten(val) : val), [])
}
// deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]
console.log(`deepFlatten([1,[2],[[3],4],5]) -->`, deepFlatten([1, [2], [[3], 4], 5]))
