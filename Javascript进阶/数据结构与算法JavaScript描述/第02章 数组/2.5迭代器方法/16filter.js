// filter()和every()类似，传入一个返回值为布尔类型的函数。
// 和every()不同的是，当对数组中的所有元素应用该函数，结果均为true,该方法并不返回true,而是返回一个新数组，该数组包含应用该函数后结果为true的元素
function isEven(num) {
  return num % 2 == 0;
}
function isOdd(num) {
  return num % 2 != 0;
}
var nums = [];
for (var i=0; i<20; i++) {
  nums[i] = i + 1;
}

var evens = nums.filter(isEven);
console.log("Even numbers: \n" + evens);

var odds = nums.filter(isOdd);
console.log("Odd numbers: \n" + odds);

// 另一个例子
function passing(num) {
  return num >= 60;
}
var grades = [];
for(var i=0; i<20; i++) {
  grades[i] = Math.floor(Math.random() * 101);
}
var passGrades = grades.filter(passing);
console.log("All grades: \n" + grades);
console.log("Passing grades: \n" + passGrades);
console.log("----------------------------\n-------------------------------");

// 过滤字符串：
function afterc(str) {
  if(str.indexOf("cie") > -1) {
    return true;
  }
  return false;
}

var words = ["recieve", "deceive", "percieve", "deceit", "concieve"];
var misspelled = words.filter(afterc);
console.log(misspelled);
console.log("---------------------\n---------------");
