// 给定一个键和一组参数，在给定上下文时调用它们。
// 主要用于组合, 使用闭包来调用存储的参数的存储键。

const call = (key, ...args) => context => context[key](...args)

// example
Promise.resolve([1,2,3])
  .then(call('map', x => 2 * x))
  .then(console.log)

const map = call.bind(null, 'map')
Promise.resolve([1,2,3])
  .then(map(x => 2 * x))
  .then(console.log)
