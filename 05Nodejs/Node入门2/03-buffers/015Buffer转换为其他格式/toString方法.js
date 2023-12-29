var fs = require('fs');

fs.readFile('./names.txt', function(err, buf) {
  // toString默认把数据转换为UTF-8格式的字符串
  console.log(buf.toString());
});