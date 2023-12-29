// 1加载网络模块
var net = require('net');
// 2创建ID来引用连接的每一个客户端
var clients = 0;

var server = net.createServer(client => {
  // 3当客户端连接时，ID自增，并且存放在当前局部作用域下
  clients++;

  var clientId = clients;  
  console.log('Client connected:', clientId);

  // 4绑定end事件来追踪客户端断开连接
  client.on('end', () => {
    console.log('Client disconnected', clientId);
  });

  // 5使用客户端的ID给每个客户端打招呼
  client.write('Welcome client: ' + clientId + 'rn');
  // 6使用管道把客户端的数据返回给客户端
  client.pipe(client);
});

// 绑定到8000端口开始接收新链接
server.listen(8000, () => {
  console.log('Server started on port 8000.');
});