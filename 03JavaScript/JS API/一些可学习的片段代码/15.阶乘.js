// 使用递归。如果n小于或等于1，则返回1。否则返回n和n – 1的阶乘的乘积。
const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1))

// factorial(6) -> 720
