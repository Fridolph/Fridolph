'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 !c 异步中间件 
 ?c 迄今为止，所有例子的中间件都是同步的，不包含异步操作，那么我们来看看异步操作
 */

var Koa = require('koa');
var fs = require('fs.promised');
var app = new Koa();

var main = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx.response.type = 'html';
            _context.next = 3;
            return fs.readFile('./demos/template.html', 'utf8');

          case 3:
            ctx.response.body = _context.sent;

            next();

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function main(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

app.use(main);

app.listen(3000);
//# sourceMappingURL=10.js.map