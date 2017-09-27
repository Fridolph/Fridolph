// 重复一个指定的字符串 num次，如果num是一个负数则返回一个空字符串。

function repeat(str, num) {
  // repeat after me
  var arr = [];

  if (num < 0) {
    return "";
  } else {
    for (var i = 0; i < num; i++) {
      arr.push(str);
    }
  }
  return arr.join("");
}

console.log(repeat("abc", 3));
