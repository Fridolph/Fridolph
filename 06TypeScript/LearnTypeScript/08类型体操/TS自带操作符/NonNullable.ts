// NonNullable<Type>
// 通过从 Type 中排除 null 和 undefined 来构造类型

type T0 = NonNullable<string | number | undefined>; // type T0 = string | number

type T1 = NonNullable<string[] | null | undefined>; // type T1 = string[]
