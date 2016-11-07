/* 
* @Author: fys
* @Date:   2016-09-07 09:23:46
* @Last Modified time: 2016-09-07 10:17:06
*/

var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<h1>Node.js~ HHH</h1>');
  res.end('<p>Hello World!</p>');
}).listen(3000);

console.log('HTTP server is listening at port 3000.');