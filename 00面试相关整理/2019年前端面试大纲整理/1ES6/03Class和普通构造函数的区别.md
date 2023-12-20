## JS构造函数

```js
function MathHandle(x, y) {
  this.x = x
  this.y = y
}
MathHandle.prototype.add = function() {
  return this.x + this.y
}
var m = new MathHandle(1,2)
console.log(m.add()) // 3
```

## Class基础语法

```js
class MathHandle {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  add() {
    return this.x + this.y
  }
}
const m = new MathHandle(1,2)
console.log(m.add()) // 3
typeof MathHandle // 'function'
MathHandle.prototype.constructor === MathHandle
m.__proto__ === MathHandle.prototype // true
```
---

ES6中的Class本质是构造函数的语法糖


## 继承

```js
function Animal() {  
  this.eat = function() {
    console.log('animal eat)
  }
}
function Dog(name) {  
  this.name = name
  this.wang() {
    console.log('dog wang')
  }
}
Dog.prototype = new Animal()
var hashiqi = new Dog()
```


```js
class Animal {
  constructor(name) {
    this.name = name
  }
  eat() {
    console.log(`${this.name} eat`)
  }
}
class Dog extends Animal {
  constructor(name) {
    super(name)
    this.name = name
  }
  wang() {
    console.log(`${this.name} wang`)
  }
}
const dog = new Dog('哈士奇')
```


---

**Class 和 JS 构造函数的区别Class**

Class在语法上更贴合面向对象的写法
Class实现继承更加易读、易理解
更易于写java等后端语言的使用
Class的本质还是构造函数的语法糖，使用prototype