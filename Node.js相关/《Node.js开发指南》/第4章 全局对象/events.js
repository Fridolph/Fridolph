var events = require('events')

var emitter = new events.EventEmitter()

emitter.on('someEvent', function(arg1, arg2) {
  console.log('listener1', arg1, arg2);
})


emitter.on('someEvent', function(arg1, arg2) {
  console.log('listener2', arg1, arg2);  
})

emitter.emit('someEvent', 'byvoid', 1991);

/**
 * emitter 为事件 someEvent 注册了两个事件监听器 然后发射了someEvent事件。 运行结果中可以看到两个事件监听器回调函数被先后调用
 *
 * EventEmitter.emit(event, [arg1], [arg2], [...]) 发射event事件， 传递若干可选参数到事件监听器的参数表
 *
 * EventEmitter.once(event, listener)移除指定事件的某个监听器， listener 必须是该事件已经注册过的监听器
 *
 * EventEmitter.removeAllListeners([event]) 移除所有事件的所有监听器， 如果指定event, 则移除指定事件的所有监听器
 */
