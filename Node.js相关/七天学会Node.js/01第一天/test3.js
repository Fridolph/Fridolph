/**
 * 实现功能： getContentType(extname) -> str
 * 输入格式，查询是否有格式，并返回相应的字符串
 */

const fs = require('fs')

// 1. 异步读取文件
fs.readFile('./mime.json', 'utf8', (err, data) => {
  if (err) {
    throw err
  } else {
    // 2. 处理读出的数据
    getMIME(data, '.aaa');
  }
})

var kvObj = {}
var getContentType = (function() {
  return {
    add: function(k, v) {
      kvObj[k] = v;
    },
    remove: function() {
      kvObj[k] && delete kvObj[k];
    },
    get: function(k) {
      return kvObj[k]
    }
  }
})()


function getMIME(data, extname) {
  var json = JSON.stringify(data);
  var str = json.replace(/\s+/g, '').replace(/(\\n\\)+/g, '').replace(/\\/g, '').replace(/n\}/g, '}').replace(/\"\{/, '').replace(/\}\"/, '');
  var arr = str.split(",");  
  
  for (let i=0; i<arr.length; i++) {
    getContentType.add(arr[i].split(":")[0], arr[i].split(":")[1]);           
  }
  // console.log(getContentType.get('".mp3"'));
  return getContentType.get('".mp3"');

}