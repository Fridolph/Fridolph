// class Person {
//   constructor(public name: string) {
//     // console.log('类被实例化就会调用')
//     this.name = name
//   }
  
//   // protected 关键字， 让声明的属性 只能在内部访问
//   protected protectedName: string = '不能访问'

//   say() {
//     console.log(`hello ${this.name}`)
//   }
// }

// const p1 = new Person('fys')
// p1.say()
// // p1.protectedName = 'hello'

// const p2 = new Person('yk')
// p2.say()

// class Employee extends Person {
//   constructor(name: string, code: number) {
//     super(name)
//     this.code = code
//   }
//   code: number

//   work() {
//     super.say()
//     this.doWork()
//   }

//   private doWork() {
//     console.log(`工号是 ${this.code}`);
//   }
// }

// const workers: Array <Person> = []

// workers[0] = new Employee('张三', 1)
// workers[1] = new Employee('李四', 2)