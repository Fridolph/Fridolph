// 确保字符串的每个单词首字母都大写，其余部分小写。
// 像'the'和'of'这样的连接符同理。

function titleCase(str) {
  var arr = str.split(" ");
  
  for (var i = 0; i < arr.length; i++) {
     arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
  }
  return arr.join(" ");  
}

console.log(titleCase("I'm a little tea pot"));
