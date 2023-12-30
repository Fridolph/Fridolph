// Partial<Type>
// 构造一个类型，并将 Type 的所有属性设置为可选。该实用程序将返回一个表示给定类型的所有子集的类型。
type Todo = {
  title: string;
  description: string;
}

type Todo2 = Partial<Todo>



export {}
