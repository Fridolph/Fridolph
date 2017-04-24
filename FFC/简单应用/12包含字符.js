// 如果数组第一个字符串元素包含了第二个字符串元素的所有字符，函数返回true。
function mutation(arr) {
  var a = arr[0].toLowerCase();
  var b = arr[1].toLowerCase();

  for(var i=0;i<b.length;i++) {
    if (a.indexOf(b[i]) < 0) {
      return false;
    }
  }
  return true;
}

console.log(mutation(["hello", "hey"]));