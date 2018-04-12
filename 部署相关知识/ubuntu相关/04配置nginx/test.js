const http = require('http')

http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('<h1>hello fridolph</h1>')
}).listen(7000, () => {
  console.log('server is running at localhost:7000');
})