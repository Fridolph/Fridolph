const http = require('http')
const url = require('url')

var server = http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html; charset=UTF8"})
  // 得到查询部分
  var queryObj = url.parse(req.url, true).query;
  var name = queryObj.name;
  var age = queryObj.age;
  var sex = queryObj.sex;
  // console.log('req.url   --- >  ', req.url);
  // console.log('queryObj  --- >  ', queryObj);

  res.end(`服务器接收到了表单请求。 \n姓名是：${name}\n年龄是：${age}\n性别是：${sex}`)
})

server.listen(8080)