//* 使用递归，若n小于后等于1，则返回1
//* 否则返回n 和 n -1 的阶乘的乘积
const factorial = n => (
  n <= 1 
    ? 1
    : n * factorial(n - 1) 
)
console.log(factorial(6))