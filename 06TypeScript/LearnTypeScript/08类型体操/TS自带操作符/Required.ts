// Required<Type>
// 构造一个类型，其中包含设置为必需的 Type 的所有属性。与Partial相反
type Props = {
	a?: number
	b?: string
}

type _Required<T> = {
	[K in keyof T]-?: T[K]
}

const obj: Props = { a: 5 }

type Obj2 = _Required<Props>

export {}
