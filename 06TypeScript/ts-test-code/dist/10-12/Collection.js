"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
