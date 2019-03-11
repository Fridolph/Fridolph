// promisify
// 转换异步函数以返回promise。使用currying返回一个函数，返回一个调用原始函数的Promise。使用... rest运算符传入所有参数。在Node 8+中，您可以使用util.promisify
const promisify = fn => (...args) =>  new Promise(
  (resolve, reject) => fn(...args, (err, result) => err ? reject(err) : resolve(result))
)
// example
const delay = promisify((wait, cb) => setTimeout(cb, wait));
delay(2000).then(() => console.log('hello'));

Promise.all([
  delay(2000).then(() => {
    console.log('hello')
    return 2000
  }),
  delay(0).then(() => {
    console.log('world')
    return 0
  }),
  delay(1000).then(() => {
    console.log('end')
    return 1000
  }),
]).then(data => {
  console.log('data', data)
})
// Promise resolves after 2s
