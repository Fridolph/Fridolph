const http = require('http')
const PORT = 9999
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('hello world')
}).listen(PORT)

console.log(`server is running at http://120.77.246.102: ${PORT}`)