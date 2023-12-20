## offsetWidth / offsetHeight, clientWidth / clientHeight 与 scrollWidth / scrollHeight 的区别

offsetWidth / offsetHeight 返回值包含 content + padding + border 效果与 e.getBoundingClientRect()相同
clientWidth / clientHeight 只包含 content + padding 若有滚动条，也不包含滚动条
scrollWidth / scrollHeight 只包含 content + padding + 溢出内容的尺寸

## XMLHttpRequest 通用属性和方法

1. readyState 表示请求状态的整数, 取值
   unsent 0 对象已创建
   opened 1 open()成功调用，可以为 xhr 设置请求头，或使用 send()发送请求
   headers_received 2 所有重定向已自动完成访问，并且最终响应的 HTTP 头已收到
   loading 3 响应体正在接收
   done 4 数据传输完成或者传输产生错误

2. onreadystatechange readyState 改变时调用的函数
3. status 服务器返回的 HTTP 状态码 如 200 , 404
4. statusText 服务器返回的 HTTP 状态信息 如 OK, No Content
5. responseText 作为字符串形式的来自服务器的完整响应
6. responseXML document 对象，表示服务器的响应解析成 XML 文档
7. abort() 取消异步 HTTP 请求
8. getAllResponseHeaders() 返回一个字符串，包含响应中服务器发送的全部 HTTP 报头，每个报头都是一个用冒号分隔开的 key/value，并且使用一个回车来分隔报头行
9. getResponseHeader(headerName) 返回 headName 对应的报头值
10. open(method, url, asynchronous[, user, password]) 初始化准备发送到服务器上的请求
11. setReuqestHeader(name, value) 设置 HTTP 报头
12. send(body) 对服务器请求进行初始化，参数 body 包含请求的主体部分，对于 POST 请求为键值对字符串；对于 GET 请求为 null

## focus / blur 与 focusin / focusout 的区别与联系

1. focus / blur 不冒泡， focusin / focusout 冒泡
2. 前者兼容性好
3. 可获得焦点元素
   window
   链接被点击或键盘操作表单空间被点击或键盘操作设置 tabindex 大户型的元素被点击或键盘操作

## mouseover / mouseout 与 mouseenter / mouseleave 的区别与联系

1. 前者是标准所有浏览器支持， 后者是 DOM3 标准，现代浏览器支持
2. 前者是冒泡事件，后者不冒泡

## sessionStorage, localStorage, cookie 区别

1. 都会在浏览器端保存，有大小限制，同源限制
2. cookie 会在请求时发送到服务器作为会话标识，服务器可修改 cookie,web storage 不会发送到服务器
3. cookie 有 path 概念，子路径可以访问父路径 cookie, 父路径不能访问子路径的 cookie
4. 有效期： cookie 在设置的有效期内有效，默认为浏览器关闭，sessionStorage 在窗口关闭前有效，localStorage 长期有效，除非用户删除
5. 共享： sessionStorage 不能共享，localStorage 在同源文档间共享，cookie 在同源且符合 path 规则的文档间共享
6. localStorage 的修改会促发其他文档窗口的 update 事件
7. cookie 有 secure 属性要求 HTTPS 传输
8. 浏览器不能超过 300 个 cookie，单个服务器不超过 20 个，每个 cookie 不超过 4k，web storage 能支持到 5M

## Javascript 跨域

两个文档同源需满足 - http://www.xxx.com:8360/
协议相同 域名相同 端口相同

跨域通信： js 进行 dom 操作、通信时若目标与当前窗口不满足同源条件，浏览器为了安全会阻止跨域操作，跨域通常有以下方法：

1. <img> <script> <link> <iframe> 元素通过 src, href 属性设置为目标 url 实现跨域请求
2. 若请求 json 数据，使用<script>进行 jsonp 请求
3. 多窗口通信使用 HTML5 规范的 targetWindow.postMessage(data, origin) 其中 data 是需要发送对象,origin 是目标窗口
   window.addEventListener('message', handler, false) handler 的 event.data 是 postMessage 发送来的数据，event.origin 是发送窗口的 origin,event.source 是发送消息的窗口引用
4. 内部服务器代理请求跨域 url，然后返回数据
5. 跨域请求数据，现代浏览器可使用 HTML5 规范的 CORS 功能，只要目标服务器返回 HTTP 头部 Access-Control-Allow-Origin: \* 即可像普通 ajax 一样访问跨域资源

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

闭包常见用途： 1.创建特权方法用于访问控制

2. 事件处理程序及回调

## JS 中定义对象

1. 对象字面量 var obj = {}
2. 构造函数 var obj = new Object()
3. Object.create(): var obj = Object.create(Object.prototype)

## === 运算符判断相等的流程是怎样的

1. 若两个值不是相同类型，它们不相等
2. 若两个值都是 nul 或者都是 undefined， 它们相等
3. 若两个值都是 bool，都是 true 或都是 false 则相同
4. 若其中一个是 NaN 则不等
5. 若都是数值型并且数值相等，它们相等 (-0 等于 0， ES6 扩展的 is 方法 -0 不等于 0)
6. 都是字符串包含 16 位值，则相等，若长度或内容不等， 则不等；显示相同但编码不同 == ===都判为不等
7. 指定相同的地址（内存）则相等，指向不同对象，则不等

## == 运算符判断相同的流程

1. 若两个值类型相同，按照 === 比较方法进行比较
2. 若类型不同：
   i. 若其中一个值是 null,另一个 undefined,相等
   ii. 若一个值是数字另一个字符串，将字符串转换为数字比较
   iii. 若有布尔型，将 true 变 1，false 变 0，然后用==继续比较
   iv. 若一个是对象，另一个是数字或字符串，将对象转换为原始值再用==继续比较
   v. 其他所有情况都视为不等

## DOM 事件模型是如何的，编写一个 EventUtil 工具类实现事件管理兼容

DOM 事件包含捕获 capture 和冒泡 bubble 两阶段：

* 捕获阶段事件从 window 开始触发事件然后通过祖先节点一次传递到触发事件的 DOM 元素上
* 冒泡阶段事件从初始元素依次向祖先节点传递直到 window

标准事件监听 elem.addEventListener(type, handler, capture) / elem.removeEventLisener(type, handler, capture)
handler 接受保存事件信息的 event 对象作为参数，event.target 为触发事件的对象，handler 调用上下文 this 为版定监听器的对象
event.preventDefault()取消事件默认行为，event.stopPropagation() / event.stopImmediatePropagation()取消事件传递

老版本 IE 事件监听 elem.attachEvent('on'+type, handler)/elem.detachEvent('on'+type, handler)：
handler 不接收 event 作为参数，事件信息保存在 window.event 中，触发事件的对象为
event.srcElement，handler 执行上下文 this 为 window 使用闭包中调用 handler.call(elem, event)可模仿标准模型，然后返回闭包，保证了监听器的移除。event.returnValue 为 false 时取消事件默认行为，
event.cancleBubble 为 true 时取消时间传播

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
