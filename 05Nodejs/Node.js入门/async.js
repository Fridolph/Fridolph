/*
 * @Author: fridolph 
 * @Date: 2017-07-13 17:40:27 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-07-13 17:53:54
 */

// koa1
var koa = require('koa');
var app = koa();

app.use(function* responseTime(next) {
  var start = new Date(); // 1
  yield next; // 2

  var ms = new Date() - start; // 10
  this.set('X-Response-Time', ms + 'ms');
})

app.use(function* logger(next) {
  var start = new Date(); // 3
  yield next; // 4

  var used = new Date() - start; // 9
  console.log(
    '%s %s %s %sms',
    this.method,
    this.originalUrl,
    this.status,
    used
  );
})

app.use(function* conntentLength(next) {
  yield next; //5
  if (!this.body) return; // 8

  this.set('Content-Length', this.body.length);
})

app.use(function* body(next) {
  yield next; //6
  if (this.path !== '/') return; //7
  this.body = 'hello world';
})
app.listen(3000);