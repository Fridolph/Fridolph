'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 !c 表单 
 ?c Web应用离不开处理表单，本质上，表单就是POST方法发送到服务器的键值对
 ?c koa-body 模块可以用来从POST请求的数据体里面提取键值对
 */
var Koa = require('koa');
var koaBody = require('koa-body');
var app = new Koa();

var main = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
    var body;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = ctx.request.body;

            if (!body.name) ctx.throw(400, '.name required');
            ctx.body = { name: body.name };

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function main(_x) {
    return _ref.apply(this, arguments);
  };
}();

app.use(koaBody());
app.use(main);
app.listen(3000);
//# sourceMappingURL=20.js.map