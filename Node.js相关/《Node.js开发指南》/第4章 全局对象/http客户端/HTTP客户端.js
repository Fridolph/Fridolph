// http 模块提供了两个函数 http.request 和 http.get，功能是作为客户端向 HTTP服务器发起请求。

// http.request(options, callback)发起 HTTP 请求。接受两个参数，option 是一个类似关联数组的对象，表示请求的参数，callback 是请求的回调函数。

// option常用的参数如下所示：
// host ：请求网站的域名或 IP 地址。
// port ：请求网站的端口，默认 80。
// method ：请求方法，默认是 GET。
// path ：请求的相对于根的路径，默认是“/”。QueryString 应该包含在其中。例如 /search?query=byvoid。
// headers ：一个关联数组对象，为请求头的内容。
//   callback 传递一个参数，为 http.ClientResponse 的实例。

// http.request 返回一个 http.ClientRequest 的实例。