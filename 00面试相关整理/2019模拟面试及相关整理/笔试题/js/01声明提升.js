console.log(a);
var a = 12
function fn() {
  console.log(a);
  var a = 13
}
fn()
console.log(a);

// undefined
// undefined
// 12


var n = 0
function a() {
  var n = 10
  function b() {
    n++
    console.log(n);
  }
  b()
  return b
}
var c = a()
c()
console.log(n);

// 11
// 12
// 0

var a = 10
var b = 11
var c = 13
function test(a) {
  a = 1
  var b = 2
  c = 3
}
test(10)
console.log(a); // 10
console.log(b); // 11
console.log(c); // 3

var a = 4
function b(x,y,a) {
  console.log(a)
  arguments[2] = 10
  console.log(a)
}
a = b(1,2,3)
// 3
// 10
