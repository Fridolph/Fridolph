// 使用数组结构和reverse 来点到字符串中的顺序，再用join合并
const reverseStr = obj => {
  if (typeof obj === 'string') return [...obj].reverse().join('')
  if (Array.isArray(obj)) {
    return [...obj].reverse()
  }
  console.error('请传入字符串或对象')
}

console.log(reverseStr([4,2,35,3,21,412]))
console.log(reverseStr('fridolph'))