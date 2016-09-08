/**
 * http.ServerRequest 是HTTP请求的信息。 它一般由http.Server的request事件发送，作为第一个参数传递，通常简称request或req.
 *
 * HTTP请求一般可分为请求头Request Header 和 请求体 Request Body, 以上内容由于长度较短都可以在请求头解析完成后立即读取。而请求体可能相对较长，需要一定时间传输，因此http.ServerRequest提供了3个事件用于控制请求体传输
 *
 *
 * data: 当请求体数据到来时，该事件被触发。 该事件提供一个参数chunk, 表示接收到的数据。如果该事件没有被监听，那么请求体将会被抛弃，该事件可能被调用多次。
 *
 * end: 当请求体数据传输完成时， 该事件被触发， 此后将不会再有数据到来。
 *
 * close: 用户当前请求结束时， 该事件被触发， 不同于end, 如果用户强制终止了传输，也还是调用close
 *
 */

ServerRequest的属性:

complete: 客户端请求是否已经发送完成
httpVersion: HTTP协议版本，通常是1.0或1.1
method: HTTP请求方法，如GET、POST、PUT、DELETE等
url: 原始的请求路径， 例如/static/image/x.jpg 或 /user?name=byvoid
headers: HTTP请求头
trailers: HTTP请求尾(不常见)
connection: 当前HTTP连接套接字, 为net.Socket的实例
socket: connection属性的别名
client: client属性的别名
