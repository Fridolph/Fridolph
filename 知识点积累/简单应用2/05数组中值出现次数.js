//* 每次遇到数组中的特定值时，使用reduce来递增计数器
// const countArr = (arr, value) => arr.reduce((acc, val) => val === value ? acc + 1 : acc + 0, 0)

const countArr = (arr, value) => arr.reduce((acc, val) => val === value ? acc + 1 : acc + 0, 0)
console.log(countArr([1,1,2,1,2,3], 1))