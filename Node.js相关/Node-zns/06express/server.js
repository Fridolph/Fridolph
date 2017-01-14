var Express = require('express')
var ExpressStatic = require('express-static')

var app = Express()
app.listen(8080)

//用户相关数据
var users = {
  'fri': '123123',
  'zhang': '111111',
  'yk': 'yangke'
}

// 接口定义
app.get('/login', function(req, res) {
  var user = req.query['user']
  var pass = req.query['pass']

  if (!users[user]) {
    res.send({ok: false, msg: '此用户不存在'})
  } else {
    if (users[user] !== pass) {
      res.send({ok: false, msg: '密码错误'})
    } else {
    res.send({ok: true, msg: '登录成功'})
    }
  }
})

app.use(ExpressStatic('./www'))


