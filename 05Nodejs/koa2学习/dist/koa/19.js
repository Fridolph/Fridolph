'use strict';

/**
 !c Cookies
 ?c ctx.cookies用来读写cookie
 */

var Koa = require('koa');
var app = new Koa();

var main = function main(ctx) {
  var n = Number(ctx.cookies.get('view') || 0) + 1;

  ctx.cookies.set('view', n);
  ctx.response.body = n + 'views';
};

app.use(main);

app.listen(3000);
//# sourceMappingURL=19.js.map