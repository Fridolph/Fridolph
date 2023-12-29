// 提取共有的类型
// type Extract<T, U> = T extends U ? T : never
type TestExtract = Extract<'hahha' | 1234 | false, string | boolean>
// type TestExtract = false | "hahha"

type TestExclude = Exclude<'a' | 'b' | 'c', 'a'>
// type T0 = "b" | "c"

// 学到了8-11
