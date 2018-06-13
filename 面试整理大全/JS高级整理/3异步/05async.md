# async / await

* then只是将callback拆分了
* async / await 是最直接的同步写法


```js
const load = async function() {
  const result1 = await loadImg(src1)
  const result2 = await loadImg(src2)
}
load()
```

## 用法

* 使用await，函数必须用async标识
* await后面跟的是一个Promise实例
* 需要babel-polyfill

