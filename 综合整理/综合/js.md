## offsetWidth / offsetHeight, clientWidth / clientHeight 与 scrollWidth / scrollHeight的区别

offsetWidth / offsetHeight 返回值包含 content + padding + border 效果与 e.getBoundingClientRect()相同
clientWidth / clientHeight 只包含 content + padding 若有滚动条，也不包含滚动条
scrollWidth / scrollHeight 只包含 content + padding + 溢出内容的尺寸


## XMLHttpRequest 通用属性和方法

1. readyState 表示请求状态的整数, 取值
  unsent 0 对象已创建
  opened 1 open()成功调用，可以为xhr设置请求头，或使用send()发送请求
  headers_received 2 所有重定向已自动完成访问，并且最终响应的HTTP头已收到
  loading 3 响应体正在接收
  done 4 数据传输完成或者传输产生错误

2. onreadystatechange  readyState改变时调用的函数
3. status  服务器返回的HTTP状态码 如 200 , 404
4. statusText  服务器返回的HTTP状态信息 如 OK, No Content
5. responseText  作为字符串形式的来自服务器的完整响应
6. responseXML document对象，表示服务器的响应解析成XML文档
7. abort() 取消异步HTTP请求
8. getAllResponseHeaders() 返回一个字符串，包含响应中服务器发送的全部HTTP报头，每个报头都是一个用冒号分隔开的 key/value，并且使用一个回车来分隔报头行
9. getResponseHeader(headerName) 返回headName对应的报头值
10. open(method, url, asynchronous[, user, password]) 初始化准备发送到服务器上的请求
11. setReuqestHeader(name, value) 设置HTTP报头
12. send(body) 对服务器请求进行初始化，参数body包含请求的主体部分，对于POST请求为键值对字符串；对于GET请求为null

## focus / blur 与 focusin / focusout 的区别与联系

1. focus / blur 不冒泡， focusin / focusout冒泡
2. 前者兼容性好
3. 可获得焦点元素
  window
  链接被点击或键盘操作
  表单空间被点击或键盘操作
  设置tabindex大户型的元素被点击或键盘操作

## mouseover / mouseout 与 mouseenter / mouseleave 的区别与联系

1. 前者是标准所有浏览器支持， 后者是DOM3标准，现代浏览器支持
2. 前者是冒泡事件，后者不冒泡


## sessionStorage, localStorage, cookie区别

1. 都会在浏览器端保存，有大小限制，同源限制
2. cookie 会在请求时发送到服务器作为会话标识，服务器可修改cookie,web storage不会发送到服务器
3. cookie 有path概念，子路径可以访问父路径cookie, 父路径不能访问子路径的cookie
4. 有效期： cookie在设置的有效期内有效，默认为浏览器关闭，sessionStorage在窗口关闭前有效，localStorage长期有效，除非用户删除
5. 共享： sessionStorage不能共享，localStorage在同源文档间共享，cookie在同源且符合path规则的文档间共享
6. localStorage的修改会促发其他文档窗口的update事件
7. cookie有secure属性要求HTTPS传输
8. 浏览器不能超过300个cookie，单个服务器不超过20个，每个cookie不超过4k，web storage能支持到5M


## Javascript跨域

两个文档同源需满足 -  http://www.xxx.com:8360/
                    协议相同  域名相同  端口相同

跨域通信： js进行dom操作、通信时若目标与当前窗口不满足同源条件，浏览器为了安全会阻止跨域操作，跨域通常有以下方法：

1. <img> <script> <link> <iframe> 元素通过 src, href属性设置为目标url实现跨域请求
2. 若请求json数据，使用<script>进行jsonp请求
3. 多窗口通信使用HTML5规范的 targetWindow.postMessage(data, origin) 其中data是需要发送对象,origin是目标窗口
  window.addEventListener('message', handler, false) handler的event.data是postMessage发送来的数据，event.origin是发送窗口的origin,event.source是发送消息的窗口引用
4. 内部服务器代理请求跨域url，然后返回数据
5. 跨域请求数据，现代浏览器可使用HTML5规范的CORS功能，只要目标服务器返回HTTP头部Access-Control-Allow-Origin: * 即可像普通ajax一样访问跨域资源

## Javascript 有哪几种数据类型

基本类型：

* undefined
* null
* string
* boolean
* number
* symbol

引用类型：

object



## 什么是闭包，其作用

闭包是在某个作用域内定义的函数，它可以访问这个作用域内的所有变量。闭包作用域链通常包括三部分：
1. 函数本身作用域
2. 闭包定义时的作用域
3. 全局作用域

闭包常见用途：
1.创建特权方法用于访问控制
2. 事件处理程序及回调

## JS中定义对象

1. 对象字面量 var obj = {}
2. 构造函数 var obj = new Object()
3. Object.create():  var obj = Object.create(Object.prototype)

##  === 运算符判断相等的流程是怎样的

1. 若两个值不是相同类型，它们不相等
2. 若两个值都是nul或者都是undefined， 它们相等
3. 若两个值都是bool，都是true或都是false则相同
4. 若其中一个是NaN则不等
5. 若都是数值型并且数值相等，它们相等 (-0等于0， ES6 扩展的is方法 -0不等于0)
6. 都是字符串包含16位值，则相等，若长度或内容不等， 则不等；显示相同但编码不同 == ===都判为不等
7. 指定相同的地址（内存）则相等，指向不同对象，则不等

## == 运算符判断相同的流程

1. 若两个值类型相同，按照 === 比较方法进行比较
2. 若类型不同：
  i. 若其中一个值是null,另一个undefined,相等
  ii. 若一个值是数字另一个字符串，将字符串转换为数字比较
  iii. 若有布尔型，将true变1，false变0，然后用==继续比较
  iv. 若一个是对象，另一个是数字或字符串，将对象转换为原始值再用==继续比较
  v. 其他所有情况都视为不等


## DOM事件模型是如何的，编写一个EventUtil工具类实现事件管理兼容

DOM事件包含捕获capture和冒泡bubble两阶段：
* 捕获阶段事件从window开始触发事件然后通过祖先节点一次传递到触发事件的DOM元素上
* 冒泡阶段事件从初始元素依次向祖先节点传递直到window

标准事件监听elem.addEventListener(type, handler, capture) / elem.removeEventLisener(type, handler, capture)
handler接受保存事件信息的event对象作为参数，event.target为触发事件的对象，handler调用上下文this为版定监听器的对象
event.preventDefault()取消事件默认行为，event.stopPropagation() / event.stopImmediatePropagation()取消事件传递

老版本IE事件监听elem.attachEvent('on'+type, handler)/elem.detachEvent('on'+type, handler)：
handler不接收event作为参数，事件信息保存在window.event中，触发事件的对象为
event.srcElement，handler执行上下文this为window使用闭包中调用handler.call(elem, event)可模仿标
准模型，然后返回闭包，保证了监听器的移除。event.returnValue为false时取消事件默认行为，
event.cancleBubble为true时取消时间传播

通常利用事件冒泡机制托管事件处理程序提高程序性能



## 评价下三种方法实现继承的优缺点，并改进

function Shape() {}

function Rect() {}

// 法一

Rect.prototype = new Shape()

// 法二

Rect.prototype = Shape.prototype

// 法三

Rect.prototype = Object.create(Shape.prototype)

Rect.prototype.area = function() {
  // ... 
}

Class Rect extends Shape {
  constructor() {
    super()
  }
}