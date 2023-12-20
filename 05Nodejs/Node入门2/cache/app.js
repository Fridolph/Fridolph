const PORT = 8080
const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const mime = require('./mime').types

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname
  const realPath = 'assets' + pathname
  let ext = path.extname(realPath)
  ext = ext ? ext.slice(1) : 'unknown'
  let contentType = mime[ext] || 'text/plain'
  
  fs.exists(realPath, exists => {
    if (!exists) {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      })
      res.write(`This request URL ${pathname} was not found on this server`)
      res.end()

    } else {
      fs.readFile(realPath, 'binary', (err, file) => { 
        if (err) {
          res.writeHead(500, {
            'Content-Type': 'text/plain'
          })
        } else {
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.write(file, 'binary')
          res.end()
        }
      })
    }
  })
})

server.listen(PORT)
console.log('Server is running at port: ' + PORT) 