# WebSocket

WebSocket 是一种`网络传输协议`，可在单个 TCP 连接上进行`全双工通信`，位于 OSI 模型的`应用层`。

WebSocket 使得客户端和服务器之间的数据交换变得更加简单，**允许服务端主动向客户端推送数据**。在 WebSocket API 中，浏览器和服务器只需要完成`一次握手`，两者之间就可以`建立持久性的连接`，并进行`双向数据传输`。

## 简介

WebSocket 通过 HTTP 端口 80 和 443 进行工作，并`支持 HTTP 代理和中介`，从而使其`与 HTTP 协议兼容`。 为了实现兼容性，WebSocket 握手使用 HTTP Upgrade 头从 HTTP 协议更改为 WebSocket 协议。

WebSocket 协议支持 Web 浏览器（或其他客户端应用程序）与 Web 服务器之间的交互，具有较低的开销，便于实现客户端与服务器的`实时数据传输`。

服务器可以通过标准化的方式来实现，而无需客户端首先请求内容，并允许消息在保持连接打开的同时来回传递。通过这种方式，可以在客户端和服务器之间进行`双向持续对话`。

WebSocket 提供全双工通信。此外，WebSocket 还可以在 TCP 之上实现消息流。TCP 单独处理字节流，没有固有的消息概念。

## WebSocket 的优点

### 较少的控制开销

在连接建立后，服务器和客户端之间交换数据时，用于协议控制的数据包头部相对较小。在不包含扩展的情况下，对于服务器到客户端的内容，此头部大小只有 2 至 10 字节（和数据包长度有关）；对于客户端到服务器的内容，此头部还需要加上额外的 4 字节的掩码。相对于 HTTP 请求每次都要携带完整的头部，此项开销显著减少了。

### 更强的实时性

由于协议是全双工的，所以服务器可以随时主动给客户端下发数据。相对于 HTTP 请求需要等待客户端发起请求服务端才能响应，延迟明显更少；即使是和 Comet 等类似的长轮询比较，其也能在短时间内更多次地传递数据。

### 保持连接状态

与 HTTP 不同的是，Websocket 需要先建立连接，这就使得其成为一种`有状态的协议`，之后通信时可以省略部分状态信息。而 HTTP 请求可能需要在每个请求都携带状态信息（如身份认证等）

### 更好的二进制支持

Websocket 定义了`二进制帧`，相对 HTTP，可以更轻松地处理二进制内容。

### 可以支持扩展

Websocket 定义了扩展，用户可以扩展协议、实现部分自定义的子协议。如部分浏览器支持压缩等。

### 更好的压缩效果

相对于 HTTP 压缩，Websocket 在适当的扩展支持下，**可以沿用之前内容的上下文，在传递类似的数据时，可以显著地提高压缩率**。

## 握手协议

WebSocket 是独立的、建立在 TCP 上的协议。Websocket 通过 HTTP/1.1 协议的 101 状态码进行握手。

为了建立 Websocket 连接，需要通过浏览器发出请求，之后服务器进行回应，这个过程通常称为“握手”（`Handshaking`）。

::: details 一个典型的 Websocket 握手请求如下

客户端请求：

```http
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
```

服务器回应：

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
Sec-WebSocket-Protocol: chat
```

**字段说明**

- Connection 必须设置 Upgrade，表示客户端希望连接升级。
- Upgrade 字段必须设置 Websocket，表示希望升级到 Websocket 协议。
- Sec-WebSocket-Key 是随机的字符串，服务器端会用这些数据来构造出一个 SHA-1 的信息摘要。把“Sec-WebSocket-Key”加上一个特殊字符串“258EAFA5-E914-47DA-95CA-C5AB0DC85B11”，然后计算 SHA-1 摘要，之后进行 Base64 编码，将结果做为“Sec-WebSocket-Accept”头的值，返回给客户端。如此操作，可以尽量避免普通 HTTP 请求被误认为 Websocket 协议。
- Sec-WebSocket-Version 表示支持的 Websocket 版本。RFC6455 要求使用的版本是 13，之前草案的版本均应当弃用。
- Origin 字段是必须的。如果缺少 origin 字段，WebSocket 服务器需要回复 HTTP 403 状态码（禁止访问）。
- 其他一些定义在 HTTP 协议中的字段，如 Cookie 等，也可以在 Websocket 中使用。

:::

## WebSocket 构造函数

WebSocket 对象提供了用于创建和管理 WebSocket 连接，以及可以通过该连接发送和接收数据的 API。

使用 WebSocket() 构造函数来构造一个 WebSocket。

### 常量

| Constant             | Value |
| -------------------- | ----- |
| WebSocket.CONNECTING | 0     |
| WebSocket.OPEN       | 1     |
| WebSocket.CLOSING    | 2     |
| WebSocket.CLOSED     | 3     |

### 属性

> 这里只例举一些常用的，更多请自行查看文档

- WebSocket.onopen
  用于指定连接成功后的回调函数。

- WebSocket.onmessage
  用于指定当从服务器接受到信息时的回调函数。

- WebSocket.onclose
  用于指定连接关闭后的回调函数。

- WebSocket.onerror
  用于指定连接失败后的回调函数。

- WebSocket.protocol `只读`
  服务器选择的下属协议。

- WebSocket.readyState `只读`
  当前的链接状态。

- WebSocket.url `只读`
  WebSocket 的绝对路径。

### 方法

- WebSocket.close([code[, reason]])
  关闭当前链接。

- WebSocket.send(data)
  对要传输的数据进行排队。

### 事件

使用 addEventListener() 或将一个事件监听器赋值给本接口的 oneventname 属性，来监听下面的事件。

- close
  当一个 WebSocket 连接被关闭时触发。 也可以通过 onclose 属性来设置。

- error
  当一个 WebSocket 连接因错误而关闭时触发，例如无法发送数据时。 也可以通过 onerror 属性来设置。

- message
  当通过 WebSocket 收到数据时触发。 也可以通过 onmessage 属性来设置。

- open
  当一个 WebSocket 连接成功时触发。 也可以通过 onopen 属性来设置。

### 简单示例

```js
// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080')

// Connection opened
socket.addEventListener('open', function (event) {
  socket.send('Hello Server!')
})

// Listen for messages
socket.addEventListener('message', function (event) {
  console.log('Message from server ', event.data)
})
```

## 参考

- [维基 WebSocket](https://zh.wikipedia.org/wiki/WebSocket)
