# 知识点梳理

* BOM
* DOM
* 事件绑定
* Ajax
* 本地存储

---

## BOM

Browser Object Model 浏览器对象模型

* navigator
* screen
* location
* history

1. 获取浏览器特性

```js
let ua = navigator = userAgent
let isChrome = ua.includes('Chrome')
```

2. 获取屏幕宽高

```js
console.log(window.screen)
// vailHeight
// availLeft
// availTop
// availWidth
// colorDepth
// height
// orientation
// ScreenOrientation
// pixelDepth
// width
```

## DOM

Document Object Model 文档对象模型

> DOM和HTML的区别和联系

浏览器访问url返回一个文档，其内容就是HTML格式的代码。
但浏览器要把该文档渲染成页面，此时浏览器就需要把HTML转变成DOM，（一棵树）。

> property 和 attribute 的区别

DOM节点本质上是一个可扩展的JS对象，而这属于JS范畴，符合JS语法标准。
property的获取和修改是直接改变JS对象，而attribute是直接改变HTML属性。

attribute就是对HTML属性的get和set，和DOM节点的JS范畴的property没有关系。
而get和set attribute时，还会触发DOM查询或者重绘、重排、频繁操作会影响页面性能。

> DOM基本操作API

* 新增节点

```js
var div = document.getElementById('div')
// 添加新节点
var p = document.createElement('p')
p.innerHTML = 'para'
div.appendChild(p)
// 移动已有节点
var p2 = document.getElementById('p2')
div.appendChild(p2)
```

* 获取父元素

```js
var div = document.getElementById('div')
var parent = div.parentElement
```

* 获取子元素

```js
var div = document.getElementById('div')
var child = div.childNodes
```

* 删除节点

```js
var div = document.getElementById('div')
var child = div.childNodes
div.removeChild(child[0])
```

## 事件

### 事件绑定

    dom.addEventListener(eventName, fn, isPropagation)

编写一个通用的事件绑定函数

```js
function bindEvent(elem, type, fn, isPropagation = false) {
  elem.addEventListener(type, fn, isPropagation)
}
```

### 事件冒泡

事件会延着DOM树向上冒泡直到根节点html。使用`event.stopPropagation`阻止冒泡

> 如何使用事件代理？好处？

```js
var div = document.getElementById('div')
div.addEventListener('click', e => {
  var target = e.target // 监听到触发点击事件的元素
  if (e.nodeName === 'A') {
    console.log(target.innerHTML)
  }
})
```

现在完善一下之前写的通用事件绑定函数，加上事件代理。

```js
function bindEvent(elem, type, selector, fn) {
  // 这样处理，可接收两种调用方式 bindEvent(div1, 'click', 'a', function () {...})// 和 bindEvent(div1, 'click', function () {...}) 这两种
  if (fn == null) {
    fn = selector
    selector = null
  }
  // 绑定事件
  elem.addEventListener(type, function(e) {
    var target
    if (selector) {
      // 有selector说明需要做事件代理, 获取触发事件元素
      target = e.target
      // 看是否符合selector条件
      if (target.matches(selector)) {
        fn.call(target, e)
      }
    } else {
      // 没有selector不需要做事件代理
      fn(e)
    }
  })
}
// 使用代理， bindEvent多一个'a'参数
var div = document.getElementById('div')
bindEvent('div', 'click', 'a', function(e) {
  console.log(this.innerHTML)
})
// 不使用代理
var a = document.getElementById('link')
bindEvent('div', 'click', function(e) {
  console.log(a.innerHTML)
})
```

使用代理的优点如下：

* 使代码简洁
* 减少浏览器的内存占用

## 网络请求

### Ajax

> 手写Ajax

```js
var xhr = new XMLHttpRequest()
xhr.onreadystatechange = function() {
  // 异步执行
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText)
    }
  }
}
xhr.open('GET', '/api', false)
xhr.send(null)
```

### 状态码说明

* 0 - 代理被创建，尚未调用open
* 1 - open被调用
* 2 - send被调用，头部和状态已获得
* 3 - 下载中 responseText已包含部分数据
* 4 - 完成，数据准备就绪

### HTTP协议的常见状态码

* 2xx 正常
  * 200 成功
  * 204 无内容
* 3xx 重定向

  * 301 永久重定向
  * 302 临时重定向
  * 304 资源找到，从缓存中读取
* 4xx 客户端错误
  * 400 坏请求
  * 401 身份验证
  * 403 拒绝请求
  * 404 资源未找到
* 5xx 服务端错误

> fetch API

```js
fetch('/url', {
  method: 'POST',
  headers: {},    // 请求头信息
  body: {},       //请求发送数据
  mode: '',       // 请求模式，是否跨域cors等
  credentials: '',// cookie的跨域策略
  cache: ''       // 请求的cache模式
}).then(res => {/* ... */})
```

fetch支持headers定义，通过headers自定义可以方便得实现多种请求方法

### 跨域

> 题外知识补充之src和href的区别，src用于替代元素，而href用于建立该标签与外部资源的关系。

浏览器中有同源策略。协议、域名、端口不同都会命中~

script img link 几个标签可避过该策略。

> 解决跨域

1. JSONP
2. CORS
3. WebSocket
4. PostMessage
5. ProxyServer

## 本地存储

> cookie和localStorage区别

### Cookie

cookie本身不用来做服务端存储，它设计用来在服务器和客户端进行信息传递，因此每个HTTP请求带可携带cookie。但cookie也具备浏览器端存储能力

缺点：

* 存储量小，4kb左右
* HTTP请求都携带，影响获取资源的效率
* API需要封装使用

### localStorage和sessionStorage

为浏览器端缓存而设计，优点：

* 存储量增大到5MB
* 不会带到HTTP请求中
* API适用于做数据存储

localStorage永久有效，sessionStorage关闭浏览器失效，应用场景不同。
