const fs = require('fs')

const ws = fs.createWriteStream('./test.txt');

const tid = setInterval(() => {
  const num = parseInt(Math.random() * 10)
  if (num < 7) {
    ws.write(num)
  } else {
    clearInterval(tid)
    ws.end()    
  }
}, 200)

ws.on('finish', err => {
  if (err) throw err
  console.log('done!')
})