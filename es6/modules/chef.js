'use strict';

/*

export let fruit = '柠檬';
let dessert = '蛋糕';

// 这样会将 fruit 这个变量导出，其他文件可以使用此js文件的变量 fruit， 而dessert不会用到
 
*/

let fruit = '柠檬';
let dessert = '蛋糕';

export {fruit, dessert};

// 同上，这样两个变量都会被导出
