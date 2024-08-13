// 使用Array（n）创建所需长度的数组，fill(v)以填充所需的值，可以忽略value使用默认值0。
const initArray = (n, value = 0) => Array(n).fill(value)

// initializeArray(5, 2) -> [2,2,2,2,2]
console.log(`initializeArray(5, 2) -->`, initArray(4, 4))
