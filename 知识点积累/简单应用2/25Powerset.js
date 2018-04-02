// 使用reduce与map结合来遍历元素，并将其组合成包含所有组合的数组
const powerset = arr => (
  arr.reduce((a, v) => a.concat(a.map(item => [v].concat(item))), [[]])
)

console.log(powerset([1,2, 3]))