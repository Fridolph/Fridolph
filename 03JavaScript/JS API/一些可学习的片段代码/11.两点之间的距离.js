// 使用Math.hypot（）计算两点之间的欧几里德距离。
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0)
// distance(1,1, 2,3) -> 2.23606797749979
console.log(`distance(1,1, 2,3) -->`, distance(1, 1, 2, 3))
