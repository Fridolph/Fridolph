// 将字符串转换为toLowerCase（），并使用replace（）从中删除非字母的字符。然后，将其转换为tolowerCase（），将（’‘）拆分为单独字符，reverse（），join（’‘），与原始的非反转字符串进行比较，然后将其转换为tolowerCase（）。

const palindrome = (str) => {
  const s = str.toLowerCase().replace(/[\W_]/g, '')

  return s === s.split('').reverse().join('')
}
// palindrome('taco cat') -> true
console.log(palindrome('taco cat'))
