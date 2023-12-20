var fs = require('fs')
var stream = fs.createReadStream('my-file.txt')

stream.on('data', function(chunk) {
  // 处理文件部分内容
})

stream.on('data', function(chunk) {
  // 文件读取完毕
})