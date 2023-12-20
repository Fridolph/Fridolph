## websocket与http

* websocket是html5出的（协议）
* http1.1 多了keep-alive把多个http请求合为一个
* websocket和http协议层级不同，(http协议传输非html数据)

## websocket

ws是持久化协议。http的声明周期通过`Request`界定，一个Request，一个Response，那么在HTTP1.0中一个http请求就结束了。

http1.1进行改进增加了keep-alive。即在一个HTTP连接中，可以发送多个Request，接收多个Response，但一个request只能有一个response，响应是被动的，不能主动发起。

下面是典型的`websocket`握手：

```bash
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```

    Upgrade: websocket
    Connection: Upgrade

这就是WS的核心了，告诉服务器发起WS协议

    Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
    Sec-WebSocket-Protocol: chat, superchat
    Sec-WebSocket-Version: 13

首先，`Sec-WebSocket-Key` 是一个 Base64 encode 的值，这个是浏览器随机生成的，告诉服务器：验证websocket

然后，`Sec_WebSocket-Protocol` 是一个用户定义的字符串，用来区分同url下，不同的服务所需要的协议。

最后 `Sec-WebSocket-Version`告诉服务器所使用的Websocket Draft协议版本，在最初时，WS协议还在Draft阶段，然后服务器会返回下列东西，表示已接受请求，成功建立WS~

```bash
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```

这里开始就是HTTP最后负责的区域了

    Upgrade: websocket
    Connection: Upgrade

告诉客户端将升级websocket协议。 然后`Sec-WebSocket-Accept`这个则是经过服务器确认，且加密过后`Sec-WebSocket-Key`

后面的`Sec-WebSocket-Protocol`则是表示最终使用协议。

## websocket的作用

要说websocket作用就要顺便讲下`long poll`和`ajax轮询`原理

* Ajax轮询

就是让浏览器隔几秒就发送一次请求，询问服务器是否有新信息

* long poll

原理差不多，不过采取的是阻塞模型。也就是说，客户端发起连接后，如果没消息，就一直不返回response给客户端，直到有消息才返回。返回完之后，客户端再次建立连接，周而复始。

可以看出，这两种方式都不是较好的方式，会占用很多资源，且HTTP是无状态协议，所以websocket就出现了。

---

这样的协议解决了上面同步有延迟，而且还非常消耗资源的这种情况。那么为什么他会解决服务器上消耗资源的问题呢？

其实我们所用的程序是要经过两层代理的。即HTTP协议在Nginx等服务器解析下，然后再传送给相应Handler来处理。简单来说，我们有一个很快的接线员（nginx）它负责把问题转交给相应的客服handler。WebSocket解决了这样一难题，建立后，可以直接跟接线员（nginx等）建立持久连接，有信息时客服想办法通知接线员，然后接线员统一交给客户。从而解决处理速度慢的问题。

同时，在传统的方式上，要不断地建立，关闭HTTP协议，由于HTTP是非状态性的，每次都要重新传输`identity info`来告诉服务端我是谁。但WS只需要一次HTTP握手，所以说整个通讯过程建立在一次连接/状态中，也就避免了HTTP的非状态性，服务端会一直知道你的消息，直到关闭请求，这就解决了接线员要反复解析HTTP协议，还要查看鉴别信息等。

同时由客户主动询问，转换为服务器(推送)有消息时就发送（当然客户端还是等主动发送消息过来的）没有信息时就交给服务器，不需占用本身速度就慢的handler了。

## 总结

1. 传统http req=res，无状态，实时信息发送成难题；
2. 上面的解决方式： long poll 和 ajax轮询
3. websocket可以打破传统，建立协议后，可以主动response，而不是被动式的response，实现由消息，后台直接response
