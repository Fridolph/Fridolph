// 使用 !isNaN和parseFloat 来检查参数是否是一个数字
// 使用 isFinite 来检查数字是否有限
const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n