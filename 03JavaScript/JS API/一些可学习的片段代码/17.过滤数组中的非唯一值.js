// 将Array.filter（）用于仅包含唯一值的数组。
const filterNonUnique = (arr) => arr.filter((i) => arr.indexOf(i) === arr.lastIndexOf(i))
// filterNonUnique([1,2,2,3,4,4,5]) -> [1,3,5]
console.log(`filterNonUnique([1,2,2,3,4,4,5]) -->`, filterNonUnique([1, 2, 2, 3, 4, 4, 5]))
