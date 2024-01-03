"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function ControllerDecorator(rootPath) {
    return function (targetClass) {
        console.log('执行【类】装饰器', targetClass, '类上的路径', rootPath);
        console.log('----------下面处理所有 fnName 上的装饰器 -----------');
        Object.keys(targetClass.prototype).forEach(function (fnName) {
            console.log('fnName: ', fnName);
            var reqPath = Reflect.getMetadata('path', targetClass.prototype, fnName);
            console.log('类上的reqPath: ', reqPath);
        });
    };
}
exports.default = ControllerDecorator;
