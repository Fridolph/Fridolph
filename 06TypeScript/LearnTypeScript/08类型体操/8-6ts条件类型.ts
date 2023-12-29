type AppAttr2Obj<T, K extends string, V> = {
  // [P in keyof T | K]: T[P] 这样写会报错，因为不确定 K 一定是 keyof T 当中的一个
  // 用以下写法来规避上述问题：
  [P in keyof T | K]: P extends keyof T ? T[P] : never
}

interface Customer {
  name: string
  degree: number
  phone: string
}

type Test = AppAttr2Obj<Customer, 'wechat', string>

export {}
