function sumAll(arr) {
  console.log(arr);

  var newArr = arr.reduce((acc, val) => {
    return [...acc].concat(val);
  });

  console.log(newArr);
}

