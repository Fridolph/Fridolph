'use strict';

// Koa的最大特色，中间件的设计
var Koa = require('koa');
var app = new Koa();

var main = function main(ctx) {
  console.log(Date.now() + ' ' + ctx.request.method + ' ' + ctx.request.url);
  ctx.response.body = 'Hello World';
};

app.use(main);
app.listen(3000);
//# sourceMappingURL=07.js.map