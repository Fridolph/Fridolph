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
function loginProperty() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (targetClassPrototype, attrname) {
        console.log('targetClassPrototype', targetClassPrototype);
        console.log('attrname: ', attrname);
        // (targetClassPrototype.constructor as any).custLevelDescri = function() {
        //   console.log('Test 1');
        //   console.log('Test 2');
        // }
    };
}
// 顾客目标类
var CustomerService = /** @class */ (function () {
    function CustomerService() {
        this.custname = '测试人1';
    }
    CustomerService.prototype.show = function () {
        console.log('调用 show: ');
    };
    __decorate([
        loginProperty('登记人2'),
        __metadata("design:type", String)
    ], CustomerService.prototype, "degree", void 0);
    return CustomerService;
}());
// (CustomerService as any).custLevelDescri()
