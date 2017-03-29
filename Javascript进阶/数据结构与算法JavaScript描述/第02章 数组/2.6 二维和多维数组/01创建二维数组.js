// // 二维数组类似一种由行和列构成的数组表格
// var twod = [];
// var rows = 5;

// for (var i=0; i<rows.length; i++) {
//   twod[i] = [];
// }

// console.log(twod);
// 
// 这样数组中的每一个元素都是undefined
// 下面这样的方式更好

Array.matrix = function(numrows, numcols, initial) {

  var arr = [];

  for (var i=0; i<numrows; i++) {
    var columns = [];

    for (var j=0; j<numcols; j++) {
      columns[j] = initial;
    }

    arr[i] = columns;

  }
  return arr;
}

// 测试代码
var nums = Array.matrix(5, 5, 0);
console.log(nums[1][1]); // 0

var names = Array.matrix(3,3,'');
names[1][2] = 'Joe';
console.log(names[1][2]); // Joe

// 还可以仅用一行代码就创建并且使用一组初始值来初始化一个二维数组：
var grades = [ 
  [89, 77, 89], 
  ['好', '神', '奇'], 
  [{id: '001'}, {key: 'null'}, {value: true}]
];

console.log(grades[2][2]);