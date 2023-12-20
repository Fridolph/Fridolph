window.requestAnimationFrame() 方法告诉浏览器你希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。

该方法使用一个回调函数作为参数，该回调会在浏览器重绘之前调用。

## 语法

    window.requestAnimtionFrame(callback)

**参数**

callback 一个指定函数的参数，该函数在下次重绘动画时调用。该回调只有一个参数，指示 window.requestAnimtionFrame() 开始触发回调函数的当前时间

**返回值**

一个long整数，请求id，是回调列表唯一的标识。
可以传这个值给 window.cancelAnimationFrame() 以取消回调函数。

**示例**

```js
var start = null
var element = document.getElementById('animate-wrapper')
element.style.position = 'absolute'
// fn
function step(timestamp) {
  if (!start) start = timestamp
  var progress = timestamp - start
  element.style.left = Math.min(progress / 10, 200) + 'px'
  if (progress < 2000) {
    window.requestAnimationFrame(step)
  }
}
window.requestAnimationFrame(step)
```

官方文档也就到此为止了，dom的left取最小值为200。
step函数一旦调用，会用window.requestAnimationFrame递归调用自身