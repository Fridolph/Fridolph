// // 判断一个字符串中出现次数最多的字符，统计这个次数
let str = 'asdfssaaasasasasaa';

function showStringCount(str = '') {  
  let result = {};
  let strArr = str.split('');

  if (str != null) {
    strArr.map((s, i) => {
      // console.log(`s: ${s}, i: ${i}`);
      if (!result[s]) {
        result[s] = 1;
      } else (result[s] != null) {
        result[s]++
      }
    });

    return result

  } else {
    return '请传入合法字符串'
  }
}
