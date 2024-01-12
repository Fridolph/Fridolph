// 需求：对已经开发好的项目中的一个类，创建实例时
// 打印以下日志信息：
// (1) 输出哪一个类被创建了
// (2) 输出传递了哪些参数信息

// 1. 完成日志信息的装饰器
function LoggerInfoDecorator<T extends {new (...args: any): any}>(TargetClass: T) {
  class LoggerMiddleClass extends TargetClass {
    constructor(...args: any) {
      super(...args)
      console.log('日志信息', (TargetClass as any).name)
    }
  }
  return LoggerMiddleClass
}

// 目标类
@LoggerInfoDecorator
class Test {
  name!: string
  age!: number
  // 先执行原来的构造函数
  constructor(name: string) {
    this.name = name
  }
  eat() {
    console.log('<<< eat >>>');
  }
}

let SonClass = LoggerInfoDecorator(Test)
let s_obj = new SonClass('王五')

export {}
