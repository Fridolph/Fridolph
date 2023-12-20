//* 1. 使用slice(0, 1)和toUpperCase() 大写第一个字母
//* 2. slice(1)获取字符串的其余部分
//* 3. 省略 lowerRest 参数以保持字符串的其余部分不变，或将其设置为true以转换为小写
const capitalize = (str, lowerRest = false) => (
  str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1))
)

// console.log(capitalize('FridolphACSDFS', true))

const daxie = str => str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
console.log(daxie('FridolphACSDFS'))