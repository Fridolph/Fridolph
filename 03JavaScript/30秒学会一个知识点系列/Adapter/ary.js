// arg
// 创建一个最多接受n个参数的函数，忽略任何其他参数。
// 使用Array.prototype.slice（0，n）和扩展运算符`...`调用提供的函数fn，最多包含n个参数

const ary = (fn, n) => (...args) => fn(...args.slice(0, n))

// example
const firstTwoMax = ary(Math.max, 2);
[[2, 6, 'a'], [8, 4, 6], [10]].map(x => firstTwoMax(...x)); // [6, 8, 10]
console.log([[2, 6, 'a'], [8, 4, 6], [10]].map(x => firstTwoMax(...x)))
