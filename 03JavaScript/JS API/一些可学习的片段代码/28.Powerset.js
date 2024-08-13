// 使用reduce（）与map（）结合来遍历元素，并将其组合成包含所有组合的数组。
const powerset = (arr) =>
  arr.reduce((acc, val) => acc.concat(acc.map((r) => [val].concat(r))), [[]])

// powerset([1,2]) -> [[], [1], [2], [2,1]]
console.log(`powerset([1,2]) -->`, powerset([1, 2]))
