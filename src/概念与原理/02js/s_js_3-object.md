# JavaScript 对象

三大重要概念：类、原型、实例

<Image src="/02js/object.jpg" alt="JavaScript Object" :inline="false"/>

## 对象

**对象主要分为三大类：**

- 内置对象：ECMAScript 规范中定义的类或对象，比如 Object, Array, Date 等。

- 宿主对象：由 javascript 解释器所嵌入的宿主环境提供。比如浏览器环境会提供 window，HTMLElement 等浏览器特有的宿主对象。Nodejs 会提供 global 全局对象

- 自定义对象：由 javascript 开发者自行创建的对象，用以实现特定业务。就比如我们熟悉的 Vue，它就是一个自定义对象。我们可以对 Vue 这个对象进行实例化，用于生成基于 Vue 的应用。

**而对象又有三个重要概念**

### 类

javascript 在 ES6 之前没有 class 关键字，但这不影响 javascript 可以实现面向对象编程，javascript 的类名对应构造函数名。

在 ES6 之前，`var object = new Function();` 如果我们要定义一个类，其实是借助函数来实现的。ES6 明确定义了 class 关键字。

### 原型

原型是类的核心，用于`定义类的属性和方法`，这些属性和方法会`被实例继承`。

定义原型属性和方法需要用到构造函数的`prototype`属性，通过 prototype 属性可以获取到原型对象的引用，然后就可以扩展原型对象了。

### 实例

类是抽象的概念，相当于一个模板，而实例是类的具体表现。

### 创建对象的三种方式

1. **对象直接量**

对象直接量也称为对象字面量。直接量就是不需要实例化，直接写键值对即可创建对象. 例：

`var obj = { name: 'fri' }`

2. **new 构造函数**

可以通过关键词 new 调用 javascript 对象的构造函数来获得对象实例。比如：

- 创建内置对象实例： `var o = new Object();`

- 创建自定义对象实例：

```js
function Obj(name) {
  this.name = name
}
let obj = new Obj('fri') // obj -> { name: 'fri' }
```

3. **Object.create**

Object.create 用于创建一个对象，接受两个参数，使用如下：

`Object.create(proto[, propertiesObject]);`

- 第一个参数 proto 用于指定新创建对象的原型；

- 第二个参数 propertiesObject 是新创建对象的属性名及属性描述符组成的对象。

## 原型

原型是实现继承的基础。那么如何去理解原型呢？

<Image src="/02js/prototype.png" alt="原型是实现继承的基础" :inline="false"/>

引用类型的四个规则：

1. 引用类型，都具有`对象特性`，即可`自由扩展属性`。
2. 引用类型，都有一个隐式原型 `__proto__` 属性，属性值是一个普通的对象。
3. 引用类型，隐式原型 `__proto__`  的属性值指向它的`构造函数的显式原型` prototype 属性值。
4. 当你试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么它会去它的隐式原型 `__proto__`（也就是它的构造函数的显式原型 prototype）中寻找

## 原型链



<Image src="/02js/prototype2.png" alt="对象的查找过程" :inline="false"/>

最后一个 null，设计上是为了避免死循环而设置的, **Object.prototype 的隐式原型指向 null**。

## 原型链继承

所谓继承，简单说就是能通过子类实例访问父类的属性和方法。而利用原型链可以达成这样的目的，所以只要父类原型、子类原型、子类实例形成原型链关系即可。

<Image src="/02js/prototype3.png" alt="子类原型作为父类的实力，形成原型链关系" :inline="false"/>

实现对象继承：

### 1. 构造函数 直接改变 prototype 指向

```js
function Father() {
  this.nationality = 'Han'
}
Father.prototype.propA = '我是父类原型上的属性'
function Child() {
  Father.call(this)
}
Child.prototype.propB = '我是子类原型上的属性'
var child = new Child()
console.log(child.propA, child.propB, child.nationality)
// undefined, '我是子类原型上的属性', 'Han'
```

- 关键点：构造函数的复用
- 缺点：因为子类实例不是父类的实例，无法继承父类原型属性

### 2. 组合式继承

```js
function Father() {
  this.nationality = 'Han'
}
Father.prototype.propA = '我是父类原型上的属性'
function Child() {
  Father.call(this)
}
Child.prototype = new Father()
Child.prototype.constructor = Child // 修正原型上的constructor属性
Child.prototype.propB = '我是子类原型上的属性'
var child = new Child()
console.log(child.propA, child.propB, child.nationality)
// '我是父类原型上的属性', '我是子类原型上的属性', 'Han'
```

- 关键点：实例属性和原型属性都得以继承
- 缺点：父类构造函数被执行了两次，污染了子类原型

### 3. 原型式继承

```js
function Father() {
  this.nationality = 'Han'
}
Father.prototype.propA = '我是父类原型上的属性'
function Child() {}
Child.prototype = Object.create(Father.prototype)
Child.prototype.constructor = Child // 修正原型上的constructor属性
Child.prototype.propB = '我是子类原型上的属性'
var child = new Child()
child instanceof Father // true
console.log(child.propA, child.propB, child.nationality) // 都可以访问到
//
```

- 关键点：利用一个空对象过渡，解除子类原型和父类构造函数的强关联关系。这也意味着继承可以是纯对象之间的继承，无需构造函数介入。
- 缺点：实例化时无法向父类构造函数传参，这一点和原型链继承并无差异。

### 4. 寄生式继承

```js
var obj = {
  nationality: 'Han',
}
function inherit(proto) {
  var o = Object.create(proto)
  o.extendFunc = function (a, b) {
    return a + b
  }
  return o
}
var inheritObj = inherit(obj)
// inheritObj.nationality -> 'Han'
```

- 关键点：工厂函数，封装过程函数化
- 缺点：如果在工厂函数中扩展对象属性或方法，无法得到复用

### 5. 寄生组合继承

```js
function inherit(childType, fatherType) {
  childType.prototype = Object.create(fatherType.prototype)
  childType.prototype.constructor = childType
}

function Father() {
  this.nationality = 'Han'
}

Father.prototype.propA = '我是父类原型上的属性'

function Child() {
  Father.call(this)
}

inherit(Child, Father) // 继承
Child.prototype.propB = '我是子类原型上的属性'
var child = new Child()
console.log(child)
```

- 关键点：解决父类构造函数多次执行的问题，同时让子类原型变得更加纯粹。

### 6. ES6 class A `extends` B {}

## 参考文章

- 「思维导图学前端」6k 字一文搞懂 Javascript 对象，原型，继承 <https://juejin.cn/post/6844904194097299463>
- 面不面试的，你都得懂原型和原型链 <https://juejin.cn/post/6934498361475072014>
