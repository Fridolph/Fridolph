'use strict';

/**
 !c error事件监听
 ?c 运行过程中一旦出错，Koa会触发一个error事件。
 ?c 监听这个事件，也可以处理错误
 */

var Koa = require('koa');
var app = new Koa();

var main = function main(ctx) {
  ctx.response.body = 'Hello World';
  ctx.throw(500);
};

app.on('error', function (err, ctx) {
  console.error('server error', err);
});

app.use(main);
app.listen(3000);
//# sourceMappingURL=17.js.map