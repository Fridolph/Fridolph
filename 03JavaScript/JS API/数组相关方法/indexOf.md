https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

`indexOf()`方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

语法

* arr.indexOf(searchElement)
* arr.indexOf(searchElement[, fromIndex = 0])

参数

* searchElement 要查找的元素
* fromIndex 开始查找的位置。

如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回-1。如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即-1表示从最后一个元素开始查找，-2表示从倒数第二个元素开始查找 ，以此类推。 注意：如果参数中提供的索引值是一个负值，并不改变其查找顺序，查找顺序仍然是从前向后查询数组。如果抵消后的索引值仍小于0，则整个数组都将会被查询。其默认值为0.

返回值

首个被找到的元素在数组中的索引位置; 若没有找到则返回 -1

---

找出指定元素出现的所有位置

```js
var indices = [];
var array = ['a', 'b', 'a', 'c', 'a', 'd'];
var element = 'a';
var idx = array.indexOf(element);
while (idx != -1) {
  indices.push(idx);
  idx = array.indexOf(element, idx + 1);
}
console.log(indices);
// [0, 2, 4]
```

判断一个元素是否在数组里，不在则更新数组

```js
function updateVegetablesCollection(veggies, veggie) {
  if (veggies.indexOf(veggie) === -1) {
    veggies.push(veggie)
    console.log('New veggies collection is : ' + veggies)
  } else if (veggies.indexOf(veggie) > -1) {
    console.log(veggie + ' already exists in the veggies collection.')
  }
}
var veggies = ['potato', 'tomato', 'chillies', 'green-pepper']
// New veggies collection is : potato,tomato,chillies,green-papper,spinach
updateVegetablesCollection(veggies, 'spinach')
// spinach already exists in the veggies collection.
updateVegetablesCollection(veggies, 'spinach')
```
