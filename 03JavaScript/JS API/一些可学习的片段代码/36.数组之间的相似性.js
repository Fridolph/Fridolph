// 使用filter（）移除不是values的一部分值，使用includes（）确定。
const similariry = (arr, values) => arr.filter((v) => values.includes(v))
// similariry([1,2,3], [1,2,4]) -> [1,2]
console.log(`similariry([1,2,3], [1,2,4]) -->`, similariry([1, 2, 3], [1, 2, 4]))
