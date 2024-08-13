// 使用replace（）匹配每个单词的第一个字符，并使用toUpperCase（）来将其大写。

const capitalizeEveryWord = (str) => str.replace(/\b[a-z]/g, (char) => char.toUpperCase())
// capitalizeEveryWord('hello world!') -> 'Hello World!'
console.log(capitalizeEveryWord('hello world!'))
