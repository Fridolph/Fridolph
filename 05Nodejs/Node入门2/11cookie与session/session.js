var express = require('express')
var session = require('express-session')

var app = express()
app.listen(3000, () => {
  console.log('server is running at port 3000.');
})

app.use(session({
  secret: 'recommand 128 bytes random string', // 建议使用128个字符的随机字符串
  cookie: { maxAge: 60*1000 }
}))

app.get('/', (req, res) => {
  if (req.session.isVisit) {
    req.session.isVisit++;
    res.send(`<p>第 ${req.session.isVisit} 次来此页面`)
  } else {
    req.session.isVisit = 1;
    res.send('欢迎第一次来这里')
    console.log(req.session);
  }
});