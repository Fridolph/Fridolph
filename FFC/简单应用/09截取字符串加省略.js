// 截断一个字符串！
// 如果字符串的长度比指定的参数num长，则把多余的部分用...来表示。
// 切记，插入到字符串尾部的三个点号也会计入字符串的长度。
// 但是，如果指定的参数num小于或等于3，则添加的三个点号不会计入字符串的长度。

function truncate(str, num) {
  // Clear out that junk in your trunk
  if (num >= str.length) {
    return str;
  } else if (num <=3 && num >= 1) {
    return str.slice(0, num) + '...';
  } else if (num <= 0) {
    return '';
  } else {
    return str.slice(0, num - 3) + '...';
  }
}


truncate("A-tisket a-tasket A green and yellow basket", 11);