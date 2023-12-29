interface Customer {
  name: string
  degree: number
  phone: string
}

// for in 拿对象上的 key

// 而 for in keyof 拿到类型本身

type CustKVTypes = {
  [P in keyof Customer]: Customer[P]
}

export {}
