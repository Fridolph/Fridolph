// 使用按位左移运算符 << 和 toString(16) 
// 然后padStart(6, '0') 将给定的rgb参数转换为16进制字符串
// 然后获得6位16进制值
const rgbToHex = (r,g,b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')

console.log(rgbToHex(255, 165, 1))