// 检查一个字符串(str)是否以指定的字符串(target)结尾。
// 如果是，返回true;如果不是，返回false。

function confirmEnding(str, target) {
  // "Never give up and good luck will find you."
  // -- Falcor
  
  // console.log(str.substr(str.length - target.length));
  return target === str.substr(str.length - target.length);
}

confirmEnding("Bastian", "an");