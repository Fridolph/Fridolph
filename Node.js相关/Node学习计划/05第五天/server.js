var express = require('express');
var app = express();

var mongoClient = require('mongodb').MongoClient;

app.get('/', (req, res) => {
  // url 就是数据库的地址   /表示数据库
  // 若数据库不存在，程序会自动创建一个库
  var url = 'mongodb://localhost:27017/test';
  mongoClient.connect(url, (err, db) => {
    if (err) {
      console.log('数据库连接失败');
      return ;
    }
    console.log('数据库连接成功');
    // 插入数据，集合如果不存在，会自动创建
    db.collection('restaurants').insertOne({
      'name': '哈啊哈',
      'age': parseInt(Math.random()*100+10) 
    }, (err, result) => {
      if (err) {
        console.log('插入失败');
        return ;
      }
      // 插入之后做的事，result表示插入结果
      console.log(result);
      res.send(result);
      db.close();
    });
  });
});
app.listen(3000, () => console.log('欢迎访问'));
