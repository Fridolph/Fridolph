'use strict';

var Koa = require('koa');
var path = require('path');
var serve = require('koa-static');
var app = new Koa();

var main = serve(path.join(__dirname));

app.use(main);

app.listen(3000);
//# sourceMappingURL=12.js.map