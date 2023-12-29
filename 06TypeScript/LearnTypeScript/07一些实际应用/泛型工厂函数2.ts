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

// 第二种形式
interface IBankCtor {
  new (...args: any): any
}
// let ABankInst: BankCtorType = Bank
// const p1 = new ABankInst('fri', 'chengdu')
// p1.

function createFactoryConstructor(constructorType: IBankCtor) {
  // 这里就可在创建实例前 写需要执行的逻辑
  console.log('%c [ CtorType被创建 ]-18', 'font-size:13px; background:pink; color:#bf2c9f;')
  new constructorType()
}

createFactoryConstructor(Bank)

export {}
