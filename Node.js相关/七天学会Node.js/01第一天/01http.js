const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html;charset=UTF8"})
  res.end()
}).listen(8080);