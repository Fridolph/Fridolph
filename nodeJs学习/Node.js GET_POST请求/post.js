var http = require('http')
var querystring = require('querystring')
var util = require('util')

http.createServer(function(req, res) {

  // 定义一个post变量，用于暂存请求体的信息
  var post = '';  
  req.on('data', function(chunk) {

    //通过req的data事件监听函数, 每当接受到请求体的数据, 就累加到post变量中
    post += chunk;
  })

  req.on('end', function() {

    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式, 然后向客户端返回
    post = querystring.parse(post)

    res.end(util.inspect(post))
  })
}).listen(3000)

