'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 !c 文件上传
 ?c koa-body 模块还可以用来处理文件上传
 */
var Koa = require('koa');
var os = require('os');
var path = require('path');
var koaBody = require('koa-body');
var app = new Koa();

var main = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
    var tmpdir, filePaths, files, key, file, filePath, reader, writer;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tmpdir = os.tmpdir();
            filePaths = [];
            files = ctx.request.body.files || {};


            for (key in files) {
              file = files[key];
              filePath = path.join(temdir, file.name);
              reader = fs.createReadStream(file.path);
              writer = fs.createWriteStream(filePath);

              reader.pipe(writer);
              filePaths.push(filePath);
            }

            ctx.body = filePaths;

          case 5:
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

app.use(koaBody({
  multipart: true
}));
app.use(main);
app.listen(3000);
//# sourceMappingURL=21.js.map