const fs = require('fs')

fs.rename('./test.txt', '测试.txt', err => {
  if (err) throw err
})