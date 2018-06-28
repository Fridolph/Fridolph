var a = 9
function fn() {
  a = 0
  return function(b) {
    return b + a++
  }
}
var f = fn()

console.log(f(5)); // 5
console.log(fn()(5)); // 5
console.log(f(5)); // 6
console.log(a); // 2

//----------------------------------

var arr = [1,2,3,4]
function fn(arr) {
  arr[0] = 0
  arr = [0]
  arr[0] = 100
  return arr
}

var res = fn(arr)
console.log(arr);
console.log(res);

//----------------------------------

var num = 10
var obj = {
  num: 20
}
obj.fn = (function(num) {
  this.num = num * 3
  num++
  return function(n) {
    num++
    console.log(num);
  }
})(obj.num)

var fn = obj.fn

fn(5)
obj.fn(10)
console.log(num, obj.num);
