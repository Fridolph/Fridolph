// 两种基础的方式： 按行访问，按列访问

var grades = [
  [89, 77, 78],  
  [76, 82, 81],  
  [91, 94, 89]  
];
var total = 0;
var average = 0.0;

// for (var row=0; row<grades.length; row++) { // 按行访问
//   for (var col=0; col<grades[row].length; col++) {
//     total += grades[row][col];
//   }
//   average = total / grades[row].length;
//   console.log("Student " + parseInt(row + 1) + " average: " + average.toFixed(2));
//   total = 0;
//   average = 0.0;
// }

// 按行访问
for (var row=0; row<grades.length; row++) {
  for (var col=0; col<grades[row].length;col++) {
    total += grades[row][col];
  }
  average = total / grades[row].length;  
  console.log("Student " + parseInt(row + 1) + "average: " + average.toFixed(2));
  total = 0;
  average = 0.0;
}

// 按列访问 稍微调整for循环的顺序即可
for (var col=0; col<grades.length; col++) {
  for(var row=0; row<grades[col].length; row++){
    total += grades[row][col];
  }
  average = total / grades[col].length;
  console.log("Test " + parseInt(col + 1) + " average: " + average.toFixed(2));
  total = 0;
  average = 0.0;
}