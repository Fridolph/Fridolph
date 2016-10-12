function setFoo(fooInput) {
  this.foo = fooInput;
}

var foo = 5;
console.log('foo at the window level is set to: ' + foo); // 5

var obj = {
  foo: 10
}

console.log('foo inside of obj is set to: ' + obj.foo); // 10

// 修改window中的foo
setFoo(15);
console.log('foo at the window level is now set to: ' + foo);

// 修改obj中的foo
obj.setFoo = setFoo;
obj.setFoo(20);
console.log('foo inside of obj is now set to: ' + obj.foo);