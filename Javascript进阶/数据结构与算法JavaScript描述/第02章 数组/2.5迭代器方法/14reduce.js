// reduce() 方法接受一个函数, 返回一个值. 该方法会从一个累加值开始，不断对累加值和数组中的后续元素调用该函数，
// 直到数组中的最后一个元素，最后返回得到的累计值
// 下面这个例子展示了如何使用reduce() 为数组中的元素求和

function add(total, cur) {
  return total + cur;
}

var nums = [1,2,3,4,5,6,7,8,9,10];
var sum = nums.reduce(add);
console.log(sum);

// reduce() 方法也可以用来将数组中的元素连接成一个长的字符串
function concat(accumulatedString, item) {
  return accumulatedString + item;
}

var words = ["the ", "quick ", "brown ", "fox "];
var sentence = words.reduce(concat);
console.log(sentence);

// reduceRight() 它从右向左执行
var words2 = ["chuo ", "chuo ", "ha ", "ai ", "wo "];
var sentence2 = words2.reduceRight(concat);
console.log(sentence2);

// 将字符串反转
var newStr = sentence2.split(" ").reverse().join(" ");
console.log(newStr);

