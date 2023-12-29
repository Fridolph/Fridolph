class Bank {
  address: string = ''
  name: string = ''
  count: number = 0
  constructor(name: string, address: string) {
    this.name = name
    this.address = address
  }
  pay() {}
}

// 第一种形式
type BankCtorType = new (...args: any) => Bank
// let ABankInst: BankCtorType = Bank
// const p1 = new ABankInst('fri', 'chengdu')
// p1.

function createFactoryConstructor(constructorType: new (...args: any) => any) {
  // 这里就可在创建实例前 写需要执行的逻辑
  console.log('%c [ CtorType被创建 ]-18', 'font-size:13px; background:pink; color:#bf2c9f;')
  new constructorType()
}
let p1 = createFactoryConstructor(Bank)
