var fs = require('fs');
var http = require('http');

// 同步方法的良好实践，在应用的初始化时使用
fs.readFileSync('./file.txt');

// 同步方法的错误使用，在每一次请求中会阻塞服务器直到文件读取完
http.createServer((req, res) => {
  fs.readFileSync('./file.txt');
}).listen(3000);