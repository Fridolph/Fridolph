var fs = require('fs')

fs.readFile('content.txt', 'utf-8', function(err, data) {
  if (err) {
    console.error(err);    
  } else {
    console.log(data);
  }
})


/**
 * fs.readFileSync(filename, [encoding])是fs.readFile同步的版本。
 * 它接受的参数和fs.readFile相同，而读取到的文件内容会以函数返回值的形式返回。如果有错误发生，fs将会抛出异常，你需要使用try和catch捕捉并处理异常
 */