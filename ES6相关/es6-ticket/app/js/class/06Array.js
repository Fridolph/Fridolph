{
  // Array.of 把一组数组变量，转换成数据类型的方法
  let arr = Array.of(3,4,7,9,11);

  console.log('arr =',arr);

  // 不传任何参数，则返回空数组
  let empty = Array.of();
  console.log('empty = ',empty);
}

{
  // Array.from 把类数组转换为真正的数组
  console.log(Array.from([1,3,5]));
  console.log(Array.from([1,3,5], item => {
    return item * 2;
  }));
}

{
  // Array.fill(要替换的值，替换开始index, 替换结束index)
  console.log('fill-7', [1,'a',undefined].fill(7));
  
  console.log('fill, pos', ['a', 'b', 'c'].fill(7,1,3));
}