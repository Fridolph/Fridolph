// 使用递归。基本情况是当y等于0时。在这种情况下，返回x。否则，返回y的GCD和x / y的其余部分。
const gcd = (x, y) => (!y ? x : gcd(y, x % y))
// gcd (8, 36) -> 4
console.log(`gcd (8, 36) -->`, gcd(8, 36))
