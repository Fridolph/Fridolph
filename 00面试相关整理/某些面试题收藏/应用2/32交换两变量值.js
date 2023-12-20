// 使用数组结构来交换两个变量的值 
//! node.js环境貌似不支持 [a,b] = [b,a]
let a = 12
let b = 24
console.log('a -> ', a)
console.log('b -> ', b)
console.log('--------交换后--------')
// 方案1 
// let t
// t = a
// a = b
// b = t
// console.log(a)
// console.log(b)

// 方案2
// a = a+b
// b = a-b
// a = a-b
// console.log('a -> ', a)
// console.log('b -> ', b)

// 方案3 
// a ^= b
// b ^= a
// a ^= b
// console.log('a -> ', a)
// console.log('b -> ', b)

// 方案4
// a = [a,b]
// b = a[0]
// a = a[1]
// console.log('a -> ', a)
// console.log('b -> ', b)

// 方案5
a = [b, b = a][0]
console.log('a -> ', a)
console.log('b -> ', b)

// 方案6
// [a, b] = [b, a] 这里要报错，不知道为什么