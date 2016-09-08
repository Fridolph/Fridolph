var http = require('http')
var querystring = require('querystring')
var util = require('util')

http.createServer(function(req, res) {
  var post = '';

  req.on('data', function(chunk) {
    post += chunk;
  })

  req.on('end', function() {
    post = querystring.parse(post);

    res.end(util.inspect(post));
  })
}).listen(3000);

// 上面代码并没有在请求响应函数中向客户端返回信息，而是定义了一个post变量， 用于在闭包中暂存请求体的信息。
// 通过req的data事件的监听函数，每当接受到请求体的数据，就累加到post变量中。
// 在end事件触发后，通过querystring.parse就爱你个post解析为真正的POST请求格式，然后向客户端返回