var express = require('express');
var app = express();
var db = require('./model/db')

app.get('/', (req, res) => {
  db.insertOne('teacher', {
    'name': `yk ${Math.random()}`,
    'age': parseInt(Math.random() * 10) + 20
  }, (err, result) => {
    if (err) {
      console.log('插入失败');
      return;
    }
    res.send('插入成功');
  })
});

// 开销很大，这是错误的做法
/*app.get('/du', (req, res) => {
  // 这个页面现在接受一个page参数
  // page必须用parseInt变为Number型，不然是String型会报错
  var page = parseInt(req.query.page);
  var arr = [];

  db.find('teacher', {}, (err, result) => {
    console.log('-----------所有数据-----------------');
    for (var i = 10 * page; i < 10 * (page + 1); i++) {
      arr.push(result[i]);  
    }
    res.send(arr);
  });
});*/

app.get('/du', (req, res) => {
  // 这个页面现在接受一个page参数
  // 在Express中GET请求直接req.query即可拿到后面的参数
  var page = parseInt(req.query.page);

  // 查找4个参数，在哪个集合查，查什么(条件)，分页设置，查完之后做什么
  db.find('teacher', {
    'age': { $gt: 18 }
  }, {
    'pageAmount': 5,
    'page': page
  }, (err, result) => {
    if (err) {
      console.error(err);
    }
    res.send(result)
  });
});

app.get('/shan', (req, res) => {
  var restaurant_id = req.query.id;
  db.deleteMany('canguan', {
    'restaurant_id': restaurant_id
  }, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.get('/xiugai', (req, res) => {
  db.updateMany(
    'canguan',  // 集合名
    {
      'restaurant_id': 2   // 改什么
    }, 
    {
      $set: { 'name': '修改了' } // 怎么改
    }, 
    (err, data) => { // 改完后做什么
      if (err) console.log(err);
      res.send(data)
    }
  );
});


app.listen(3000);