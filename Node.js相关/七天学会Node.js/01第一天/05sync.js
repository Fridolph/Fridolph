const http = require('http')
const fs = require('fs')

var server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    return
  }

  fs.readdir('./album/', (err, files) => {
    var wenjianjia = []

    ;(function iterator(i) {
      if (i === files.length) {
        console.log(wenjianjia);

        return
      }

      fs.stat('./album/' + files[i], (err, stats) => {
        if (stats.isDirectory()) {
          wenjianjia.push(files[i]);
        }
        iterator(i + 1)
      })
    })(0)
  })

  res.end()
})

server.listen(3000)
console.log('open you browser on localhost: 3000');
