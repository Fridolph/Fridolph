// 有返回值的函数
function jc(number) {
  var product = 1;
  for(var i=number; i>=1; --i) {
    product *= i;
  }
  return product;
}

console.log(jc(4)); //24
console.log(jc(5)); //120
console.log(jc(10)); // 3 628 800

// javascript中的子程或者void函数
function curve(arr, amount) {
  for(var i=0; i<arr.length; ++i) {
    arr[i] += amount;
  }
}

var grades = [77, 73, 74, 91, 90];
curve(grades, 5);
console.log(grades); 