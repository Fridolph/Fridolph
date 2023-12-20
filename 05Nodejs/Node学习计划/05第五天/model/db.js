// 这个模块里封装了所有对数据库的常用操作
var mongoClient = require('mongodb').MongoClient;
var settings = require('../settings');

// 不管数据库什么操作，都是先连接数据库，所以我们把连接数据库封装成函数
function _connectDB(callback) {
  var url = settings.dburl; // 从settings.js中读取暴露出来的数据库地址

  // 连接数据库
  mongoClient.connect(url, (err, db) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(err, db);
  });
}

// _connectDB((err, db) => {
// 表示连接成功之后做的事情
// });

// 增 - 插入数据
exports.insertOne = (collectionName, json = {}, callback) => {
  _connectDB((err, db) => {
    db.collection(collectionName).insertOne(json, (err, result) => {
      callback(err, result);
      // 关闭数据库
      db.close();
    });
  });
}


// 删 - 删除数据
exports.deleteMany = (collectionName, json, callback) => {
  _connectDB((err, db) => {
    db.collection(collectionName).deleteMany(
      json,
      function (err, results) {
        callback(err, results);
        db.close(); //关闭数据库
      }
    );
  });
}

// 改
exports.updateMany = (collectionName, json1, json2, callback) => {
  _connectDB((err, db) => {
    db.collection(collectionName).updateMany(
      json1,
      json2,
      (err, result) => {
        callback(err, result);
        db.close();
      }
    )
  });
}


// 查 - 查找数据，找到所有数据     args是个对象{'pageAmount': Number, 'page': Number}
exports.find = (collectionName, json, C, D) => {
  var result = []; //结果数组
  if (arguments.length == 3) {
    //那么参数C就是callback，参数D没有传。
    var callback = C;
    var skipnumber = 0;
    //数目限制
    var limit = 0;
  } else if (arguments.length == 4) {
    var callback = D;
    var args = C;
    //应该省略的条数
    var skipnumber = args.pageamount * args.page || 0;
    //数目限制
    var limit = args.pageamount || 0;
    //排序方式
    var sort = args.sort || {};
  } else {
    throw new Error('find函数的参数个数，必须是3个，或者4个。');
    return;
  }

  //连接数据库，连接之后查找所有
  _connectDB((err, db) => {
    var cursor = db.collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort);
    cursor.each((err, doc) => {
      if (err) {
        callback(err, null);
        db.close(); //关闭数据库
        return;
      }
      if (doc != null) {
        result.push(doc); //放入结果数组
      } else {
        //遍历结束，没有更多的文档了
        callback(null, result);
        db.close(); //关闭数据库
      }
    });
  });
}

// 拿到表中的所有数据
exports.getAllCount = (collectionName, callback) => {
  _connectDB((err, db) => {
    db.collection(collectionName).count({}).then((count) => {
      callback(count);
      db.close();
    });
  });
}