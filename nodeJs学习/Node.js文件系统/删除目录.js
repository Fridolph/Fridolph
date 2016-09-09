// 以下为删除目录的语法格式：
// fs.rmdir(path, callback)
// 参数
// path 文件路径
// callback 回调无参数


var fs = require('fs')

console.log("准备删除目录 test");

fs.rmdir('test', function(err) {
  if (err) {
    return console.error(err);
  }
  console.log("读取 /test目录");

  fs.readdir("test", function(err, files) {
    if (err) {
      return console.error(err);
    }

    files.forEach(function(file) {
      console.log(file);
    })
  })
})