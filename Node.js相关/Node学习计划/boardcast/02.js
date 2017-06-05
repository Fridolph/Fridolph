var express = require('express');
var app = express();
var db = require('./model/db');

app.get('/', (req, res) => {
  let data = parseInt(Math.random()*10+10)
  db.insertOne('teacher', {'name': '我是' + data, 'age': data}, (err, result) => {
    if (err) {
      console.log('插入失败');
      return;
    }

    res.send('插入数据成功: \n' + data);
  })
});

app.get('/du', (req, res) => {
  // 这个页面现在接受一个page参数
  let page = parseInt(req.query.page) || 0;
  let arr = [];

  db.find('teacher', {'age': {$gt:9}}, {'pageamount': 5, 'page': page}, (err, result) => {
    if (err) {
      console.log(err);
    }

    for (var i = 10*page; i< 10*(page + 1); i++) {
      arr.push(result[i])
    }
    res.send(arr)
  })
})

app.listen(3000);
console.log('server is running at port 3000');