var express = require('express')

var app = express()

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(3000, () => {
  console.log('app is running at port 3000.');
})