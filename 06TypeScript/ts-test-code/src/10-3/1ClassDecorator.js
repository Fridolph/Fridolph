var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function FirstClassDecorator(targetClass) {
    var targetClassObj = new targetClass();
    targetClassObj.buy();
    console.log('%c [ targetClass.name ]-3', 'font-size:13px; background:pink; color:#bf2c9f;', targetClass.name);
}
var CustomerService = /** @class */ (function () {
    function CustomerService() {
        this.name = '下单';
    }
    CustomerService.prototype.buy = function () {
        console.log('%c [ buy ]-10', 'font-size:13px; background:pink; color:#bf2c9f;', this.name + '购买');
    };
    CustomerService.prototype.placeholder = function () {
        console.log('%c [ placeholder ]-13', 'font-size:13px; background:pink; color:#bf2c9f;', this.name + '下单购买');
    };
    CustomerService = __decorate([
        FirstClassDecorator
    ], CustomerService);
    return CustomerService;
}());
