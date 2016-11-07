// 以下为异步模式下关闭文件的语法格式：
// fs.close(fd, callback)
// 参数
// fd 通过fs.open() 方法返回的文件描述符
// callback 回调函数，没有参数

var fs = require('fs')
var buf = new Buffer(1024)

console.log("准备打开文件! ");

fs.open('input.txt', 'r+', function(err, fd) {
  if (err) {
    return console.error(err);
  }

  console.log("文件打开成功");
  console.log("准备读取文件");

  fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
    if (err) {
      console.log(err);
    }

    // 仅输出读取的字节
    if (bytes > 0) {
      console.log(buf.slice(0, bytes).toString());
    }

    // 关闭文件
    fs.close(fd, function(err) {
      if (err) {
        console.log(err);
      }
      console.log("文件关闭成功");
    })
  })
})