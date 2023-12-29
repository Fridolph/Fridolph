var http = require('http');
var fs = require('fs');
var zlib = require('zlib');

http.createServer((req, res) => {
  // 设置头部以便让浏览器知道开启了gzip压缩
  res.writeHead(200, { 'content-encoding': 'gzip' });
  fs.createReadStream(__dirname + '/index.html')
    // 两个管道的调用，分别用来压缩文件和把文件以流的方式输出到客户端
    .pipe(zlib.createGzip())
    .pipe(res);
}).listen(8000);

/**
 * 这能够扩展为其他若干使用管道的方式。 例如文件需要通过HTML模版引擎然后压缩。
 * 只需要记住一般的形式是可读的。
 *
 * 注意这个例子用来表明流是如何工作的，但并不足以实现一个生产环境的静态服务器。
 */