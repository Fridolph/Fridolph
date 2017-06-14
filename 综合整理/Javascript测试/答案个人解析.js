1. -------------------------------------------------

(function() {
  return typeof arguments
})()

A. "Object" 
B. "Array"  
C. "arguments"
D. "undefined"

正确答案：A
问题分析：

立即调用函数，没有传参，相当于{}或null, arguments 指{}或null， 所以知道arguments的类型了吧？


2. -------------------------------------------------

var f = function g() {
  return 23;
}    
console.log(typeof g());

A. "number"
B. "undefined"
C. "function"
D. Error

正确答案：D
问题分析：

typeof用于判断对象类型，g()不是合法的函数对象。

3. -------------------------------------------------

(function(x) {
  delete x;
  return x;
})(1)

A. 1
B. null
C. undefined
D. Error

正确答案：A
问题分析：

1对为参数传给x, 所以 x为1~ delete只能删除对象的某个属性
直接用delelte删除不了变量， 也不能删除原型中的变量

4. -------------------------------------------------

var y = 1, x = y = typeof x;
x;

A. 1
B. "number"
C. undefined
D. "undefined"

正确答案：D
问题分析：

这里存在声明提升，隐式赋值，y = 1，x,y都先被声明
typeof x 会先赋给y~  y = undefined, 由于y已定义，所以js引擎自动处理为字符串
最后 x = "undefined"

5.  -------------------------------------------------

(function f(f) {
  return typeof f();
})(function() {return 1;})

A. "number"
B. "undefined"
C. "function"
D. Error

正确答案：A
问题分析：

function() {return 1}(一拖) 整个作为参数传进了 f()里~
这是一个立即执行函数， f()会执行 一拖， 返回 1

typeof 1 ~答案揭晓


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

正确答案：A
问题分析：
foo.bar作为参数传进 匿名函数,  arguments[0]指foo.bar,
执行后 返回 (匿名函数).baz
在这个命名空间中baz是没有定义的，所以~

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

正确答案：A
问题分析：

以上可分解为 f = function(){return this.baz}
f()  f.baz 结果显然

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

正确答案：B
问题分析：return 以最后一个结果为准，参考css

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

正确答案：C
问题分析：function被声明， 函数声明提升~ 但这里的f只是普通的全局变量中的f，所以是没有被声明的 undefined


10. -------------------------------------------------

var x = [typeof x, typeof y][1];
typeof typeof x;

A. "number"
B. "string"
C. "undefined"
D. "object"

正确答案：B
问题分析： [typeof x, typeof y][1] → typeof y
相当与 typeof typeof typeof y, y是没有定义的 所以是 undefined, x被声明， typeof "undefined", 这时的 undefined 就成了string

11. -------------------------------------------------

(function(foo) {
  return typeof foo.bar;
})({ foo: {bar: 1} });

A. "undefined"
B. "object"
C. "number"
D. Error

正确答案：A
问题分析：{}整个作为参数传给了foo,  此时返回的是 typeof {}.bar, 而现在的foo显然只有foo没有 barbar这个属性，所以答案~~

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

正确答案：B
问题分析：函数声明提升，后者覆盖前者

13. -------------------------------------------------

function f() {return f;}
new f() instanceof f;

A. true
B. false

正确答案：B
问题分析：new f() 这整个作为一个函数， f是f()后返回的对象， 因果关系倒置

14. -------------------------------------------------

with (function(x, undefined) {}) length;

A. 1
B. 2
C. undefined
D. Error

正确答案：B
