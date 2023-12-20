# Promise 基本使用和原理

## 基本语法回顾

```js
function loadImg(src) {
  const promise = new Promise((resolve, reject) => {
    var img = document.createElement('img')
    img.onload = () => resolve(img)
    img.onerror = err => reject(err)
    img.src = src
  })
  return promise
}
var result = loadImg('xxx')
result
  .then(
    img => {
      conosole.log(img.width)
    },
    err => console.log('failded')
  )
  .then(img => {
    console.log(img.height)
  })
```

## 异常捕获

```js
// 规定then只接受一个参数，最后统一用catch捕获异常
result
  .then(img => {
    console.log(img.width)
  })
  .then(img => {
    console.log(img.height)
  })
  .catch(err => { // 统一用catch作错误处理
    console.log(err)
  })
```

## 多个串联

```js
var result1 = loadImg('xxx-1')
var result2 = loadImg('xxx-2')
// 链式操作
result1.then(img => {
  console.log('图1加载完毕')
  return result2
}).then(img => {
  console.log('图2加载完毕')
}).catch(err => {
  console.log(err)
})
```

## Promise.all 和 Promise.race

Promise.all接受一个promise对象组成的数组
待全部完成之后，统一执行.then回调

```js
Promise.all([result1, result2]).then(datas => {
  console.log(datas[0])
  console.log(datas[1])
})
```

Promise.race接受一个包含多个promise对象的数组
只要有一个完成，就立即执行.then回调

```js
Promise.race([result1, result2]).then(data => {
  console.log(data)
})
```

## Promise 标准

* 关于标准的闲谈

任何技术推广使用都需要一套标准来支撑
如 html js css http等，无规矩不成方圆
任何不符合标准的东西，终将会被用户抛弃
不要挑战标准，不要自造标准

* 状态变化

三种状态：pending、fulfilled、rejected
初始状态是pending
pending变为fulfilled，或者pending变为reject
状态变化不可逆

* then

Promise实例必须实现then方法
then()必须可以接受两个参数作为参数
then()返回的必须是一个Promise实例
