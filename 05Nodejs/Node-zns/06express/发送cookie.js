var Express = require('express')
var cookieParser = require('cookie-parser')

var server = Express()


// cookie
server.use(cookieParser('sdfkjsdflk'))

server.use('/', function(req, res) {
  req.secret = 'sdfkjsdflk'
  res.cookie('user', 'blue', {signed: true})

  console.log('签名的cookie:', req.signedCookies);
  console.log('无签名的cookie:', req.cookies);

  res.send('ok')
})

server.listen(8080)``