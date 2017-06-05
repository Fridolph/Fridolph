// 这个模块里面封装了所有对数据库 的常用操作
// 不管数据库什么操作，都是先连接数据库
var MongoClient = require('mongodb').MongoClient();

/**
 * 封装一个内部函数
 */
function _connectDB(callback) {
  var url = 'mongodb://localhost:27017/haha';

  // 连接数据库  
  MongoClient.connect(url, (err, db) => {
    console.log('数据库连接成功');
    
    if (err) {
      console.log(err);
    }

    callback(err, db);
  });
}

/**
 * 插入一条数据
 */
exports.insertOne = function(collectionName, data, callback) {
  _connectDB((err, db) => {    
    db.collection(collectionName).insertOne(data, (err, result) => {
      callback(err, result)

      // 关闭数据库
      db.close()
    })
  })
}

/**
 * 查找数据，找到所有数据
 * args是个对象 {"pageamount": 10, page: 10}
 */
exports.find = function(collectionName, data = {}, args, callback) {
  let result = []
  
  if (arguments.length !== 4) {
    callback('find函数接受4个参数', null)
    return;
  }

  // 应该省略的条数
  var skipNumber = args.pageamount * args.page;
  // 数目限制
  var limitNumber = args.pageamount;

  // console.log('------------------');
  // console.log('skipnumber: ' + skipNumber + '\nlimitnumber: ' + limitNumber);
  // console.log('------------------');

  _connectDB((err, db) => {
    
    var cursor = db.collection(collectionName).find(data).skip(skipNumber).limit(limitNumber)

    cursor.each((err, doc) => {
      if (err) {
        callback(err, null)
        return 
      }
      if (doc != null) {
        // 放入结果数据
        result.push(doc)
      } else {
        // 遍历结束，没有更多的文档
        callback(null, result);
      }
    })
  })
}