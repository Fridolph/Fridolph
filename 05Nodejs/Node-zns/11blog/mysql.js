const mysql = require('mysql')

// 1. 连接
// createConnection(哪台服务器，端口，用户名，密码，库)
var db = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: 'keke',
  database: '20170116'
});

// 2. 查询  典型的异步操作
// query(干啥，回调)
db.query("SELECT * FROM `user_table`;", (err, data) => {
  if (err) {
    console.log('出错了', err);
  } else {
    // console.log('成功了', data);
    console.log('传回来的数据是：\n', JSON.stringify(data));
  }
});