/**
 * 实现功能： getContentType(extname) -> str
 * 输入格式，查询是否有格式，并返回相应的字符串
 */

const fs = require('fs')

// 1. 异步读取文件
fs.readFile('./test.json', 'utf8', (err, data) => {
  if (err) {
    throw err
  } else {
    // 2. 处理读出的数据
    var kvObj = JSON.parse(data);
    var contentType = {       
      get: function(key) {
        return kvObj[key]
      }      
    }
    contentType.get('.bbb');
  }
})

