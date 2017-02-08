var express = require('express');
var app = express();
var router = require('./controller/router')

// 设置模版引擎
app.set('view engine', 'ejs');

// 路由中间件
// 提供静态资源
app.use(express.static('./public'));
// 首页
app.get('/', router.showIndex);

app.listen(3000);