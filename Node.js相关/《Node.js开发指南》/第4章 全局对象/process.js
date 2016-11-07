/**
 * process是一个全局变量，即global对象的属性。它用于描述当前node.js进程状态的对象
 * 提供一个与操作系统的简单接口。通常在你写本地命令行程序的时候，少不了要和它打交道
 */


/**
 * process.argv 是命令行参数数组，
 * 第一个元素是node, 
 * 第二个元素是脚本文件名，
 * 从第三个元素开始每个元素是一个运行参数. 
 */


process.stdin.resume()

process.stdin.on('data', function(data) {
  process.stdout.write('read from console: ' + data.toString());
})

/**
 * process.nextTick(callback) 的功能是为事件循环设置一项任务， Node.js会在下次事件循环调响应时调用callback
 *
 * Node.js适合 I/O密集型的应用，而不是计算密集型的应用，因为一个Node.js进程只有一个线程，因此在任何时刻都只有一个事件在执行。
 *
 * 如果这个事件占用大量的CPU时间，执行事件循环中的下一个事件就需要等待很久， 因此Node.js的一个编程原则就是尽量缩短每个事件的执行时间.
 *
 * process.nextTick() 提供了一个这样的工具，可以把复杂的工作拆散，变成一个个较小的事件
 */

function doSomething(args, callback) {
  somethingComplicated(args);
  callback();
}

doSomething(function onEnd() {
  compute()
})

/**
 * 我们假设 compute() 和 somethingComplicated() 是两个较为耗时的函数，以上的程序在调用doSomething()时会先执行 somethingComplicated()
 *
 * 然后立即调用回调函数， 在onEnd()中又会执行compute()
 * 
 */

function doSomething(args, callback) {
  somethingComplicated(args);

  process.nextTick(callback);
}

doSomething(function onEnd() {
  compute();
})

/**
 * 改写后的程序会把上面耗时的操作拆分为两个事件， 减少每个事件的执行时间，提高事件响应速度
 *
 * 不要使用 setTimeout(fn, 0)代替process.nextTick(callback) 前者比后者效率要低得多
 */