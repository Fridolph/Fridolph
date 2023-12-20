// function makeIterator(arr) {
//   let nextIndex = 0

//   // 返回一个迭代器对象
//   return {
//     next: () => {
//       // next() 方法返回的结果对象
//       if (nextIndex < arr.length) {
//         return { value: arr[nextIndex++], done: false }
//       } else {
//         return { done: true }
//       }
//     }
//   }
// }
// const it = makeIterator(['eat', 'sleep', 'make'])
// console.log('首先', it.next().value)
// console.log('其次', it.next().value)
// console.log('然后', it.next().value)
// console.log('最后', it.next().value)

function *makeIterator(arr) {
  for (let i = 0; i <arr.length; i++) {
    yield arr[i]
  }
}
const gen = makeIterator(['eat', 'sleep', 'make'])
console.log('首先', gen.next())
console.log('其次', gen.next())
console.log('然后', gen.next())
console.log('最后', gen.next())