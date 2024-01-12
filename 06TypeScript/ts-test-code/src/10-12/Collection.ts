// 1 集合类
class Collection<T = any> {
	static collection: Collection = new Collection()

	private constructor() {}

	private containerMap = new Map<string | symbol, any>()

	public set(id: string | symbol): T {
		return this.containerMap.get(id)
	}

  public get(id: string | symbol): T {
    return this.containerMap.get(id)
  }

	public has(id: string | symbol): boolean {
		return this.containerMap.has(id)
	}
}

export default Collection.collection
