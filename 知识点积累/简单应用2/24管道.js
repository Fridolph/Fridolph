// 使用Array.reduce 通过函数传递值
const pipe = (...fns) => arg => fns.reduce((acc, fn) => fn(acc), arg)