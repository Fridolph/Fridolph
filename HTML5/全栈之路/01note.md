## 模块化：

AMD define 异步
node require 同步加载
ES6 export/import

babel - es6

---

## 数据交互

1. HTTP协议
2. form
  * action 提交到哪
  * method GET/POST/PUT/DELETE/HEAD
  * enctype (encoding type) application/x-www-form-urlencoded(默认、发送小数据)、mutipart/form-data(文件)
3. ajax 官方提供、不能跨域、单向
4. jsonp 不支持post
5. websocket 双工

过去Ajax只能由客户端向服务端发送请求，单向。传统定时器+Ajax方式不能应对大负载。

GET 获取 / 把数据放到url里传输 数据量小 会缓存
POST 发送 / 放在body里 数据量大 不会缓存
PUT 发送（更新）
DELETE 删除
HEAD 服务器只发送头回来，不需要内容

---

### HTTP协议

1. 无状态
2. 连接过程，三次握手 syn，syn+ack，ack


请求/响应头 大小有限制 <= 32k 具体大小跟协议有关
请求/响应体 大小有限制 <= 1G 一般来说是1G，也要看协议

http 1.0 短连接
http 1.1 长连接 keep-alive
kttp 2.0 

### Ajax原理 XMLHttpRequest

* 0 xhr才创建完 new XMLHttpRequest
* 1 刚连接到服务器上 在open完时
* 2 请求已发送 刚刚send时
* 3 接收完成 响应头接收完
* 4 接受完成 响应体接收完 - 4时 服务器通信才完成
         
通信完成只代表这个过程完成，但具体收发信息与否需要 status 辅助

status HTTP状态码

* 1xx 消息
* 2xx 成功 || 304 拿缓存
* 3xx 重定向
  * 301 永久重定向
  * 302 临时重定向  
* 4xx 客户端错误
* 5xx 服务端错误

接收响应数据：

xhr.responseText  文本
xhr.responseXML   xml数据

---

安全：

* 前台没有安全性；安全放在后台
* XSS 跨站脚本攻击

ajax不允许跨域

---

查阅 http 标准
解释HTTP状态码 10个+
了解ajax 2.0