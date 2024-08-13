// 每次遇到数组中的特定值时，使用reduce（）来递增计数器。
const countOccurrences = (arr, value) =>
  arr.reduce((acc, val) => (val === value ? acc + 1 : acc + 0), 0)
// countOccurrences([1,1,2,1,2,3], 1) -> 3
console.log(countOccurrences([1, 1, 2, 1, 2, 3], 1))
