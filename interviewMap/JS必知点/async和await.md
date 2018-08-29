一个函数如果加上async，那么该函数就会返回一个Promise

```js
async function test() {
  return '1'
}
console.log(test()) // -> Promise {<resolved>: "1"}
```

可以把async看成将函数返回值使用Promise.resolve()包裹了下，await 只能在async函数中使用

```js
function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('finish')
      resolve('sleep')
    }, 2000)
  })
}

async function test() {
  let value = await sleep()
  console.log(value)
}

test()
```
