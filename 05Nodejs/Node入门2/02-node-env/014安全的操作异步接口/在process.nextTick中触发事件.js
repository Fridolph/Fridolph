var EventEmitter = require('events').EventEmitter;

function complexOperations() {
  var events = new EventEmitter();

  // 这个事件现在会在监听器准备好后触发
  process.nextTick(function() {
    events.emit('success');
  });

  return events;
}

complexOperations().on('success', function() {
  console.log('success!');
});

/**
 * Node在文档中建议，接口要么是同步的，要么是异步的，这表示如果有一个方法接受一个回调，并可能异步地调用它，
 * 那么你也应该在同步的情况下通过process.nextTick来执行它，这样可以确保执行的顺序性。
 */