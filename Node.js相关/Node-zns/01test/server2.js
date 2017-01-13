const http = require('http')

var server = http.createServer(function(req, res) {
  switch (req.url) {
    case '/1.html': 
      res.write('111');
      break;
    case '/2.html':
      res.write('222');
      break;
    default:
      res.write('404');
      break;
  }

  
  res.end();
});

// 监听 
// 端口
server.listen(8080);