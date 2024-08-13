// 使用Array.reduce（）来创建和组合键值对。
const objFromPairs = (arr) => arr.reduce((acc, val) => ((acc[val[0]] = val[1]), acc), {})
// objFromPairs([['a',1],['b',2]]) -> {a: 1, b: 2}
console.log(
  `objFromPairs([['a',1],['b',2]]) -->`,
  objFromPairs([
    ['a', 1],
    ['b', 2],
  ])
)
