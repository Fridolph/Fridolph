/**
 * 策略模式的定义就是： 定义一系列算法，把它们一个个封装起来，并且使它们可以相关替换
 */

// 最初的实现代码
// var calculateBonus = function(performanceLevel, salary) {
//   if (performanceLevel === 'S') {
//     console.log(salary);    
//     return salary * 4;
//   }
//   if (performanceLevel === 'A') {
//       console.log(salary);
//     return salary * 3;
//   }
//   if (performanceLevel === 'B') {
//       console.log(salary);
//     return salary * 2;
//   }
//   if (performanceLevel === 'C') {
//       console.log(salary);
//     return salary * 1;
//   }  
// }

// calculateBonus('B', 20000);
// calculateBonus('S', 6000);

// 使用组合函数重构代码
// var performanceS = function(salary) {
//   return salary * 4; 
// }
// var performanceA = function(salary) {
//   return salary * 3; 
// }
// var performanceB = function(salary) {
//   return salary * 2; 
// }

// var calculateBonus = function(performanceLevel, salary) {
//   if (performanceLevel === 'S') {
//     console.log(performanceS(salary));
//   }
//   if (performanceLevel === 'A') {
//     console.log(performanceA(salary));
//   }
//   if (performanceLevel === 'B') {
//     console.log(performanceB(salary));
//   }
// }

// calculateBonus('A', 10000);
// calculateBonus('S', 6000);


/**
 * 使用策略模式重构代码：
 *
 * 一个基于策略模式的程序至少由两部分组成： 
 * 第一部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。
 * 第二部分是环境类Context，Context接受用户的请求，随后把请求委托给某一个策略类
 * （要做到这点，说明Context中要维持对某个策略对象的引用）
 *
 */

// 第一个版本是模仿传统面向对象语言的实现。我们先把每种绩效的计算规则都封装在对应的策略类里面：
var performanceS = function() {}

performanceS.prototype.calculate = function(salary) {
  return salary * 4;
}

var performanceA = function() {}

performanceA.prototype.calculate = function(salary) {
  return salary * 3;
}

var performanceB = function() {}

performanceB.prototype.calculate = function(salary) {
  return salary * 2;
}
// 接下来定义奖金类Bonus:
var Bonus = function() {
  this.salary = null;   // 原始工资
  this.strategy = null; // 绩效等级对应的策略对象
}

Bonus.prototype.setSalary = function(salary) {
  this.salary = salary; // 设置员工的原始工资
}
Bonus.prototype.setStrategy = function(strategy) {
  this.strategy = strategy;  // 设置员工绩效等级对应的策略对象
}
Bonus.prototype.getBonus = function() { // 取得奖金数额
  return this.strategy.calculate(this.salary);  // 把计算奖金的操作委托给对应的策略对象
}
/**
 * 现在我们来完成这个例子中剩下的代码，先创建一个bonus对象，并且给bonus对象爱那个设置一些原始的数据
 * 接下来把某个计算奖金的策略对象也传入bonus对象内部保存起来。当调用bonus.getBonus()来计算奖金时
 * bonus对象本身并没有能力进行计算，而是把请求委托给了之前保存好的策略对象：
 */

var bonus = new Bonus();

bonus.setSalary(10000);
bonus.setStrategy(new performanceS()); // 设置策略对象

console.log(bonus.getBonus());

bonus.setStrategy(new performanceA()); // 设置策略对象
console.log(bonus.getBonus());