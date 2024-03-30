// 技巧

// 两个数字合并一个新类型
// 试一下这里不加 as const 是什么结果
const named = ['a', 'b', 'c'] as const
const hex = ['#333', '#666', '#999'] as const
typeof named
typeof hex
type Colors = {
  [key in typeof named[number]]: typeof hex[number]

}

// 索引签名
interface NumberOrString {
  length: number
  name: string
  [index: string]: string | number
}

let a: NumberOrString = {name: 'fri', length: 2}

console.log(a)

// 从数组中提取类型
type Point = {
  x: number
  y: number
}
type Data = Point[]
type PointDetail = Data[number]

// 获取数组元素的类型
const myArray = [
  {name: 'fri', age: 30},
  {name: 'yk', age: 27},
  {name: 'coffee', age: 2},
]
type Person = typeof myArray[number]

type Age = typeof myArray[number]['age']
type Age2 = Person['age']
type Name = typeof myArray[number]['name']
type Name2 = Person['name']
