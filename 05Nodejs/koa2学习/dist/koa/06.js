'use strict';

var Koa = require('koa');
var route = require('koa-route');
var app = new Koa();

var about = function about(ctx) {
  ctx.response.type = 'html';
  ctx.response.body = '<a href="/">Index Page</a>';
};

var main = function main(ctx) {
  ctx.response.body = 'Hello World';
};

app.use(route.get('/', main));
app.use(route.get('/about', about));
app.listen(3000);
//# sourceMappingURL=06.js.map