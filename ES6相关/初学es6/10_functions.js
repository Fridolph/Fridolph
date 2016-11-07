'use strict';

function breakfast(dessert, drink, {location, restaurant} = {}) {
  console.log(dessert, drink, location, restaurant);
}

breakfast('慕斯蛋糕', '奶茶', {location: '成都', restaurant: '董小姐'});
// 慕斯蛋糕 奶茶 成都 董小姐