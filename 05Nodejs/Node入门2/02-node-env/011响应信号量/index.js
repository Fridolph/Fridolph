/* 对POSIX信号添加一个监听器 */

// 从标准输入流中读取，这样程序会一直执行
process.stdin.resume();

// 对SIGHUP信号绑定一个监听器
process.on('SIGHUP', function() {
  console.log('Reloading configuration...');
});

// 显示PID，你可以用它来终止程序
console.log('PID:', process.pid);