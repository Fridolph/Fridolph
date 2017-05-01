// 第一个参数是将要对其执行查找和替换的句子。
// 第二个参数是将被替换掉的单词（替换前的单词）。
// 第三个参数用于替换第二个参数（替换后的单词）。
// Array.splice()
// String.replace()
// Array.join()

// 解法一：
// function myReplace(str, before, after) {
//   if (before[0] === before[0].toUpperCase()) {
//     after = after[0].toUpperCase() + after.slice(1);
//   }

//   str = str.replace(before, after);
//   return str;
// }

// function myReplace(str, before, after) {
//   var re = /^[A-Z]/;
//   if (re.test(before.charAt(0))) {
//     after = after.charAt(0).toUpperCase() + after.slice(1);
//   }
//   str = str.replace(before, after);
//   return str;
// }

// myReplace('A quick brown fox jumped over the lazy dog', 'jumped', 'leaped');
myReplace("He is Sleeping on the couch", "Sleeping", "sitting")

function myReplace(str, before, after) {
  str = str.replace(before, after);
  console.log(str);
  return str;
}