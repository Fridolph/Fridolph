'use strict';

let numbers = new Set('一二三');

numbers.add('四');
numbers.add('四');  //不能添加重复内容，此添加无效

console.log(numbers); // Set {'一','二','三','四'}
console.log(numbers.size); // 4
console.log(numbers.has('一')); // true

numbers.delete('一');
console.log(numbers); // Set {'二','三','四'}

numbers.forEach( numbers => {
  console.log(numbers);
} )

numbers.clear();
console.log(numbers); // Set {}