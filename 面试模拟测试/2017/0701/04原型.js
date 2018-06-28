// 1. 每一个函数都有一个prototype属性，属性值是一个对象，该对象中存储了当前类共实例调去使用的共有属性和方法
// 2. 浏览器默认给原型开辟的堆内存中 - 有一个属性 constructor 存储的是当前类(构造函数)本身
// 3. 每一个对象（实例）都有一个 __proto__ 原型链属性，这个属性指向当前实例所属类(构造函数)的原型

function Fn() {
  this.x = 100
  this.y = 200
  this.getX = function() {
    console.log(this.x)
  }
}

Fn.prototype.getX = function() {
  console.log(this.x);
}
Fn.prototype.getY = function() {
  console.log(this.y);
}
var f1 = new Fn
var f2 = new Fn
console.log(f1.getX === f2.getX) // false
console.log(f1.getY === f2.getY) // true // 该08了
