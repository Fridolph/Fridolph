// 将一个监听器绑定到一个事件，当一个特定的路由被访问时，这个事件将被触发
var express = require('express');
var app = express();

app.on('hello-alert', function() {
  console.warn('Warning!');
});

app.get('/', function(req, res) {
  res.app.emit('hello-alert');
  res.send('hello world');
});

app.listen(3000);

/**
 * 如果router并定义在另一个文件中，那么可能无法访问app对象，除非它被定义成全局对象
 */