// 创建一个特定长度的空数组，初始化前两个值（0和1）。使用Array.reduce（）向数组中添加值，后面的一个数等于前面两个数相加之和（前两个除外）。
const fibonacci = (n) => {
  return Array(n)
    .fill(0)
    .reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), [])
}
// fibonacci(5) -> [0,1,1,2,3]
console.log(`fibonacci(5) -->`, fibonacci(5))
