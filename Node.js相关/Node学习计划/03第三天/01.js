var express = require('express')

var app = express()

app.get('/', (req, res) => {
  res.end('你好')
})
app.get('/haha', (req, res) => {
  res.send('这是haha 页面，哈哈哈哈~~~')
})
app.get(/^\/student\/([\d]{10})$/, (req, res) => {
  res.send("学生信息， 学号 " + req.params[0])
})
app.get('/teacher/:gonghao', (req, res) => {
  
  res.send('老师信息，工号 ' + req.params['gonghao'])
})

app.listen(8080);