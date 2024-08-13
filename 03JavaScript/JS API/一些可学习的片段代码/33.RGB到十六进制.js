// 使用按位左移运算符（«）和toString（16），然后padStart（6，“0”）将给定的RGB参数转换为十六进制字符串以获得6位十六进制值。
const rgbToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')
// rgbToHex(255, 165, 1) -> 'ffa501'
