// 这个模块里封装了所有对数据库的常用操作
var mongoClient = require('mongodb').MongoClient;
// 不管数据库什么操作，都是先连接数据库，所以我们把连接数据库封装成函数
function _connectDB(callback) {
  var url = 'mongodb://localhost:27017/haha';

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
exports.deleteMany = (collectionName, jsno, callback) => {
  _connectDB((err, db) => {
    db.collection(collectionName).deleteMany(json, (err, result) => {
      callback(err, result);
    });
  });
}

// 查 - 查找数据，找到所有数据
// args是个对象{'pageAmount': Number, 'page': Number}
exports.find = (collectionName, json = {}, C, D) => {
  var result = [];  // 结果数组

  // 这里是一个函数重载，用户默认可以只传3个参数
  if (arguments.length === 3) {
    // find = function(collectionName, json = {}, callback) {}
    var callback = C;
    var skipNumber = 0;
    var limit = 0;
  } else if (arguments.length === 4) {
    var callback = D;
    var args = C;
    var skipNumber = args.pageAmount * args.page; // 应该省略的条数
    var limit = args.pageAmount;                  // 数目限制
  } else {
    throw new Error('find函数默认传3个参数，最多传4个参数')
  }

  // 连接数据库，查找所有数据
  _connectDB((err, db) => {
    var cursor = db.collection(collectionName).find(json).skip(skipNumber).limit(limit);
    cursor.each((err, doc) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (doc !== null) { // 放入结果数组
        result.push(doc);
      } else { // 遍历结束，没有更多的文档
        callback(null, result);
      }
    });
  });
}