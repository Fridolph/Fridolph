const fs = require('fs')

fs.watch('./', {
  recursive: true // 监视子文件夹  
}, (eventType, filename) => {
  console.log(eventType, ':', filename)
})