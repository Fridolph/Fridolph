"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var StringUtil = /** @class */ (function () {
    function StringUtil() {
    }
    StringUtil.trimSpace = function (text) {
        if (typeof text === 'string')
            return text.replace(/\s+/g, '');
        return (' ' + text + ' ').replace(/\s/, '');
    };
    return StringUtil;
}());
// 方法装饰器
function FnInterceptor() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (targetClassPrototype, fnName, dataProps) {
        var targetFn = dataProps.value;
        dataProps.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args = args.map(function (arg) {
                if (typeof arg === 'string')
                    return StringUtil.trimSpace(arg);
                return arg;
            });
            console.log('前置拦截 -> 输出args', args);
            targetFn.apply(this, args);
            console.log('后置拦截 -> 再次输出args');
        };
    };
}
// 方法装饰器实现拦截器前置、后置功能
var ReleService = /** @class */ (function () {
    function ReleService() {
        this.roleName = '管理员';
    }
    ReleService.prototype.distribRoles = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log('分配角色');
    };
    __decorate([
        FnInterceptor(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ReleService.prototype, "distribRoles", null);
    return ReleService;
}());
var releService = new ReleService();
releService.distribRoles('测 试 一 下', 'ha ha ha ');
