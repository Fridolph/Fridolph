interface Ref<V> {
  value: V
}
let ref: Ref<string> = {
  value: 'abc'
}
type Student = {name: string, age: number}
let stu: Ref<Student> = {
  value: {name: 'fys', age: 30}
}

export {}
