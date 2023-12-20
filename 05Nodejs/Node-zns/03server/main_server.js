const http = require('http')
const fs = require('fs')
const querystring = require('querystring')
const url = require('url')

var server = http.createServer(function(req, res) {
  // GET
  var obj = url.parse(req.url, true)
  var objUrl = obj.pathname
  const getDATA = obj.query

  // POST
  // 文件请求
  var str = ''
  req.on('data', function(data) {
    str += data
  })
  req.on('end', function() {
    const postDATA = querystring.parse(str)
    /**
     * url —— 要什么
     * GET —— get数据
     * POST —— post数据
     */    
    // console.log(objUrl, str, getDATA, postDATA);

    // 文件请求
    // console.log(objUrl);
    var file_name = './www' + objUrl
    fs.readFile(file_name, function(err, data) {
      if (err) {
        res.write('404')
      } else {
        res.write(data)
      }
      res.end()
    })
  })
})

server.listen(8080)