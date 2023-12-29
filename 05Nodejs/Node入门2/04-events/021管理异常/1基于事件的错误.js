var util = require('util');
var events = require('events');

function MusicPlayer() {
  events.EventEmitter.call(this);
}

util.inherits(MusicPlayer, events.EventEmitter);

var musicPlayer = new MusicPlayer();

musicPlayer.on('play', function(track) {
  this.emit('error', 'unable to play!');
});

// 监听error事件
musicPlayer.on('error', function(err) {
  console.error('Error: ', err);
});

setTimeout(function() {
  musicPlayer.emit('play', 'Little Comets - Jennifer');
}, 1000);

// 当一个EventEmitter实例发生错误时，通常会发出一个error事件。在Node中，error事件被当作特殊的情况，假如没有监听器，那么默认的动作是打印一个堆栈并退出程序。