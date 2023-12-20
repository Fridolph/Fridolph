function findLongestWord(str) {
  var strArr = str = str.split(' ');
  var newArr = [];
  for (var i = 0; i < strArr.length; i++) {
    newArr.push(strArr[i].length);
  }
  newArr.sort(function (a, b) {
    return b - a;
  });
  return newArr[0];
}
findLongestWord("What if we try a super-long word such as otorhinolaryngology")