/*function destroyer(arr) {
  var args = [];

  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  console.log('args: ', args);

  var temp = arr.filter((item, index, array) => {
    return args.indexOf(item) < 0;
  });

  return temp;
}*/

// console.log(destroyer([1, 2, 3, 1,3,4], 2, 3));


// var args = [ [ 1, 2, 3, 1, 3, 4 ], 2, 3 ];


function destroyer(array) {
  var args = [];

  for (var i = 0; i< arguments.length; i++) {
    args.push(arguments[i]);
  }

  var temp = array.filter((item, index, arr) => {
    return args.indexOf(item) === -1;
  })

  console.log(temp);

  // return temp;
} 

destroyer([1, 2, 3, 1,3,4], 2, 3)