/**
 * 由于GET请求直接被嵌入在路径中，URL是完整的请求路径，包括了?后面的部分，因此你可以手动解析后面的内容作为GET请求的参数。
 */

var http = require('http')
var url = require('url')
var util = require('util')

http.createServer(function(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"})
  res.end(util.inspect(url.parse(req.url, true)))
}).listen(3000)