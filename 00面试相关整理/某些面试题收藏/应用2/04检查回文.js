//* 1. 将字符串转换为toLowerCase()，
//* 2. 使用replace从中删除非字母的字符
//* 3. 然后将其转换为toLowerCase()
//* 4. 将''拆分为单独字符，reverse join 与原始的非反转字符进行比较
//* 5. 然后将其转换为tolowerCase

const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '')
  return s === s.split('').reverse().join('')
}



console.log(palindrome('g u b u g'))