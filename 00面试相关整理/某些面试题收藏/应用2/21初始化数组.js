// 使用Array(end - start) 创建所需长度的数组
// 使用map来填充分范围中的所需值，可以省略start省略默认值0
// const initializeArrayRange = (end, start = 0) => (
//   Array.apply(null, Array(end - start)).map((v, i) => i + start)
// )

const initializeArrayRange = (end, start = 0) => (
  Array(end).fill(start).map((v, i) => v + i)
)
console.log( initializeArrayRange(5))