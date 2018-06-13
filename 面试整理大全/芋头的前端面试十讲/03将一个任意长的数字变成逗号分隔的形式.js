// 3.将一个任意长的数字变成逗号分割的格式
// 1234.56 => "1,234.56" , 123456789 => "123,456,789"
// parseToMoney(1234.56) // return "1,234.56"
const parseToMoney = number => {
  number += ''

  if (number.indexOf('.') === -1) {
    return number.replace(/(\d+?)(?=(\d{3})+$)/g, '$1,')
  } else {
    let arr = number.split('.')
    let left = arr[0].replace(/(\d+?)(?=(\d{3})+$)/g, '$1,')
    let right = arr[1]
    let rArr = [left, right]
    return rArr.join('.')
  }
}
console.log(parseToMoney('1234216.70291')) // return "1,234,216.70291"
