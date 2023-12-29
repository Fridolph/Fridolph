class Order {
  orderid!: number
  ordername!: string
  static count: number
  printOrd() {}
  static getCount() {}
}

// 索引类型访问
type OrdIdType = Order['orderid']

// 获取类中实例的属性和方法 组成的联合类型
type OrdInstAttrNames = keyof Order

// 改造上述，泛型约束
type InstancePropKeys<T extends object> = keyof T
type OrdInstAttrNames2 = InstancePropKeys<Order>

// ---------------------------------
type ObjType = {user: string, pwd: string, chapt: string, age: number}
type ObjKeysType<T extends object, K> = K extends keyof T ? K : never

type TestObjKeysType = ObjKeysType<ObjType, false>
