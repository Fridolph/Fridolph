var fs = require('fs');

fs.readFile('./names.txt', function() {
  // toString方法接受第一个参数为编码类型
  console.log(buf.toString('ascii'));
});