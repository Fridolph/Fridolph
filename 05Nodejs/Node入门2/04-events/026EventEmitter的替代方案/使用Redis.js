var redis = require('redis');
var client1 = redis.createClient();
var client2 = redis.createClient();
var msg_count = 0;

client1.on('subscribe', function(channel, count) {
  client2.publish('channel', 'Hello World!');
});

client1.on('message', function(channel, message) {
  console.log('client1 channel ' + channel + ': ' + message);

  client1.unsubsribe();
  client1.end();
  client2.end();  // 当使用Redis模块的时候，确保关闭客户端连接
});

client1.subscribe('channel');