// GCD 使用递归
// 基本情况是当 y 等于 0 时，在这种情况下返回x
// 否则，返回 y 的GCD 和 x/y其余部分
const gcd = (x, y) => (!y ? x : gcd(y, x % y))
