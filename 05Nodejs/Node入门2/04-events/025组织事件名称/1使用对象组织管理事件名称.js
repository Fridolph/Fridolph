var util = require('util');
var events = require('events');

function MusicPlayer() {
  events.EventEmitter.call(this);

  this.on(MusicPlayer.events.play, this.play.bind(this));
}

// 用一个对象存储事件名称，可以像这样罗列清晰
var e = MusicPlayer.events = {
  play: 'play',
  pause: 'pause',
  stop: 'stop',
  ff: 'ff',
  rw: 'rw',
  addTrack: 'add-track',
};

util.inherits(MusicPlayer, events.EventEmitter);

MusicPlayer.prototype.play = function() {
  this.playing = true;
}

var musicPlayer = new MusicPlayer();

// 当添加新的事件时，类的用户可以引用对象的事件的列表而不是用字符串硬编码事件名称
musicPlayer.on(e.play, function() {
  console.log('Now playing');
});

musicPlayer.emit(e.play);

