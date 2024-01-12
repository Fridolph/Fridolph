function loginProperty(...args: any[]) {
  return function(targetClassPrototype: object, attrname: string | symbol) {
    console.log('targetClassPrototype', targetClassPrototype)
    console.log('attrname: ', attrname);
    // (targetClassPrototype.constructor as any).custLevelDescri = function() {
    //   console.log('Test 1');
    //   console.log('Test 2');
    // }
  }
}

// 顾客目标类
class CustomerService {
  public custname: string = '测试人1'
  @loginProperty('登记人2')
  public degree!: string

  constructor() {}

  show() {
    console.log('调用 show: ')
  }
}

// (CustomerService as any).custLevelDescri()
