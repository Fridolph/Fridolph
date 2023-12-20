function palindrome(str) {
  var re = /[\W_]/g;
  var lowRegStr = str.toLowerCase().replace(re, '');
  var reveRegStr = lowRegStr.split('').reverse().join('');

  return lowRegStr == reveRegStr;
}