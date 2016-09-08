/**
 * http.Server 是一个基于事件的HTTP服务器， 所有的请求都被封装为独立的事件
 * 开发者只需要对它的事件编写响应函数即可实现HTTP服务器的所有功能。
 * 它继承自EventEmitter 提供以下几个事件
 *
 * request: 当客户端请求到来时，该事件被触发，提供两个参数 req 和 res, 分别是 http.ServerRequest 和 http.ServerResponse 的实例，表示请求和响应信息
 *
 * connection: 当TCP连接建立时， agitated事件被触发，提供一个参数socket, 为net.Socket的实例。
 * connection事件的粒度要大于request， 因为酷护短在Keep-Alive模式下可能会在同一个连接内发送多次请求。
 *
 * close: 当服务器关闭时，该事件被触发。注意不是在用户连接断开时。
 */

 var http = require('http')

 http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/html'})
   res.write('<h1>Node.js</h1>')
   res.end('<p>Hello World!</p>')
 }).listen(3000);

 console.log('HTTP server is listening at port 3000.');