// 判断一个字符串中出现次数最多的字符，统计这个次数

function showStringCount(str = '') {  
  let result = {};
  
  for (var i = 0; i < str.length; i++) {
    if( !result[str[i]] ) {
      result[str[i]] = 1;
    } else {
      result[str[i]]++;
    }
  }

  let rstStr = '';
  let max = 0;
  
  for (let num of result) {}
  
}

let str = 'asdfssaaasasasasaa';
console.log(showStringCount(str));