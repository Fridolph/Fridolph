// 以下为删除文件的语法格式：
// fs.unlink(path, callback)
// 参数
// path 文件路径
// callback 回调函数，没有参数

var fs = require('fs')

console.log("准备删除文件！");

fs.unlink('input.txt', function(err) {
  if (err) {
    return console.error(err);
  }
  console.log("文件删除成功");
})

