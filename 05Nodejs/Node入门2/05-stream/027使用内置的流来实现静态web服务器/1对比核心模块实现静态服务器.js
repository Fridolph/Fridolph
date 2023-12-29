/**
 * Node的文件系统和网络操作的核心模块，fs和net都提供了流接口。
 * fs模块拥有方法来自动创建流实例
 */

var http = require('http');
var fs = require('fs');

http.createServer((req, res) => {
  fs.readFile(__dirname + '/index.html', (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end(String(err));
    } else {
      res.end(data);
    }
  });
}).listen(8000);

/**
 * 即时这段代码使用非阻塞的fs.readFile方法，它需要使用fs.createReadStream方法改进一下。
 * 原因是它会将剩余文件数据读进内存。小文件或许可以接受，但是当不知道文件大小呢？
 * 静态服务器通常可能提供大量二进制资源访问，因此需要一个适应性更其nag的解决方案
 */