var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('form')
})

app.use(bodyParser.urlencoded({ extended: false}))

app.post('/', (req, res) => {
  console.log(req.body);
})

app.listen(3000)