1. -------------------------------------------------

(function() {
  return typeof arguments
})()

A. "Object" 
B. "Array"  
C. "arguments"
D. "undefined"

2. -------------------------------------------------

var f = function g() {
  return 23;
}    
console.log(typeof g());

A. "number"
B. "undefined"
C. "function"
D. Error

3. -------------------------------------------------

(function(x) {
  delete x;
  return x;
})(1)

A. 1
B. null
C. undefined
D. Error

4. -------------------------------------------------

var y = 1, x = y = typeof x;
x;

A. 1
B. "number"
C. undefined
D. "undefined"

5.  -------------------------------------------------

(function f(f) {
  return typeof f();
})(function() {return 1;})

A. "number"
B. "undefined"
C. "function"
D. Error

6. -------------------------------------------------

var foo = {
  bar: function() {
    return this.baz;
  },

  baz: 1
}

(function() {
  return typeof arguments[0]()
})(foo.bar)

A. "undefined"
B. "Object"
C. "number"
D. "function"

7. -------------------------------------------------

var foo = {
  bar: function() {
    return this.baz;
  },
  baz: 1
}
typeof (f = foo.bar)();

A. "undefined"
B. "object"
C. "number"
D. "function"

8. -------------------------------------------------

var f = (
  function f() {
    return "1";
  },
  function g() {
    return 2;
  }
)()
typeof f;

A. "string"
B. "number"
C. "function"
D. "undefined"

9. -------------------------------------------------

var x = 1;
if (function f() {}) {
  x += typeof f;
}
x;

A. 1
B. "1function"
C. "1undefined"
D. NaN

10. -------------------------------------------------

var x = [typeof x, typeof y][1];
typeof typeof x;

A. "number"
B. "string"
C. "undefined"
D. "object"

11. -------------------------------------------------

(function(foo) {
  return typeof foo.bar;
})({ foo: {bar: 1} });

A. "undefined"
B. "object"
C. "number"
D. Error

12. -------------------------------------------------

(function f() {
  function f() { return 1; }
  return f();
  function f() { return 2; }
})()

A. 1
B. 2
C. Error
D. undefined

13. -------------------------------------------------

function f() {return f;}
new f() instanceof f;

A. true
B. false

14. -------------------------------------------------

with (function(x, undefined) {}) length;

A. 1
B. 2
C. undefined
D. Error