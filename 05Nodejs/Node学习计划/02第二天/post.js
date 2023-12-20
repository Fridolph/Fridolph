var http = require('http');

var server = http.createServer(function(req, res) {
  // 如果访问地址是这个，并且请求类型为post
  if (req.url === "/dopost" && req.method.toLowerCase() === "post") {
    var alldata = "";
    req.addListener('data', chunk => {
      alldata += chunk;
      // console.log(chunk);
    })
    req.addListener('end', () => {
      
      console.log('-------------alldata.toString()-------------');
      console.log(alldata.toString());
    })
  }
})

server.listen(8080);
console.log('127.0.0.1:8080');