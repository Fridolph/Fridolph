interface Todo {
	title: string
	completed: boolean
	description: string
	add(): number
	delete(): number
	update(): number
}

// 1. 获取类型中的 函数
// type Degree<T> = {
//   [P in keyof T as T[P] extends Function ? P : never] : T[P]
// }
// type DegreeTodo = Degree<Todo>

// 2. Capitalize的理解
// type Do = 'do'
// type DoType = Capitalize<Do> // Do

// 3. 重映射
// type Degree<T> = {
//   [P in keyof T as T[P] extends Function ? `do${Capitalize<P & string>}`: never]: T[P]
// }
// type DegreeTodo = Degree<Todo>


// 4. 对范围T进行约束

// type TestArrayKeys = keyof Array<any> // 但看不到keyof，继续如下处理
// type Convert<T> = T extends any ? T : never
// type TestArrayKeys = Convert<keyof Array<any>>

type ExcludeArray<T> = Exclude<T, Array<any>>
type Degree<T extends Record<string, any>> = {
  [P in keyof ExcludeArray<T> as ExcludeArray<T>[P] extends Function ? `do${Capitalize<P & string>}`: never]: T[P]
}

type DegreeTodo = Degree<Todo>
export {}
