// Extract<Type, Union>
// 通过从 Type 中提取可分配给 Union 的所有联合成员来构造类型

type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>

// type T0 = "a"
type T1 = Extract<string | number | (() => void), Function>

type Shape =
	| { kind: 'circle'; radius: number }
	| { kind: 'square'; x: number }
	| { kind: 'triangle'; x: number; y: number }

type T2 = Extract<Shape, { kind: 'circle' }>

export {}
