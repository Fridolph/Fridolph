var str = 'asdfssaaasasasasaa';
var result = {}, resultStr = '', len = 0;

str.replace(/./g, num => {
  result[num] = (result[num] || 0) + 1;

  // 如果当前字符串的长度，比之前最长的还要长
  if (result[num] > len) {
    resultStr = num;

    len = result[num];
  }
})

console.log('出现次数最多的字符为: ', resultStr, ', 出现次数为: ', len);
console.log(result);