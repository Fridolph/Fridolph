/**
 * http.get(options, callback) HTTP模块还提供了一个更加建便的方法用于处理GET请求： http.get
 *
 * 它是http.request的简化版, 唯一的区别在于http.get自动将请求方法设为了GET请求，同时不需要手动调用req.end()
 */


var http = require('http')

http.get({host: 'www.byvoid.com'}, function(res) {
  res.setEncoding('utf-8')
  res.on('data', function(data) {
    console.log(data);
  })
})