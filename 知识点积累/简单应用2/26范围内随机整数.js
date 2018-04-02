// 使用Math.random 生成一个随机值，使用乘法将其映射到所需的范围
const randomRange = (min, max) => (Math.random() * (max - min) + min).toFixed(0)