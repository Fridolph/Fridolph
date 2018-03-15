'use strict';

// HTTP Response的类型
// Koa默认返回的类型是text/plain 如果想返回其他类型内容，可以先用 ctx.request.accepts判断
// 客户端希望接收什么数据，然后使用ctx.response.type指定返回类型
var Koa = require('koa');
var app = new Koa();

var main = function main(ctx) {
  if (ctx.request.accepts('xml')) {
    ctx.response.type = 'xml';
    ctx.response.body = '<data>Hello World</data>';
  } else if (ctx.request.accepts('json')) {
    ctx.response.type = 'json';
    ctx.response.body = { data: 'Hello world' };
  } else if (ctx.request.accepts('html')) {
    ctx.response.type = 'html';
    ctx.response.body = '<h1>Hello World</h1>';
  } else {
    ctx.response.type = 'text';
    ctx.response.body = 'Hello World';
  }
};

app.use(main);
app.listen(3000);
//# sourceMappingURL=03.js.map