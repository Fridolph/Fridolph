/*var connect = require('connect');

// 基于Node标准的HTTP服务来创建一个web服务器
connect.creatServer(
  // 提供当前目录的文件访问,并监听8080端口
  connect.static(__dirname)  
).listen(8000);*/

var connect = require('connect');

connect.createServer(connect.static(__dirname)).listen(8000);