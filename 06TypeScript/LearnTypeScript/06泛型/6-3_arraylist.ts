class ArrayList<T = any> {
  arr: Array<T>
  index: number = 0

  constructor() {
    this.arr = []
  }

  add(ele: T) {
    this.arr[this.index++] = ele
  }

  get(index: number) {
    return this.arr[this.index]
  }

}

let arr = new ArrayList<number>()

arr.add(0)
arr.add(2312)
arr.add(455)

arr.get(3)

export {}
