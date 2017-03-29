// map()对数组中的每个元素使用某个函数, 并返回一个新数组, 该数组的元素是对原有元素应用某个函数得到的结果
function curve(grade) {
  return grade += 5;
}

var grades = [77, 65, 81, 92, 83];
var newgrades = grades.map(curve);
console.log(newgrades);

// 对一个字符串数组使用map()
function first(word) {
  return word[0];
}

var words = ["for", "your", "information"];
var acronym = words.map(first);
console.log(acronym.join(""));
// console.log(acronym);

// 在上面这个例子中，数组acronym保存了数组words中每个元素的第一个字母
// 然后如果将数组显示为真正的缩略形式，必须想办法除掉连接每个数组元素的符号，如果直接调用toString()就会显示这个逗号
// 使用join() 为其传入一个空字符串作为参数即可