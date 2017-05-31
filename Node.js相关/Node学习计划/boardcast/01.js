var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient();

app.get('/', function(req, res) {
  // 数据库地址，若无库会自动创建
  var url = 'mongodb://localhost:27017/haha';

  // 连接数据库
  MongoClient.connect(url, (err, db) => {
    // 回调表示连接成功做的事，db参数就是连接上的数据库实体
    if (err) {
      console.log('db连接失败');
      return;
    }

    // console.log('db连接成功');

    // 插入数据 - 集合若不存在， 程序会自动创建
    db.collection('restaurants').insertOne({
      "name": "哈哈",
      "age": Math.round(Math.random() * 100 + 10)
    }, (err, result) => {
      if (err) {
        console.log('插入失败');
        return;
      }
      // 之后做的事, result为插入结果
      console.log('插入数据成功');
      res.send(result);
      db.close();
    });

    db.close();
  });
});

const PORT = 3000;
app.listen(PORT);
console.log('server is running at localhost:3000');