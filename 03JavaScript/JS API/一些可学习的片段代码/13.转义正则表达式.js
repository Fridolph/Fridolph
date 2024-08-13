// 使用replace（）来转义特殊字符。
const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// escapeRegExp('(test)') -> \\(test\\)
console.log(`escapeRegExp('(test)') -->`, escapeRegExp('(test)'))
