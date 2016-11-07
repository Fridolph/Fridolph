var http = require('http')
var req = http.get({host: 'www.byvoid.com'});

req.on('response', function(res) {
  res.setEncoding('utf-8')
  res.on('data', function(data) {
    console.log(data);
  })
})

/**
 * http.ClientRequest 像 http.ServerResponse一样也提供了write和end函数，用于向服务器发送请求体，通常用于POST、 PUT操作
 *
 * 所有写结束以后必须调用end函数以通知服务器，否则请求无效。 http.ClientRequest还提供以下函数：
 *
 * request.abort() 终止正在发送的请求
 * request.setTimeout(timeout, [callback]) 设置请求超时时间，timeout为毫秒数。 当请求超时以后，callback将会被调用
 */

/**
 * http.ClientResponse 与 http.ServerRequest相似， 提供了三个事件data、end和close, 分别在数据到达、传输结束和连接结束时触发，其中data事件传递一个参数chunk,表示接收到的数据
 *
 * http.CilentResponse也提供了一些属性，用于表示请求的结果状态
 *
 * statusCode    HTTP状态码，如200、404、500
 * httpVersion   HTTP协议版本, 通常是1.0或1.1
 * headers       HTTP请求头
 * trailers      HTTP请求尾
 */