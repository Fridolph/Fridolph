/* 
* @Author: fys
* @Date:   2016-09-07 14:16:09
* @Last Modified time: 2016-09-07 14:18:04
*/

/**
 * 当 error 被发射时，EventEmitter 规定如果没有响
应的监听器，Node.js 会把它当作异常，退出程序并打印调用栈。  
 *
 * 我们一般要为会发射 error
事件的对象设置监听器，避免遇到错误后整个程序崩溃。
 */

var events = require('events')
var emitter = new events.EventEmitter()

emitter.emit('error')