"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = void 0;
require("reflect-metadata");
function Get(path) {
    return function (targetClassPrototype, fnName, dataprops) {
        console.log('执行方法装饰器');
        Reflect.defineMetadata('path', path, targetClassPrototype, fnName);
    };
}
exports.Get = Get;
