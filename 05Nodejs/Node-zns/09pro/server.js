var Express = require('express')
var static = require('express-static')
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')
var bodyParser = require('body-parser')
var multer = require('multer')
var consolidate = require('consolidate')

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
  name: 'zns_sess_id', keys: arr, maxAge: 20*3600*1000
}));

// // 接受用户请求
// server.use('/', function(req, res, next) {  
//   console.log('接受用户请求: \n','req.query: ',req.query, '\nreq.body: ', req.body, '\nreq.cookies: ',req.cookies, '\nreq.session: ',req.session);
// })

// 3.post数据
server.use(bodyParser.urlencoded({ extended: false })) // 解析 application/x-www-urlencoded 数据
server.use(multer({ // 解析 multipart/form-data
  dest: './www/upload'
}).any())


//4.配置模板引擎
//输出什么东西
server.set('view engine', 'html');
//模板文件放在哪儿
server.set('views', './views');
//哪种模板引擎
server.engine('html', consolidate.ejs);

// 用户请求
// server.use('/', function(req, res, next) {
//   console.log(req.query, req.body, req.files, req.cookies, req.session);
// })
server.get('/index', function(req, res){
  res.render('1.ejs', {name: 'fridolph'});
});


// 5.static参数
server.use(static('./www'))

