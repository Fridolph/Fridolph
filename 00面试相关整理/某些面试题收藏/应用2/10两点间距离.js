//* 使用Math.hypot 来计算两点之间的欧几里得距离
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0)
console.log(distance(0, 0, 3, 3))