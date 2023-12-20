var express = require('express')
var config = require('./config/index')
var port = process.env.PORT || config.build.port
var app = express()
var router = express.Router()

router.get('/', function(req, res, next) {
  req.url = './index.html'
  next();
});

app.use(router);

var appData = require('./data.json')
// 定义拿到的数据变量
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings
// 编写路由
var apiRoutes = express.Router()
// 接口
apiRoutes.get('/seller', function(req, res) {
  res.json({
    errno: 0,
    data: seller
  })
})

apiRoutes.get('/goods', function(req, res) {
  res.json({
    errno: 0,
    data: goods
  })
})

apiRoutes.get('/ratings', function(req, res){
  res.json({
    errno: 0,
    data: ratings
  })
})

// 使用路由
app.use('/api', apiRoutes);

app.use(express.static('./dist'));

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:' + port + '\n');
})

