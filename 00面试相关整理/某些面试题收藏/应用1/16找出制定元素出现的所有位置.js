findIndexInArr(['a', 'b', 'a', 'c', 'a', 'd'], 'a');

function findIndexInArr(array, findElem) {
  var result = [];
  var index = array.indexOf(findElem)

  while (index !== -1) {
    result.push(index);
    index = array.indexOf(findElem, index + 1);
  }

  console.log(result);
  return result;
}

