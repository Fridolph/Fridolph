
'use strict';

/*方法一
 import {fruit, dessert} from './27_module/chef';

console.log(fruit, dessert);
// 柠檬 蛋糕
*/


import * as chef from './modules/chef';

console.log(chef.fruit, chef.dessert);