{
  // Set的定义方式, 可理解为 没有重复的数组
  let list = new Set();

  list.add(5);
  list.add(7);

  console.log('size', list.size);
  
}

{
  let arr = [1,2,3,4,5];
  let list = new Set(arr);

  // console.log('size', list.size);

  list.add(1);
  list.add(2);
  list.add(3);
  list.add(4);
  list.add('5');

  console.log('size', list);
  // 可见 对 Set 添加重复的元素是没有作用的， 数组去重
}

{
  // Set相关方法介绍
  let arr = ['add', 'delete', 'clear', 'has', 'test'];
  let list = new Set(arr);

  // console.log('has', list.has('add'));
  // list.delete('test');
  // console.log('delete', list);
  // list.clear();
  // console.log('clear', list);
}

{
  // Set实例的读取 —— 遍历
  let arr = ['add', 'delete', 'clear', 'has'];
  let list = new Set(arr);

  // for (let key of list.keys()) {
  //   console.log('key', key);
  // }

  // for (let value of list.values()) {
  //   console.log('value', value);
  // }

  // 这三种遍历得到的结果都是一致的
  for (let value of list) {
    console.log('value', value);
  }

  // Set 结构的 key 和 value值是一样的
  for (let [key, value] of list.entries()) {
    console.log(`key: ${key}, value: ${value}`);
  }

  list.forEach(item => {
    console.log(item);
  })
}

// WeakSet 和 Set的区别： 
// 1. weakSet的元素只能是对象
// 2. weakSet中的对象只是弱引用  地址引用， 不用印象 gc
// 3. 没有clear方法 没有set属性，不能遍历

{
  let weakSet = new WeakSet(); 

  let arg = {};

  weakSet.add(arg);

  // weakSet.add(123);  不能加入除对象外的其他数据类型

  console.log('weakSet', weakSet);
}