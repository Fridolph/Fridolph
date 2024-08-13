// 使用Math.min（）与spread运算符（…）结合得到数组中的最小值。
const arrayMin = (arr) => Math.min(...arr)

// arrayMin([10, 1, 5]) -> 1
console.log(`arrayMin([10, 1, 5]) -->`, arrayMin([10, 1, 5]))
