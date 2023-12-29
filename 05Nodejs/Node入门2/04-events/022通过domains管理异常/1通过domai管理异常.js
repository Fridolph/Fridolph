var util = require('util');
// domain模块必须被加载，然后利用create方法创建一个相应的实例
var domain = require('domain');
var events = require('events');
var audioDomain = domain.create();

function AudioDevice() {
  events.EventEmitter.call(this);

  this.on('play', this.play.bind(this));
}

util.inherits(AudioDevice, events.EventEmitter);

AudioDevice.prototype.play = function() {  
  this.emit('error', 'not implemented yet');
};

function MusicPlayer() {
  events.EventEmitter.call(this);

  this.audioDevice = new AudioDevice();
  this.on('play', this.play.bind(this));

  // 这个错误及其他任何的错误都会被同一个error方法所处理
  this.emit('error', 'No audio tracks are available');
}

util.inherits(MusicPlayer, events.EventEmitter);

MusicPlayer.prototype.play = function() {
  this.audioDevice.emit('play');
  console.log('Now playing');;
};

// audioDomain.on('error', function(err) {
//   console.log('audioDomain error:' err);
// });

// 任何在这个回调中导致的错误都会被domain覆盖到
audioDomain.run(function() {
  var musicPlayer = new MusicPlayer()

  musicPlayer.play();
});

/**
 * Domain可以与EventEmitter子类、网络代码，还有异步文件系统的方法一起使用。
 * 要可视化域名是如何工作的，想象domain.run回调方法包装代码，即时在回调中代码会触发事件发生在它的外面。
 * 被抛出的任何错误仍然会被捕获。
 *
 * 没有domain，使用throw抛出的异常可能将程序处于未知状态。domain避免这种情况，并可优雅地处理异常。
 *
 * 
 */

