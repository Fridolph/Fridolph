const fruit = '苹果'
console.log(fruit);

// const fruit = '柠檬'
// console.log(fruit);

/**
 * const 只有第一次声明的值是有效的
 *
 * 其限制的是给 变量 分配值的这一动作
 * 并不会限定其里面的值
 */

const sports = []
sports.push('足球')
sports.push('篮球')
console.log(sports); // '足球', '篮球'

sports = ['羽毛球','乒乓球']
console.log(sports); // '足球', '篮球'

/**
 * 第二次赋值的行为是允许的，其结果会默认失败
 */