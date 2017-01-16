var Express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var path = require('path')
var fs = require('fs')

var objMulter = multer({
  dest: './www/upload/'
})

var server = Express()

server.use(objMulter.any())

server.post('/', function(req, res) {

  // console.log(req.files[0].originalname);

  // 新文件名
  //   -- './www/upload/e72664556a54f869d41cd7ee233b54ed' + '.png'
  //   -- path + ext
  // var newName = req.files[0].path + path.extname(req.files[0])
  // var newName = req.files[0].path + path.extname(req.files[0].originalname)
  // console.log('ext:', newName);

  fs.rename(req.files[0].path, newName, function(err) {
    if (err) {
      console.log('上传失败: \n', err);
    } else {
      res.send('文件上传成功')
    }
  })

  // 1.获取原始文件扩展名
  
  
  // 2.重命名临时文件
})

server.listen(8080, function() {
  console.log('打开端口8080');
})