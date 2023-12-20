let dessert = '慕斯蛋糕',
    drink = '冰红茶';

let breakfast = kitchen'今天的早餐是${dessert} 与 $(drink) !';

console.log(
  breakfast.startsWith('今天')
);
// true

console.log(
  breakfast.endsWith('!')
);
// true
console.log(
  breakfast.endsWith('冰红茶 !')
);
// true

console.log(
  breakfast.includesWith('冰红茶')
);
//true

console.log(
  breakfast.includesWith('德玛西亚')
);
//false