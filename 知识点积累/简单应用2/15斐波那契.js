// 创建一个特定长度的空数组，初始化前两个值 0 和 1
// 使用Array.reduce 向数组中添加值，后面的一个数等于前面两个数组相加之和
// const fibonacci = n => (
//   Array(n)
//     .fill(0)
//     .reduce(
//       (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
//       []
//     )
// )

const fibonacci = n => Array(n).fill(0).reduce((acc,val,index) => {
  console.log('index -> ', index)
  return acc.concat(index > 1 ? acc[index - 2] + acc[index - 1] : index)
}, [])
console.log(fibonacci(10))
