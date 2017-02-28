/**
 * 单例模式的定义是： 保证一个类仅有一个实例，并提供一个访问它的全局访问点
 *
 * 要实现一个标准的单例模式并不复杂，无非是用一个变量来标志当前是否已经为某个类创建过对象，
 * 如果是，则在下一次获取该类的实例时，直接返回之前创建的对象。
 */

// var Singleton = function(name) {
//   this.name = name;
//   this.instance = null;
// };

// Singleton.prototype.getName = function() {
//   console.log(this.name);
// }

// Singleton.getInstance = function(name) {
//   if (!this.instance) {
//     this.instance = new Singleton(name);    
//   }
//   return this.instance;
// }

// var a = Singleton.getInstance('sven1');
// var b = Singleton.getInstance('sven2');

// console.log(a === b);

// 或者
var Singleton = function(name) {
  this.name = name;
}

Singleton.prototype.getName = function() {
  console.log(this.name);
};

Singleton.getInstance = (function() {
  var instance = null;

  return function(name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  }
})();

var a = Singleton.getInstance('sven1');
var b = Singleton.getInstance('sven2');

console.log(a === b);