// Pick<Type, Keys>
// 通过从 Type 中选取属性 Keys（字符串文字或字符串文字的并集）集来构造类型

interface Todo {
	title: string
	description: string
	completed: boolean
	other: string
	status: boolean
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
	title: 'Clean room',
	completed: false,
}

todo
