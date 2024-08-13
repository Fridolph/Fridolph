// 使用reduce（）将每个值添加到累加器，初始值为0，总和除以数组长度。
const average = (arr) => arr.reduce((acc, val) => acc + val, 0) / arr.length

// average([1,2,3]) -> 2
console.log(average([1, 2, 3]))
