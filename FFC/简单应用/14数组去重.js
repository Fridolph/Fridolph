var arr = [1, 1, 1, 1, 2, 3, 2, 3, 3, 4];

function filterArr(arr) {
  var newArr = arr.filter((item, index, arr) => {
    return arr.indexOf(item) === index;
  });

  console.log(newArr);
}

filterArr(arr);