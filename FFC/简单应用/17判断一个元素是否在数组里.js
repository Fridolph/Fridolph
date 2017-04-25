var arr = [1,2,3,4,5];
updateVegetablesCollection(arr, 1)
updateVegetablesCollection(arr, 'fri')

function updateVegetablesCollection(list, item) {
  if (list.indexOf(item) === -1) {
    list.push(item);
    console.log('新数组是: ' + list);
  } else if (list.indexOf(item) > -1) {
    console.log(item + '存在于数组中');
  }
}