function rot13(str) {
  // charCodeAt()返回0-65535之间的整数     
  var newString = []; 
  for (var i = 0; i < str.length; i++) {
    // 如果字符是非大写英文字母(序号小于65或大于91)，将该字符直接放到newString中，并使用continue进入下一个循环         
    var temp = str.charCodeAt(i); 
    if (temp < 65 || temp > 91) { // 返回字符串指定位置的字符            
      // 如果序号大于77(N-Z字母)，使用String.fromCharCode()转找成该序号减13的字符，并且放入newString        
      newString.push(str.charAt(i));
      continue; 
    } else if (temp > 77) { 
      // String.fromCharCode()根据序号(指定的Unicode编码中的序号)值来返回一个字符串            
      newString.push(String.fromCharCode(temp - 13)); 
      // 如果序号小于78(N-Z字母)，使用String.fromCharCode()转找成该序号减13的字符，并且放入newString        
    } else {
      newString.push(String.fromCharCode(temp + 13));
    }
  }
  return newString.join('');
}