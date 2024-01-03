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
// 方法装饰器
/**
 *
 * @param {*} targetClassPrototype
 * @param {string} fnName
 * @param {PropertyDescriptor} methodDescriptor
 */
function MyMethodDecorator(fnPath) {
    return function (targetClassPrototype, fnName, fnDescriptor) {
        console.log('最外层接收的参数: ', fnPath);
        console.log('目标类的原型: ', targetClassPrototype);
        console.log('装饰的方法名: ', fnName);
        console.log('方法装饰器: ', fnDescriptor);
        // fnDescriptor.value() 执行被装饰器修饰的方法
    };
}
// 目标类
var ReleService = /** @class */ (function () {
    function ReleService() {
        this.roleName = '管理员';
    }
    ReleService.prototype.distribRoles = function () {
        console.log('分配角色');
    };
    __decorate([
        MyMethodDecorator('/searchFood'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ReleService.prototype, "distribRoles", null);
    return ReleService;
}());
