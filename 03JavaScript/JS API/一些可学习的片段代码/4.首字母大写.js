// 使用slice（0,1）和toUpperCase（）大写第一个字母，slice（1）获取字符串的其余部分。省略lowerRest参数以保持字符串的其余部分不变，或将其设置为true以转换为小写。（注意：这和上一个示例不是同一件事情）

const capitalize = (str, lowerRest = false) =>
  str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1))

// capitalize(‘myName’, true) -> ‘Myname’

console.log(capitalize('myName', true))
