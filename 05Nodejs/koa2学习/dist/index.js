'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require('fs');

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readFileAsync = (0, _util.promisify)(_fs.readFile);
var yewu = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(path) {
    var data, name;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return readFileAsync(path);

          case 3:
            data = _context.sent;
            name = JSON.parse(data).name;

            console.log(name);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 8]]);
  }));

  return function yewu(_x) {
    return _ref.apply(this, arguments);
  };
}();
yewu('./package.json');
//# sourceMappingURL=index.js.map