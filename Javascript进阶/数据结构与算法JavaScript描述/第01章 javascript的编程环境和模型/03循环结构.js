// while 循环
var number1 = 1;
var sum1 = 0;

while(number1 < 11) {
  sum1 += number1;
  ++number1;
}

console.log(sum1); //55


// 使用for循环求和
var number2 = 1;
var sum2 = 0;

for (var number2 = 1; number2 < 11; number2++) {
  sum2 += number2;
}

console.log(sum2); // 55

// 使用for循环访问数组
var numbers = [3, 7, 12, 22, 100];
var sum = 0;

for(var i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}

console.log(sum);  // 144;