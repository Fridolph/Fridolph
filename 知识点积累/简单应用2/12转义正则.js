//* 使用replace来转义特殊字符
const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

console.log(escapeRegExp('(test)'))