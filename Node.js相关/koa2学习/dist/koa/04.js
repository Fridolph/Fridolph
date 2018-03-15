'use strict';

var Koa = require('koa');
var fs = require('fs');
var app = new Koa();

var main = function main(ctx) {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./demos/template.html');
};

app.use(main);
app.listen(3000);
//# sourceMappingURL=04.js.map