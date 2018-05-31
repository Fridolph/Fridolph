const fs = require('fs')
const http = require('http')

http.createServer((req, res) => {
  console.log('request come on 8888', req.url)

  const html = fs.readFileSync('test.html', 'utf8')
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.end(html)
}).listen(8888)

console.log('server is running at port 8888');
