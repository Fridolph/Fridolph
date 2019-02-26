WebSocket protocol是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通信，是Server push技术的一种很好的实现。

原生WebSocket API使用不太方便，我们使用Socket.io，它很好地封装了WebSocket接口，提供了更简单、灵活的接口，也对不支持WS的浏览器提供向下兼容

前端代码：

```html
<div>user input: <input id="input" type="text" /></div>
<script src="./socket.io.js"></script>
<script>
var socket = io('xxx')

// 成功连接处理
socket.on('connect', () => {
  // 监听服务端消息
  socket.on('message', msg => {
    console.log('data from server: ', msg)
  })
  // 监听服务端关闭
  socket.on('disconnect', () => {
    console.log('server socket has closed.')
  })
})

document.querySelector('#input').onblur = function() {
  socket.send(this.value)
}
</script>
```

Node Server

```js
const http = require('http')
const socket = require('socket.io')

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.end()
})

server.listen(8080)
console.log('Server is running at port 8080')

// 监听socket连接
socket.listen(server).on('connection', client => {
  // 接收处理
  client.on('message', msg => {
    client.send('hello: ' + msg)
    console.log('data from client: ' + msg)
  })

  // 断开处理
  client.on('disconnect', () => {
    console.log('client socket has closed.')
  })
})
```
