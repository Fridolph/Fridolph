/**
 * 函数也是对象，所以更简单和直接的做法是把strategy直接定义为函数
 */
// var strategies = {
//   "S": function(salary) {
//     return salary * 4;
//   },
//   "A": function(salary) {
//     return salary * 3;
//   }
//   "B": function(salary) {
//     return salary * 2;
//   }
// };

/**
 * 同样Context也没有必要必须用Bonus类来表示，我们依然用calculateBonus函数充当Context来接受用户的请求。
 * 改造后的代码, 更加简洁：
 */
var strategies = {
  "S": function(salary) {
    return salary * 4;
  },
  "A": function(salary) {
    return salary * 3;
  },
  "B": function(salary) {
    return salary * 2;
  }
};

var calculateBonus = function(level, salary) {
  return strategies[level](salary);
};

console.log(calculateBonus('S', 2500));
console.log(calculateBonus('A', 3333));
console.log(calculateBonus('B', 4444));