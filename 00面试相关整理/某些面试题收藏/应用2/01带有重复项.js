//* Anagrams of string
//* 1. 使用递归，对于给定字符串的每个字母，为字母创建字谜。
//* 2. 使用map将字母与每部分字谜组合，
//* 3. 然后使用reduce将所有字谜组合到一个数组中，最基本情况是字符串长度等于2或1
const anagrams = str => {
  // 先作最小处理，这种情况较简单，交换位置即可
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str]

  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)
        ),
      []
    )
}
console.log(anagrams('abc'))
