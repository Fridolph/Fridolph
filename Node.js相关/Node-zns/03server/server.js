const http = require('http')
const querystring = require('querystring')

http.createServer(function(req, res) {
  // POST - req
  
  var str = '' // 接收数据


  var i = 0;
  // data 有一段数据到达就会触发一次
  req.on('data', function(data) {
    console.log(`--------------------------------------------${i++}次收到数据------------------------------------------`);
    str += data    
  });

  req.on('end', function() {
    // 数据全部到达时 - 只发生一次
    console.log('数据全部到达');
    var POST = querystring.parse(str)
    console.log(POST);
  });
}).listen(8080)