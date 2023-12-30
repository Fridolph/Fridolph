// Record<Keys, Type>
// 构造一个对象类型，其属性键为 Keys，属性值为 Type。该实用程序可用于将一种类型的属性映射到另一种类型。

interface CatInfo {
	age: number
	breed: string
}

type CatName = 'miffy' | 'boris' | 'mordred'

const cats: Record<CatName, CatInfo> = {
	miffy: { age: 10, breed: 'Persian' },
	boris: { age: 5, breed: 'Maine Coon' },
	mordred: { age: 16, breed: 'British Shorthair' },
}

// cats.boris

type Keys = 'name' // |'age'|'sex'|'phone'|'email'
const fri: Array<Record<Keys, CatInfo>> = [{
  name: {
    age: 24,
    breed: ''
  }
}]
