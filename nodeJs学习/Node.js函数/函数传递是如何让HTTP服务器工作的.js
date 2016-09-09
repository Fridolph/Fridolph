/*var http = require('http')

http.createServer(function(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"})
  res.write("Hello World!")
  res.end()
}).listen(8888)

*/
var http = require('http')

function onRequest(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"})
  res.write("Hello world!")
  res.end()
}

http.createServer(onRequest).listen(8888)