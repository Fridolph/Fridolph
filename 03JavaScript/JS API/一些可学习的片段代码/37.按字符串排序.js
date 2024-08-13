// 按字符串排序（按字母顺序排列）
// 使用split（’‘）分割字符串，sort（）使用localeCompare（），使用join（’‘）重新组合。
const sortCharactersInString = (str) =>
  str
    .split('')
    .sort((a, b) => a.localeCompare(b))
    .join('')

// sortCharactersInString('cabbage') -> 'aabbceg'
console.log(`sortCharactersInString('cabbage') -->`, sortCharactersInString('cabbage'))
