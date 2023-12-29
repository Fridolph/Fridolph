/**
 * fs模块通过fs.createReadStream以及fs.createWriteStream提供了流接口
 * fs.createReadStream返回一个可读流，而fs.createWriteStream返回的是可写流。
 * 流接口可以通过pipe返回其他的流，比如，这里有一个同流来拷贝文件的简单例子：
 */

var fs = require('fs');
// 打开file.txt开始准备读取
var readable = fs.createReadStream('./file.txt');
// 使用新数据创建或者覆盖copy.txt
var writable = fs.createWriteStream('./copy.txt');
// 当从original.txt读取数据时，将数据写入到copy.txt
readable.pipe(writable);