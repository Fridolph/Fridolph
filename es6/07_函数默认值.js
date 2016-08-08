function breakfast (dessert = '蛋糕', drink = '豆浆') {
  return '$(dessert) 与 ${drink}';
}

console.log(breakfast());
// 蛋糕 豆浆

console.log(breakfast('水果', '牛奶'));
// 水果 牛奶