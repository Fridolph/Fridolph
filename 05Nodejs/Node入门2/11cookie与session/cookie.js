var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.listen(3000, () => {
  console.log('server is running at port 3000.');
})

app.use(cookieParser())

app.get('/', (req, res) => {
  if (req.cookies.isVisit) {
    res.send('欢迎再次访问')
  } else {
    res.cookie('isVisit', 1, {maxAge: 60*1000})
    res.send('欢迎首页访问')
  }
})