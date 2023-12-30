// Parameters<Type>
// 根据函数类型 Type 的参数中使用的类型构造元组类型。
// 对于重载函数，这将是最后一个签名的参数；请参阅在条件类型内进行推断

declare function f1(arg: { a: number; b: string }): void

type T0 = Parameters<() => string> // type T0 = []

type T1 = Parameters<(s: string) => void> // type T1 = [s: string]

type T2 = Parameters<<T>(arg: T) => T> // type T2 = [arg: unknown]

type T3 = Parameters<typeof f1>
// type T3 = [arg: {
//     a: number;
//     b: string;
// }]

type T4 = Parameters<any> // type T4 = unknown[]

type T5 = Parameters<never> // type T5 = never

// type T6 = Parameters<string>// type T6 = never

// type T7 = Parameters<Function>

export {}
