// 接口
// 用来建立某种代码约定，使得其他开发者在调用某个方法或创建新的类时必须遵循接口所定义的代码约定
class Person {
    constructor(config) {
        this.config = config;
        console.log('实例化成功');
    }
}
const p1 = new Person({
    name: '张三',
    age: 23
});
class Sheep {
    eat() {
        console.log('I am eat!');
    }
}
//# sourceMappingURL=interface.js.map