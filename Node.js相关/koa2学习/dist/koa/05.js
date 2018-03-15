'use strict';

var Koa = require('koa');
var app = new Koa();

var main = function main(ctx) {
  if (ctx.request.path !== '/') {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">Index Page</a>';
  } else {
    ctx.response.body = 'Hello World';
  }
};

app.use(main);
app.listen(3000);
console.log('open localhost:3000');
//# sourceMappingURL=05.js.map