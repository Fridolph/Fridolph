var express = require('express');
var app = express();
var router = require('./controller/router')

// 设置模版引擎
app.set('view engine', 'ejs');

// 路由中间件
// 提供静态资源
app.use(express.static('./public'));
app.use(express.static('./uploads'));
// 首页
app.get('/', router.showIndex);
app.get('/:albumName', router.showAlbum);
app.get('/up', router.showUp);
app.post('/up', router.doPost);

// 最后的中间件 404 
app.use((req, res) => {
  res.render("err", {
    "baseurl": req.pathname
  })
})

app.listen(3000);