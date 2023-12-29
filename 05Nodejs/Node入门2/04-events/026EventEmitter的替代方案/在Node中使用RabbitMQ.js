/**
 * 如果需要水平扩展一个分布式集群，那么一个AMQP比如RabbitMQ将非常好用。
 * rabbitmq-nodejs-client模块有一个publish/subsribe的API。
 */

var rabbitHub = require('rabbitmq-nodejs-client');
var subHub = rabbitHub.create({ task: 'sub', channel: 'myChannel' });
var pubHub = rabbitHub.create({ task: 'pub', channel: 'myChannel' });

subHub.on('connection', function(hub) {
  hub.on('message', function(msg) {
    console.log(msg);
  }.bind(this));
});

subHub.connect();

pubHub.on('connection', function(hub) {
  hub.send('Hello world!');
});

pubHub.connect();