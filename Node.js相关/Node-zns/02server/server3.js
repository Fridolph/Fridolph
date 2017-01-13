const http = require('http')
const url = require('url')

http.createServer(function(req, res) {
  var obj = url.parse(req.url, true) 
  var objUrl = obj.pathname
  var data = obj.query

  console.log(obj, data);

  res.write('aaa')
  res.end()
}).listen(8080)