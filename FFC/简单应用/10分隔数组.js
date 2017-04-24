// 把一个数组arr按照指定的数组大小size分割成若干个数组块。
// 例如:chunk([1,2,3,4],2)=[[1,2],[3,4]];
// chunk([1,2,3,4,5],2)=[[1,2],[3,4],[5]];

// 思路

// 数组分割成块，看到这个就想到 slice() 方法。 slice() 可接收两个参数，返回项的起始位置、（可选）返回项的结束位置。准确的说，返回的数组是从第一个参数到第二个参数前一个位置的项，也就是说，返回的数组包含起始位置但不包含结束位置。
function chunk(arr, size) {
  var temp = [];

  for (var i = 0; i<arr.length; i+=size) {
    temp.push(arr.slice(i, i + size));
  }

  console.log(temp);
  return temp;
}

chunk(["a", "b", "c", "d", "e", "f", "g"], 3);