'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 !c 处理错误的中间件
 ?c 为了方便处理错误，最好使用try...catch将其捕获。但是，为每个中间件都写try...catch太麻烦
 ?c 我们可以让最外层的中间件，负责所有中间件的错误处理，下例：
 */

var Koa = require('koa');
var app = new Koa();

var handler = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return next();

          case 3:
            _context.next = 9;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);

            ctx.response.status = _context.t0.statusCode || _context.t0.status || 500;
            ctx.response.body = {
              message: _context.t0.message
            };

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 5]]);
  }));

  return function handler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// const main = (ctx, next) => {
//   ctx.response.body = 'Hello World'
//   next()
// }

var error = function error(ctx) {
  ctx.throw(500);
};

// app.use(main)
app.use(error);

app.listen(3000);
//# sourceMappingURL=16.js.map