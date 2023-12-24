const symId = Symbol('001')
interface Product {
  [symId]: number | string
  name: string
  price: number
  account: number
  buy(): void
}

type A = Product[typeof symId]

type Pkeys = keyof Product // "name"|"price"||"account"|"buy"|"typeof symId"
// 当一个值以字面量形式充当类型时，它的值就是它本身

type AllKeys<T> = T extends any ? T : never
type Pkeys2 = AllKeys<keyof Product>
