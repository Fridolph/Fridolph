"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
// 2 编写业务类
var UserService = /** @class */ (function () {
    function UserService() {
        this.pname = '人民';
    }
    UserService.prototype.login = function () {
        console.log("".concat(this.pname, " \u4E8E ").concat(new Date().getDay(), "\u53F7 \u767B\u5F55\u4E86..."));
    };
    return UserService;
}());
exports.UserService = UserService;
