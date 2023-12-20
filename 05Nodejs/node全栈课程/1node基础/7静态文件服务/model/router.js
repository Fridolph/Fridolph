const fs = require('fs')
const url = require('url')
const path = require('path')

exports.statics = (req, res, staticPath) => {
  let pathname = url.parse(req.url).pathname
  console.log('pathname: ', pathname)

  // 默认加载首页
  if (pathname === '/') {
    pathname = '/index.html'
  }
  // 获取文件的后缀名
  let extname = path.extname(pathname)
  if (pathname !== '/favicon.ico') {
    fs.readFile(`${staticPath}/${pathname}`, (err, data) => {
      if (err) {
        console.log('404')
        fs.readFile(`${staticPath}/404.html`, (err404, data404) => {
          if (err404) {
            console.log(err404)
          }
          res.writeHead(404, {
            "Content-Type": "text/html; charset=utf-8"
          })
          res.write(data404)
          res.end()
        })
      } else {
        getMime(extname, (mime) => {
          res.writeHead(200, {
            "Content-Type": " " + mime + ";charset='utf-8'"
          })
        })
      }
    })
  }
}

/**
 * 获取文件类型的方法
 */
function getMime(extname, cb) {
  fs.readFile('./mime.json', (err, data) => {
    if (err) {
      console.log('mime.json文件不存在')
      return false
    }
    let Mimes = JSON.parse(data.toString())
    let result = Mimes[extname] || 'text/html'
    cb(result)
  })
}
