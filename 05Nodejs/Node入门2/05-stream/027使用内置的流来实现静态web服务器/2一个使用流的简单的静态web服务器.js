var http = require('http');
var fs = require('fs');

http.createServer((req, res) => {
  // 数据通过管道的方式从一个文件输出到Node的HTTP请求响应
  fs.createReadStream(__dirname + '/index.html').pipe(res);
}).listen(8000);

/**
 * 该例使用了更少的代码且更高效。现在替代一次性将剩余文件数据读入内存，值得提供一个缓冲区来发送到客户端。
 * 如果客户端连接缓慢，网络流将会发送信号暂停IO资源直到客户端准备好接收更多数据。
 */