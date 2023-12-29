var util = require('util');
var events = require('events');

function MusicPlayer() {
  events.EventEmitter.call(this);
}

util.inherits(MusicPlayer, events.EventEmitter);

/**
 * 结合一个简单构造函数和util.inherits是创建自定义事件驱动类的最简单也是最常见的方法
 */