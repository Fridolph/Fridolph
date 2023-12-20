## http模块

```js
// 引用模块
var http = require("http");
// 创建一个服务器，回调函数表示接收到请求之后做的事情
var server = http.createServer(function(req,res) {
  // req 参数表示请求，res 表示响应
  console.log("服务器接收到了请求" + req.url);
  // End 方法使 Web 服务器停止处理脚本并返回当前结果
  res.end();
});
// 监听端口
server.listen(3000,"127.0.0.1");
```

### url模块

```js
// 解析url
url.parse()
// 是上面url.parse() 操作的逆向操作
url.format(urlObject)
// 添加或者替换地址
url.resolve(from, to)
```

### node自启动工具 supervisor || nodemon
