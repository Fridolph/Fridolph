/**
 * 下面展示了一个返回EventEmitter实例的方法。
 * 这个想法是提供一个基于事件的接口，允许调用者订阅这个事件在内部执行异步方法。
 *
 * 错误地通过事件触发异步方法 
 */

var EventEmitter = require('events').EventEmitter;

function complexOperations() {
  var events = new EventEmitter();

  events.emit('success');

  return events;
}

// 这个一个在异步回调外触发的事件
complexOperations().on('success', function() {
  console.log('success!');;
});

/**
 * 运行该例不会在最后触发success事件，因为这个事件在监听器订阅之前已经触发了。
 * 通常，一个事件会在另一个异步的操作中触发，但有时候也会提早触发事件，比如在验证入参的时候发现有错误，那么error事件将被触发。
 */