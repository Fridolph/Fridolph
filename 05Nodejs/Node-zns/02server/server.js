const http = require('http')

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
    var body = arr[1].split('&');
    // body => ['user=fri', 'pwd=123123']
    
    for (var i=0; i<body.length; i++) {
      var keyVal = body[i].split('=');
      // keyVal[] => ['user', 'fri']
      // 
      // keyVal[0] => 名字 key
      // keyVal[1] => 数据 value
      data[keyVal[0]] = keyVal[1]    
    }
  } else {
    var url = req.url;
  }  

  console.log(url, data);

  // request 获取前台的请求数据
  res.write('aaa')
  res.end()
}).listen(8080)