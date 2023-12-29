var util = require('util');
var events = require('events');
var AudioDevice = {
  play: function(track) {
    // Stub: Trigger playback through iTunes, mpg123, etc.
  },
  stop: function() {

  }
}

function MusicPlayer() {
  this.playing = false;
  // 可以配置类的状态，稍后在EventEmitter的构造器会按需被调用到
  events.EventEmitter.call(this);
}

// 这里的inherits方法将方法从一个原型拷贝到另外一个原型，这是基于EventEmitter创建类的通用模式
util.inherits(MusicPlayer, events.EventEmitter);

var musicPlayer = new MusicPlayer();

musicPlayer.on('play', function(track) {
  this.playing = true;
  AudioDevice.play(track);
});

musicPlayer.on('stop', function() {
  this.playing = false;
  AudioDevice.stop();
});

// emit方法用于触发事件
musicPlayer.emit('play', 'The Roots - The Fire');

setTimeout(function() {
  musicPlayer.emit('stop');
}, 1000);






// // 从EventEmitter继承
// var util = require('util');
// var events = require('events');

// function player() {
//   this.playing = false;
//   events.EventEmitter.call(this);
// }

// util.inherits(Player, events.);EventEmitter