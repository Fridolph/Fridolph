// 找到提供的句子中最长的单词
// 并计算它的长度
// 法一：我自己实现的 ……感觉代码很冗余
function findLongestWord(str) {
  // 找单词
  var stArr = str.split(" ");
  var lenArr = [];
  for (var i = 0; i < stArr.length; i++) {
    lenArr.push(stArr[i].length);
  }
  return lenArr[lenArr.sort(function(a,b){return a-b;}).length - 1];    
}

console.log(findLongestWord("What if we try a super-long word such as otorhinolaryngology"));


// 法二： 参考的，代码较优雅
function findLongestWord(string) {
    var str = string.split(" ");
    var longest = 0;
    var word = null;
    str.forEach(function(str) {
        if (longest < str.length) {
            longest = str.length;
            word = str;
        }
    });
    return word.length;
}

console.log(findLongestWord("pride and prejudice"));

