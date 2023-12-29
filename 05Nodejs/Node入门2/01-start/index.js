/* 使用流  使用CountStream类 */

// 加载countstream.js
var CountStream = require('./countstream');
// 创建一个CountStream的示例用于匹配book的文本计数
var countStream = new CountStream('baidu');
var http = require('http');

// 下载http://www.baidu.com页面
http.get('http://www.baidu.com', function(res) {
  // 从网站中以管道的方式把数据传给countStream用于文本计数
  res.pipe(countStream);
});

countStream.on('total', function(count) {
  console.log('Total matches: ', count);
});