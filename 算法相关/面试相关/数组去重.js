// 找出数组中重复的数字

const arr = [1, 4, 5, 6, 2, 4, 5, 1, 7, 8, '19', 19, '19', 18, '18']
const obj = {}
const repeatArr = []

arr.forEach(v => {
  if (obj[v + typeof v]) {
    repeatArr.push(v)
  } else {
    obj[v + typeof v] = 1
  }
})

console.log(repeatArr)

//  去重可以用 Set
let newArr = [...new Set(arr)]
console.log(newArr)
