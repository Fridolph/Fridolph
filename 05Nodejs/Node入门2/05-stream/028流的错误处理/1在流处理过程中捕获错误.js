var fs = require('fs');
// 尝试打开的时候会引发一个错误
var stream = fs.createReadStream('not-found');

// 使用事件的API来添加一个错误处理句柄
stream.on('error', (err) => {
  console.trace();
  console.error('Stack:', err.stack);
  console.error('The error raised was:', err);
});

/**
 * 这里我们企图打开一个不存在的文件，引起一个错误事件的触发。
 * 通过句柄传过来的错误对象通常还有额外信息帮助追查错误。举例，
 * 堆栈可能包含行信息，而且console.trace()能够生成完整的堆栈跟踪。
 * 监听时使用console.trace()会将Node核心模块events.js实现读流功能的地方跟踪到。
 * 这就以为着你能够准备知道在哪里触发了。
 */