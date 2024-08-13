// 使用递归。如果提供的参数（args）数量足够，则调用传递函数f，否则返回一个curried函数f。

const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args)

// curry(Math.pow)(2)(10) -> 1024
console.log(curry(Math.pow)(2)(10))
// curry(Math.min, 3)(10)(50)(2) -> 2
console.log(` -->`, curry(Math.min, 3)(10)(50)(2))
