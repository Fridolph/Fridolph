function Vechile(brandNo, price) {
  console.log('this -> ', this);
  // 父类
  this.brandNo = brandeNo
  this.price = price
}

Vechile.prototype.sale = function() {
  console.log(this + ' 销售');
}

// 继承
function Bus(brandNo, price, seatNo) {
  // 子类
  Vechile.apply(this, [brandNo, price]) // 借用构造函数继承
  this.seatNo = seatNo
}

// 寄生式组合继承
function protoExtendsWithMdl(ParentClass, SonClass) {
  function Middle() {
    this.constructor = SonClass
  }
  Middle.prototype = ParentClass.prototype
  SonClass.prototype = new Middle()
}

protoExtendsWithMdl(Vechile, Bus)

let bus = new Bus('大巴', 20, 64)
console.log('bus: ', bus);
bus.sale()
