// 1. 底层JS组合装饰器和目标类 __decorate函数
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
  // argsnum 参数个数
  var argsnum = arguments.length
  // targetinfo 被装饰器修饰的目标【本案例为类】
  // argsnum = 2 装饰器修饰的是类或者构造器参数，targetinfo = target[类名]
  // argsnum = 4 装饰器修饰的是方法【第4个参数desc为null】 targetinfo = 该方法的数据
  // argsnum = 3 装饰器修饰的是方法参数或属性, targetinfo = unfefined
  var targetinfo = argsnum < 3
  ? target
  : desc === null
    ? desc = Object.getOwnPropertyDescriptor(target, key)
    : desc

      // decorator 保存修饰器数组元素
  var decorator
  // 元数据信息，支持reflect-metadata元数据
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') {
    targetinfo = Reflect.decorate(decorators, target, key, desc)
  } else {
    // 装饰器循环，倒着循环，说明同一个目标上有多个装饰器，执行顺序是倒着执行
    for (var i = decorators.length - 1; i >= 0; i--) {
      if (decorator = decorators[i]) {
        // 如果参数小于3 【decorator为类装饰器或构造函数装饰器】执行decorator(targetinfo)
        // 如果参数大于3 【decorator为方法装饰器】 执行decorator(target, key, targetinfo)
        // 如果参数等于3 【decorator为方法参数装饰器或属性装饰器】 执行 decorator(target, key)
        // targetinfo最终为各个装饰器执行后的返回值，但如果没有返回值，
        targetinfo = (argsnum < 3
          ? decorator(targetinfo)
          : argsnum > 3
            ? decorator(target, key, targetinfo)
            : decorator(target, key)
          ) || targetinfo
      }
    }
  }
  // return (argsnum > 3 && targetinfo && Object.defineProperty(target, key, targetinfo)), targetinfo
  // 上面这行等价于  先执行"，" 前的语句， 然后返回 "，" 后的变量值
  argsnum > 3 && targetinfo && Object.defineProperty(target, key, targetinfo)
  return targetinfo
}

// 底层JS 组合装饰器和目标类 __decorate 函数结束
// 不带参数的装饰器
function FirstClassDecorator(params) {
  // console.log('FirstClassDecorator函数的params: ', params);
  return function(targetClass) {
    var targetClassObj = new targetClass()
    targetClassObj.buy()
  }
}

var CustomerService = /** @class */(function () {
  function CustomerService() {
    this.name = '下单'
  }
  CustomerService.prototype.buy = function() {
    console.log(this.name + '购买')
  }
  CustomerService.prototype.placeOrder = function() {
    console.log(this.name + '下单')
  }
  CustomerService = __decorate([
    FirstClassDecorator
  ], CustomerService)
  return CustomerService
}())
