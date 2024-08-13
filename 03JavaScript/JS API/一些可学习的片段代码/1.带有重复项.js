// 使用递归。对于给定字符串的每个字母，为字母创建字谜。使用map()将字母与每部分字谜组合，然后使用reduce() 将所有字谜组合到一个数组中，最基本情况是字符串长度等于2或者1.

const anagrams = (str) => {
  if (str.length < 2) return str.length === 2 ? [str, str[1] + str[0]] : [str]

  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map((val) => letter + val)),
      []
    )
}

// anagrams('abc') -> ['abc','acb','bac','bca','cab','cba']
console.log(anagrams('abc'))
