// [1,[2,3], [4, [5,6]]] -> [1,2,3,4,5,6]

var arr = [ 1, [2, 3], [4, [5, 6] ] ]
var result = [];

function flat(arr,result) {
  var i, d, len;

  for (i = 0, len = arr.length; i < len; i++) {
    d = arr[i]

    if (typeof d === 'number') {
      result.push(d)
    } else {
      flat(d, result)
    }
  }
}

flat(arr, result)
console.log(result);