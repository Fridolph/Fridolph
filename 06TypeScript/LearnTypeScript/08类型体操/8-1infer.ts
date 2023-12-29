// 定义： infer 表示在 extends 条件语句中以占位符出现的 等到使用时才推断出来的数据类型

interface Customer {
  custname: string
  buymoney: number
}

// type CostFn = (params: Customer) => string
// type CostParaType = CostFn extends (params: infer P) => any ? P : CostFn

type CostFn = (params: Customer) => number
// type CostParaType = CostFn extends (params: string) => infer R ? R : CostFn

type GetParamsType<T> = T extends (params: any) => infer R ? R : never
type CustParaType = GetParamsType<CostFn>

// 区别：如果是泛型 T,P 这种需要提前定义好， 但infer不需要，它仅仅只是个占位符
type EleOfArr<T> = T extends Array<infer X> ? X : never
type EleOfArrTest = EleOfArr<Array<{name: string, age: number}>>
