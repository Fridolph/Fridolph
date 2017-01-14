const Express = require('express')
const bodyParser2 = require('./libs/my-body-parser')


var app = Express()
app.listen(8080)

app.use(bodyParser2)
// app.use(bodyParser.urlencoded({}))

app.use('/', function(req, res) {
  console.log(req.body);
})