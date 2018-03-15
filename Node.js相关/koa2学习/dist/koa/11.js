'use strict';

/**
 !c 中间件的合成
 ?c koa-compose模块可以将多个中间件合并成一个 
 */

var Koa = require('koa');
var compose = require('koa-compose');
var app = new Koa();

var logger = function logger(ctx, next) {
  console.log(Date.now() + ' ' + ctx.request.method + ' ' + ctx.request.url);
  next();
};

var main = function main(ctx) {
  ctx.response.body = 'Hello World';
};

var middlewares = compose([logger, main]);

app.use(middlewares);
app.listen(3000);
//# sourceMappingURL=11.js.map