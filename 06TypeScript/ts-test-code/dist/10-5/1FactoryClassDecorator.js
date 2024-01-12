"use strict";
// 需求：对已经开发好的项目中的一个类，创建实例时
// 打印以下日志信息：
// (1) 输出哪一个类被创建了
// (2) 输出传递了哪些参数信息
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// 1. 完成日志信息的装饰器
function LoggerInfoDecorator(TargetClass) {
    // return function(targetClass: any) {
    //   console.log('日志信息: ', targetClass.name);
    // }
    var LoggerMiddleClass = /** @class */ (function (_super) {
        __extends(LoggerMiddleClass, _super);
        function LoggerMiddleClass() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            console.log('日志信息', TargetClass.name);
            return _this;
        }
        return LoggerMiddleClass;
    }(TargetClass));
    return LoggerMiddleClass;
}
// 目标类
// @LoggerInfoDecorator
var Test = /** @class */ (function () {
    // 先执行原来的构造函数
    function Test(name) {
        this.name = name;
    }
    Test.prototype.eat = function () {
        console.log('<<< eat >>>');
    };
    return Test;
}());
