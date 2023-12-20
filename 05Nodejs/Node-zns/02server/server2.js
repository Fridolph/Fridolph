const http = require('http')
const urllib = require('url')

http.createServer(function(req, res) {
  console.log(req.url, '\n\n');

  var data = {};
  
  if (req.url.indexOf('?') !== -1) {
    // 访问地址 http://localhost:8080/aaa.html?user=fri&pwd=123123
    // req.url
    var arr = req.url.split('?')
    // arr => ['aaa.html', 'user=fri&pwd=123456']
    var url = arr[0];
    // arr[0] => 地址 '/aaa.html' 请求头
    // arr[1] => 数据 '/user=fri&pwd=123123'   请求体
    
    data = querystring.parse(arr[1])
    
  } else {
    var url = req.url;
  }  

  console.log(url, data);

  // request 获取前台的请求数据
  res.write('aaa')
  res.end()
}).listen(8080)