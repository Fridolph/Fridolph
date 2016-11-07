var https = require('https')
var fs = require('fs')

var options = {
  // 私钥
  key: fs.readFileSync('ssh_key.pem'),
  // 证书
  cert: fs.readFileSync('ssh_cert.pem')
}

https
  .createServer(options, function (req, res) {
    res.writeHead(200)
    res.end('Hello Imooc')
  })
  .listen(8090)
