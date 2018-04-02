//* 使用递归，若提供的参数args数量足够，则调用传递函数f
//* 否则返回一个curried函数f
// const curry = (fn, arity = fn.length, ...args) => {
//   return arity <= args.length 
//     ? fn(...args) 
//     : curry.bind(null, fn, arity, ...args)
// }
const curry = (fn, len = fn.length, ...args) => (
  len <= args.length
    ? fn(...args)
    : curry.bind(null, fn, len, ...args)
)

const add = (a, ...b) => a + b.reduce((acc, val) => acc + val, 0)

console.log(curry(add, 4)(10)(20)(30)(40))