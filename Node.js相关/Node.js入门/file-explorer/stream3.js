var fs = require('fs')
var stream = fs.createReadStream('my-file.txt')

// 获取工作目录下所有文件
var files = fs.readdirSync(process.cwd());

files.forEach(function(file) {
  // 监听 ".css" 后缀的文件
  if (/\.css/.test(file)) {
    fs.watchFile(process.cwd() + '/' + file, function() {
      console.log(' - ' + file + 'changed!');
    })
  }
})