"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = void 0;
require("reflect-metadata");
function Inject(injectId) {
    return function (targetClassPrototype, propertyKey) {
        console.log('进入 注入属性装饰器 injectId 为', injectId);
        // 重要
        var InjectServiceClass = Reflect.getMetadata('design:type', targetClassPrototype, propertyKey); // Reflect.getMetadata 拿到装饰器修饰的 属性的 类型
        // console.log('InjectServiceClass: ', InjectServiceClass);
        // InjectServiceClass.set('userService', new InjectServiceClass())
        // console.log('InjectServiceClass.prototype: ', InjectServiceClass.prototype);
    };
}
exports.Inject = Inject;
