{
  // 定义方式1
  let map = new Map();
  let arr = ['fri'];

  // Map里的元素 可以是 任意数据类型
  map.set(arr, 456);

  console.log('map', map, map.get(arr));
}

{
  // 定义方式2
  let map = new Map([
    ['key', 'map里的定义方式2'],
    ['value', '数组里两个元素，第一个key第二个value'],
    ['test', '测试一下']
  ])

  console.log('map args', map);
  console.log('map.size', map.size);
  map.delete('test');
  console.log('delete map');
  console.log('map.size', map.size);
}

// weakMap

{
  let weakMap = new WeakMap();

  let o = {};
  weakMap.set(o, 'weakMap和 Set之于weakSet的区别是差不多的'); 
  console.log(weakMap.get(o));
}