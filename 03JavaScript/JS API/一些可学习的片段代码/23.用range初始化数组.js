// 使用Array（end-start）创建所需长度的数组，使用map（）来填充范围中的所需值，可以省略start使用默认值0。
const initializeArrayRange = (end, start = 0) =>
  Array.apply(null, Array(end + 1 - start)).map((v, i) => i + start)
// initializeArrayRange(5) -> [0,1,2,3,4]
console.log(`initializeArrayRange(5, 1) -->`, initializeArrayRange(10))
