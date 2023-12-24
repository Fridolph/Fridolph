interface Student {
  name: string
  age: number
}

// 类型注解
// 变量类型在定义时刻已确定，之后变不可修改变量的类型
let data: number = 3
// data = 'three' 会报错

// 类型推导
// 由于没有定义约束，所以可在任意时刻修改变量值
let money = '一百块'
money = '$4.5'


let stuObj: Student = {
  name: 'fri',
  age: 30
}

let  = {
  name: 'yy',
  age: 22
}

let payment: [string, number, number] = ['$', 10,  20]

// 可变元组：具备元组固定值又具有数组灵活性特点
let customers: [string, number, number, ...any[]] = ['$', 10, 20, '30', '40']
