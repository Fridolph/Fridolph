// 使用！isNaN和parseFloat（）来检查参数是否是一个数字，使用isFinite（）来检查数字是否是有限的。
const validateNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n
// validateNumber('10') -> true
console.log(`validateNumber('10') -->`, validateNumber('10'))
