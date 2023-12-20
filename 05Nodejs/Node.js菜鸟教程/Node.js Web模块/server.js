// Node.js 提供了 http 模块，http 模块主要用于搭建 HTTP 服务端和客户端，使用 HTTP 服务器或客户端功能必须调用 http 模块，代码如下：
// var http = require('http');

var http = require('http')
var fs = require('fs')
var url = require('url')

// 创建服务器
http.createServer(function(req, res) {
  // 解析请求, 包括文件名
  var pathname = url.parse(req.url).pathname

  // 输出请求的文件名
  console.log("Request for " + pathname + "received.");

  // 从文件系统中读取请求的文件内容
  fs.readFile(pathname.substr(1), function(err, data) {
    if (err) {
      // HTTP状态码 404 => NOT FOUND
      // Content-Type: text/plain
      res.writeHead(404, {"Content-Type": "text/html"})
    } else {
      // HTTP状态码 200 => OK
      // Content-Type: text/plain
      res.writeHead(200, {"Content-Type": "text/html"})

      // 响应文件内容
      res.write(data.toString())      
    } 

    // 发送响应数据
    res.end()
  })
}).listen(8081);

// 控制台会输出以下信息
console.log("Server running at http://127.0.0.1:8081/");