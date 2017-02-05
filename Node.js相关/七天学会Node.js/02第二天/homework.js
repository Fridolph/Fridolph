const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url')

var server = http.createServer((req, res) => {
  // 如果这里不用req.url来判断，那么用户不管输入什么网址，做的事情都一样
  // 得到地址
  var pathname = url.parse(req.url).path;

  // 判断此时用户输入的地址是文件夹地址还是文件地址
  // 如果是文件夹地址，那么自动请求这个文件夹中的index.html
  if (pathname.indexOf('.') == -1) {
    pathname += "/index.html"
  }

  // 输入的网址是 127.0.0.1/image/logo.png
  // 实际请求的是 ./static/images/logo.png
  var fileURL = "./" + path.normalize("./static/" + pathname);
  // 得到扩展名
  var extname = path.extname(pathname);

  // 把文件读出来
  fs.readFile(fileURL, (err, data) => {
    // 读完之后做的事    
    if (err) {
      // 文件不存在
      res.writeHead(404, { "Content-Type": "text/html; charset=UTF8" });
      res.end("404, 页面没找到！");
    }

    // 若找到文件
    getMime(extname, (mime) => {
      res.writeHead(200, { "Content-Type": mime });
      res.end(data);
    });
  });
});

server.listen(8080);
console.log('open your broswer http://127.0.0.1:8080');

function getMime(extname, callback) {
  // 读取mime.json文件，得到JSON，根据extname key, 返回对应的value
  // 读取文件
  fs.readFile('./mime.json', (err, data) => {
    if (err) {
      throw Error("找不到mime.json文件")
      return
    }
    // 转成JSON对象
    var mimeJSON = JSON.parse(data);
    var mime = mimeJSON[extname] || 'text/plain';
    // 执行回调函数，mime类型字符串，就是它的参数
    callback(mime)
  })
}