var http = require('http')

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello, Node.js!");
  response.end();
}).listen(8888)