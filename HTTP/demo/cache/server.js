const http = require('http')

http.createServer((req, res) => {
  console.log('request come on 8887', req.url)

  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Test-Cors',
    'Access-Control-Allow-Methods': 'POST, PUT, DELETE',
    'Access-Control-Max-Age': '5000'
  })
  res.end('hello world')
}).listen(8887)

console.log('server is running on port 8887')
