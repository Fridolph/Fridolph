// 以下为读取目录的语法格式：
// fs.readdir(path, callback)
// 参数
// path 文件路径
// callback 回调函数，带两参数err,fils,
// err为错误信息，files为目录下的文件数组列表

var fs = require('fs')

console.log("查看 /test 目录");

fs.readdir("test", function(err, files) {
  if (err) {
    return console.error(err);
  }

  files.forEach(function(file) {
    console.log(file);
  })
})