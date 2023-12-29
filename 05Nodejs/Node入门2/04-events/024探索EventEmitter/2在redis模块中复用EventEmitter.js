var redis = require('redis');
var client = redis.createClient();

client.on('error', function(err) {
  console.error('Error: ', err);
});

client.on('monitor', function(timestamp, args) {
  console.log('Time:', timestramp, 'arguments:', args);
});

client.on('ready', function() {
  // Start app here
});

/**
 * 这个monitor事件是通过redis模块颁布的，用于追踪内部是否有活动发生
 * 当使用拆分路由技术将路由放在不同的问件中时，可以通过调用res.app.emit(event)来发送事件
 */