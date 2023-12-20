const fs = require('fs')

fs.stat('./stat.js', (err, stats) => {
  if (err) {
    console.log('文件不存在')
    return
  }
  console.log(stats)
  console.log(stats.isFile())
  console.log(stats.isDirectory())
})