"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectContructor = void 0;
require("reflect-metadata");
function InjectContructor(injectId) {
    // console.log('injectId: ', injectId);
    return function (targetClass, name, index) {
        // targetClass类 == 获取的是使用这个装饰器的类，本例是 UserController类
        console.log('targetClass: ', targetClass);
        console.log('paramName: ', name);
        // console.log('paramIndex: ', index);
        var constructorParamArr = Reflect.getMetadata('design:paramtypes', targetClass);
        console.log('constructorParamArr: ', constructorParamArr);
    };
}
exports.InjectContructor = InjectContructor;
