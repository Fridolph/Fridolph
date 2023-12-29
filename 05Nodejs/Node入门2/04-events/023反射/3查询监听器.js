/**
 * 给Pulsar类添加一个stop方法，当stop方法被调用时，它会检查，看看是否有任何的listener，否则会引发错误
 * 检查监听器是一个很好的方式来阻止不正确的方法，但这不是必须的
 */


 var util = require('util');
 var events = require('events');

 function Pulsar(speed, times) {
   events.EventEmitter.call(this);

   var self = this;
   this.speed = speed;
   this.times = times;

   this.on('newListener', function(eventName, listener) {
     if (eventName === 'pulse') {
       self.start();
     }
   }); 
 }

 util.inherits(Pulsar, events.EventEmitter);

 Pulsar.prototype.start = function() {
   var self = this;
   var id = setInterval(function() {
     self.emit('pulse');
     self.times--;

     if (self.times === 0) {
       clearInterval(id);
     }
   }, this.speed);
 }

 var pulsar = new Pulsar(500, 5);

 // 每次暂停都显示一个点
 pulsar.on('pulse', function() {
   console.log('.');
 });

Pulsar.prototype.stop = function() {
  if (this.listeners('pulse').length === 0) {
    throw new Error('No listeners have been added!');
  }
}

var pulsar = new Pulsar(500, 5);

pulsar.stop();