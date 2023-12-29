function Vechile(brandNo, price) {
  console.log('this -> ', this);
  // 父类
  this.brandNo = brandNo
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

let bus = new Bus('大巴', 20, 64)
console.log('bus: ', bus);
