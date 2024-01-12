"use strict";
// Inject依赖注入装饰器 - 初步
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
// 1 集合类
var Collection = /** @class */ (function () {
    function Collection() {
        this.containerMap = new Map();
    }
    Collection.prototype.set = function (id) {
        return this.containerMap.get(id);
    };
    Collection.prototype.get = function (id) {
        return this.containerMap.get(id);
    };
    Collection.prototype.has = function (id) {
        return this.containerMap.has(id);
    };
    Collection.collection = new Collection();
    return Collection;
}());
exports.default = Collection.collection;
// 2 编写业务类
var UserService = /** @class */ (function () {
    function UserService() {
        this.pname = '人民';
    }
    UserService.prototype.login = function () {
        console.log("".concat(this.pname, " \u4E8E ").concat(new Date().getDay(), "\u53F7\u767B\u5F55\u4E86..."));
    };
    return UserService;
}());
exports.UserService = UserService;
