// // 接口
// // 用来建立某种代码约定，使得其他开发者在调用某个方法或创建新的类时必须遵循接口所定义的代码约定
// // 用法1 用接口声明属性
// interface IPerson {
//   name: string
//   age: number
// }
// class Person {
//   constructor(public config: IPerson) {
//     console.log('实例化成功')
//   }
// }
// const p1 = new Person({
//   name: '张三',
//   age: 23
// })
// //---------------------------------
// // 用法2 用接口声明方法
// interface Animal {
//   eat()
// }
// class Sheep implements Animal {
//   eat() {
//     console.log('I am eat!');
//   }
// }
//# sourceMappingURL=interface.js.map