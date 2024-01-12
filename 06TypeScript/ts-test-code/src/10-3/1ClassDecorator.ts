function FirstClassDecorator(targetClass: any) {
  let targetClassObj = new targetClass()
  targetClassObj.buy()

  console.log('targetClass: ', targetClass.name);
}

@FirstClassDecorator
class CustomerService {
  name: string = '下单'
  constructor() {}
  buy() {
    console.log('buy: ', this.name + '购买');
  }
  placeOrder() {
    console.log('placeOrder: ', this.name + '下单购买');
  }
}

export {}
