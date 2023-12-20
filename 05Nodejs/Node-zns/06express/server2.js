var Express = require('express')
var bodyParser = require('body-parser')

var app = Express()
app.listen(8080)

app.use(bodyParser.urlencoded({
  // extended: false, 扩展模式
  // limit: 2 * 1024 * 1024 大小限制
}))

// GET POST
app.use('/', function(req, res) {
  // console.log(req.query) // GET
  console.log(req.body) // POST
})