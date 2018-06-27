const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.end('<h1>hello world</h1>')
})

server.listen(8888)
console.log('server is running at port 8888');
