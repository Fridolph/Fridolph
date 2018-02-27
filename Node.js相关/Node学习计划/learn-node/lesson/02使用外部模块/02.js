// https://github.com/alsotang/node-lessons/tree/master/lesson2
const express = require('express')
const utility = require('utility')

let app = express()

app.get('/', (req, res) => {
  let q = req.query.q

  let md5Value = utility.md5(q)

  res.send(md5Value)
})

app.listen(3000, () => {
  console.log('app is running at port 3000')
})
