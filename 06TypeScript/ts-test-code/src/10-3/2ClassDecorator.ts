// 不带参数的装饰器
// function FirstClassDecorator(targetClass: any) {
//   let targetClassObj = new targetClass()
//   targetClassObj.buy()

//   console.log('targetClass: ', targetClass.name);
// }

// 带参数的装饰器
function FirstClassDecorator(params: any) {
  return function(targetClass: any) {
    let targetClassObj = new targetClass()
    // targetClassObj.buy()
    console.log('FirstClassDecorator函数的params: ', params);
  }
}

@FirstClassDecorator('我是params.')
class CustomerService {
  name: string = '下单'
  constructor() {}
  buy() {
    console.log('buy: ', this.name + '购买');
  }
  placeholder() {
    console.log('placeholder: ', this.name + '下单');
  }
}

export {}
