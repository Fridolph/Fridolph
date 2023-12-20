// pipeAsyncFunctions
// 为异步函数执行从左到右的函数组合。使用带有扩展运算符（...）的Array.prototype.reduce（）来使用Promise.then（）执行从左到右的函数组合。这些函数可以返回以下组合：简单值，Promise，或者它们可以定义为通过await返回的异步值。所有功能必须是一元的。
const pipeAsyncFunctions = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg))

const sum = pipeAsyncFunctions(
  x => x + 1,
  x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
  x => x + 3,
  async x => (await x) + 4
);
(async () => {
  console.log(await sum(5)); // 15 (after one second)
})();

// pipeFunctions
// 执行从左到右的功能组合。使用带有扩展运算符（...）的Array.prototype.reduce（）来执行从左到右的函数组合。第一个（最左边）函数可以接受一个或多个参数;其余的功能必须是一元的。
const pipeFunctions = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)))
// example
const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5 = pipeFunctions(multiply, add5);
multiplyAndAdd5(5, 2); // 15
