var fs = require('fs')
var data = 'fys: 我爱哈戳戳, 这是写入的哦'

// 创建一个可写入的流, 写入到文件 output.txt中
var writerStream = fs.createWriteStream('output.txt')

// 使用utf8编码写入数据
writerStream.write(data, 'UTF8')

// 标记文件末尾
writerStream.end()

// 处理事件流 --> data, end, and error
writerStream.on('finish', function() {
  console.log('写入完成');
})

writerStream.on('error', function(err) {
  console.log(err.stack);
}) 

console.log('程序执行完毕');