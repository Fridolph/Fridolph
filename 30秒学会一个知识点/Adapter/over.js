// over
// 创建一个函数，该函数使用它接收的参数调用每个提供的函数并返回结果。 使用Array.prototype.map（）和Function.prototype.apply（）将每个函数应用于给定的参数。
const over = (...fns) => (...args) => fns.map(fn => fn.apply(null, args))

// example
const minMax = over(Math.min, Math.max);
minMax(1, 2, 3, 4, 5); // [1,5]

// overArgs
// 创建一个函数，通过转换参数调用提供的函数。使用Array.prototype.map（）将变换应用于args并与spread运算符（...）一起将转换后的参数传递给fn。
const overArgs = (fn, transforms) => (...args) => fn(...args.map((v, i) => transforms[i](v)))

// example
const square = n => n * n;
const double = n => n * 2;
const fn = overArgs((x, y) => [x, y], [square, double]);
fn(9, 3); // [81, 6]
