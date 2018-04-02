// 将Array.filter 用于仅包含唯一值的数组
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i))

console.log(filterNonUnique([1,2,2,3,4,4,5]))