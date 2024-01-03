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
var injectDecorator_1 = require("./injectDecorator");
var ControllerDecorator_1 = require("./ControllerDecorator");
var methodDecorator_1 = require("./methodDecorator");
// 3 编写类 【控制器类】
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.login = function () {
        // let peopleServiceInstance = CollectionInstance.get('userService')
        // peopleServiceInstance.login()
    };
    __decorate([
        (0, injectDecorator_1.Inject)('UserService'),
        __metadata("design:type", void 0)
    ], UserController.prototype, "userService", void 0);
    __decorate([
        (0, methodDecorator_1.Get)('/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "login", null);
    UserController = __decorate([
        (0, ControllerDecorator_1.default)('/')
    ], UserController);
    return UserController;
}());
