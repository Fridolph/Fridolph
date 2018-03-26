'use strict';

function breakfast (dessert, drink, ...foods) {
  // 这里的... 为剩余操作符
  console.log(dessert, drink, foods);

  //这里是说，前两个传参 会分别赋给dessert, drink
  //而之后的所有传参 1个以上都会赋给foods
}

breakfast('慕斯蛋糕', '红豆奶茶', '奶昔', '哈根达斯', '巧克力');
// 慕斯蛋糕  红豆奶茶  ['奶昔', '哈根达斯', '巧克力']


function breakfast2 (dessert, drink, ...foods) {
  // 这里的... 为剩余操作符
  console.log(dessert, drink, ...foods);

  //这里是说，前两个传参 会分别赋给dessert, drink
  //而之后的所有传参 1个以上都会赋给foods
}

breakfast2('慕斯蛋糕', '红豆奶茶', '奶昔', '哈根达斯', '巧克力');
// 慕斯蛋糕  红豆奶茶  奶昔  哈根达斯  巧克力