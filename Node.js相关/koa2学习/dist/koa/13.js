'use strict';

var Koa = require('koa');
var route = require('koa-route');
var app = new Koa();

var redirect = function redirect(ctx) {
  ctx.response.redirect('/');
  ctx.response.body = '<a href="/">Index Page</a>';
};

var main = function main(ctx) {
  ctx.response.type = 'html';
  ctx.response.body = '<h1>Index Page</h1>';
};

app.use(route.get('/', main));
app.use(route.get('/redirect', redirect));
app.listen(3000);
//# sourceMappingURL=13.js.map