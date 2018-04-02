// 使用Array.reduce 来创建和组合键值对
const objectFromPairs = arr => arr.reduce((a, v) => ((a[v[0]] = v[1]), a), {})

console.log(objectFromPairs([['a', 1], ['b', 2]]))
