function Foo() {
  getName = function() {
    console.log(1)
  }
  return this
}

Foo.getName = function() {
  console.log(2)
}

Foo.prototype.getName = function() {
  console.log(3)
}

var getName = function() {
  console.log(4)
}

function getName() {
  console.log(5)
}

Foo.getName() // 2
getName() // 4
Foo().getName() // 1
getName() // 1
new Foo.getName() // 2
new Foo().getName() // 3
new new Foo().getName() // 3
