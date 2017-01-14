const Express = require('express')
const bodyParser2 = require('./libs/my-body-parser')


var app = Express()
app.listen(8080)

app.use(function(req, res, next) {
  var str = ''

  req.on('data', function(data) {
    str += data
  })
  req.on('end', function() {
    req.body = querystring.parse(str)

    next()
  })
})
// app.use(bodyParser.urlencoded({}))

app.use('/', function(req, res) {
  console.log(req.body);
})