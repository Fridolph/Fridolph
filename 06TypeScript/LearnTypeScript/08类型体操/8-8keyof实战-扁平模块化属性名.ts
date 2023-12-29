type Modules = {
	menu: {
		setActiveIndex: (index: string) => string
		setCollapse: (index: string) => string
	}
	tabs: {
		setEditTableTabsValue: (editValue: string) => void
		setTabs: (index: string) => void
		setTabsList: (index: string) => void
	}
}

// 1. 模版字符类型
// 不能将类型“T”分配给类型“string | number | bigint | boolean”
type getMBstr<T, U> = `${T & string}/${U & string}`
type TestMB = getMBstr<'menu', 'setActiveIndex' | 'setCollapse'>
// type TestMB = "menu/setActiveIndex" | "menu/setCollapse"

// 2. 先拿到父模块的属性名
type GetModulesKeys<O> = {
  [K in keyof O]: O[K]
}

type TestA = GetModulesKeys<Modules>

// 3. 父、子模块联合起来
type GetModulesSpliceKeys<O> = {
  [K in keyof O]: getMBstr<K, keyof O[K]>
}

type TestB = GetModulesSpliceKeys<Modules>
// type TestB = {
//   menu: "menu/setActiveIndex" | "menu/setCollapse";
//   tabs: "tabs/setEditTableTabsValue" | "tabs/setTabs" | "tabs/setTabsList";
// }

// 4. 最终需求是 拿到由父子模块联合字符串 组成的数组类型，所以这里处理最后的转换
type GetModulesKeysArr<O> = [{
  [K in keyof O]: getMBstr<K, keyof O[K]>
} [keyof O]]

type Test = GetModulesKeysArr<Modules>
// type Test = ["menu/setActiveIndex" | "menu/setCollapse" | "tabs/setEditTableTabsValue" | "tabs/setTabs" | "tabs/setTabsList"]
