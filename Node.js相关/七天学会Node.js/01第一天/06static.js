const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const getContentType = require('./test')

http.createServer((req, res) => {
  // 得到用户的路径
  var pathname = url.parse(req.url).pathname;
  var extname = path.extname(pathname);
  console.log(extname);

  // 默认首页
  if (pathname === '/') {
    res.writeHead(200, {"Content-Type": getContentType('.html')}),
    pathname = 'index.html'

  }

  // 读取该目录的文件
  fs.readFile('./static/' + pathname, (err, data) => {
    if (err) { 
      fs.readFile('./static/404.html', (err, data) => {
        res.writeHead(404, {"Content-Type": "text/html; charset=UTF8"});
        res.end(data)
      })      
    }
    // var mime = getMIME(extname);
    // 设置MIME类型，就是：
    // 网页文件：tex/html
    // jpg文件： image/jpg
    res.writeHead(200, {"Content-Type": getContentType(".html")});    
    res.end(data)
  })
}).listen(3000)

console.log('open 127.0.0.1:3000');

