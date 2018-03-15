'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 !c 释放error事件
 ?c 需要注意的是，如果错误被try...catch捕获，就不会触发error事件，
 ?c 必须调用 ctx.app.emit() 手动释放error事件，才能让监听函数生效
 */

var Koa = require('koa');
var app = new Koa();

var handler = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(err, ctx) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return next();

          case 3:
            _context.next = 11;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);

            ctx.response.status = _context.t0.statusCode || _context.t0.status || 500;
            ctx.response.type = 'html';
            ctx.response.body = '<p>Something wrong, please contact administrator.</p>';
            ctx.app.emit('error', _context.t0, ctx);

          case 11:
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

var main = function main(ctx) {
  ctx.throw(500);
};

app.on('error', function (err) {
  console.log('logger error', err.message);
  console.log(err);
});

app.use(handler);
app.use(main);

app.listen(3000);
//# sourceMappingURL=18.js.map