const co = require('co')
const fetch = require('node-fetch')

co(function *() {
  const res = yield fetch('https://api.douban.com/v2/movie/1291843')
  const movie = yield res.json()
  const summary = movie.summary
  console.log('summary', summary)
})

/** 
 ** 在内部先拿到一个迭代器, 然后调用迭代器的next()，拿到下一个promise
 ** 通过promise.then 继续往下迭代，直到整个迭代完毕
 */

// ?注：不能 yield 字符串，布尔值

// function run(generator) {
//   const iterator = generator()
//   const it = iterator.next()
//   const promise = it.value

//   promise.then(data => {
//     const it2 = iterator.next(data)
//     const promise2 = it2.value

//     promise2.then(data2 => {
//       iterator.next(data2)
//     })
//   })
// }

// run(function *() {
//   const res = yield fetch('https://api.douban.com/v2/movie/1291843')
//   const movie = yield res.json()
//   const summary = movie.summary
//   console.log('summary', summary)
// })