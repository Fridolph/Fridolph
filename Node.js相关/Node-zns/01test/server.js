const http = require('http')
const fs = require('fs')

let server = http.createServer(function(req, res) {
  // req.url => '/index.html'
  var file_name = './www' + req.url

  fs.readFile(file_name, function(err, data) {
    if (err) {
      console.log('bbbbbbbbbbbbbbbb');
      res.write('404')
    } else {
      console.log('bbbbbbbbbbbbbb');
      res.write(data)
    }
    console.log('aaaaaaaaaaaaaaaaaa');
    res.end()
  })  
})

server.listen(8080)