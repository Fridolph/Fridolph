/**
 * 文件系统接口还包括一些批量的方法来读写或者追加文件
 * 批量方法在你想把文件加载到内存或者一次性写入文件时很有用
 */

var fs = require('fs');

fs.readFile('./', function (err, buf) {
  console.log(buf.toString());
});