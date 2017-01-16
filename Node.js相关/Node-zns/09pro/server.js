var Express = require('express')
var static = require('express-static')
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')
var bodyParser = require('body-parser')
var multer = require('multer')
var ejs = require('ejs')
var jade = require('jade')

var server = Express()

server.listen(8080, function() {
  console.log('打开端口8080');
})

// 1.解析cookie
server.use(cookieParser('sdlfjsdlfiusdsd')) // 填写的是密钥  签名

// 2.使用session
var arr = []

for (var i = 0; i < 100000; i++) {
  arr.push('keys_' + Math.random())
}

server.use(cookieSession({
  name: 'zns_sess_id',
  keys:arr,
  maxAge: 20*3600*1000
}))

// 接受用户请求
server.use('/', function(req, res, next) {  
  console.log('req.query: ',req.query, '\nreq.body: ', req.body, '\nreq.cookies: ',req.cookies, '\nreq.session: ',req.session);
})

// 3.post数据
server.use(bodyParser.urlencoded({ extended: false })) // 解析 application/x-www-urlencoded 数据
server.use(multer({ // 解析 multipart/form-data
  dest: './www/upload'
}).any())

// 用户请求
server.use('/', function(req, res, next) {
  console.log(req.query, req.body, req.files, req.cookies, req.session);
}) 

// 4.static参数
server.use(static('./www'))