# 面向对象

回顾 [概念与原理 - 变量](../../概念与原理/02js/s_js_3-object.md)

## 属性基础

::: details

- 静态属性，例如 Object.assign
- 原型属性，例如 Object.prototype.toString
- 实例属性

属性描述符：Object.defineProperty

- configurable 可配置
- enumerable 是否可枚举
- value 值
- writable 可修改
- get 访问器函数
- set 修改器函数

缺点：无法监听数组的变化； 只能劫持对象属性，因为需对每个对象每个属性进行遍历，若属性也为对象需要进行递归（Vue2）

对象不可扩展 Object.preventExtentions

对象的封闭 Object.seal 阻止对象添加新属性，属性标志为不可配置

对象的冻结 Object.freeze 属性标志为不可配置、不可写、不可枚举

:::

## 如何访问对象原型

::: details

1. 通过 prototype ：对象内的显式属性，原型形成原型链
2. 通过 `__proto__` ：对象内的隐式属性，指向构造函数的原型对象
3. 通过 Object.getPrototypeOf、Refelect.getPrototypeOf ：返回对象的原型，内部先 toObject 转换
4. 通过 Object.setPrototypeOf ：设定对象的原型
5. 原型的尽头为 null

:::

## 类与继承

### 说一下原型链

::: details

- 每个对象都有属性 prototype，一个隐式原型叫 `__proto__`，它指向其`构造函数的原型对象`
- 当查找某个属性或方法时，先从自身上查找，没有找到会沿着 `__proto__` 找到构造函数（constructor）的原型对象（prototype），仍然没有找到会继续沿着 `__proto__` 向上查找到它构造函数原型对象的原型对象
- 直到找到顶级对象 object 为 null，由此形成的链条为原型链

:::

<Image src="/02js/prototype-chain.png" alt="原型链"/>

::: details 引用类型四个特性

- 引用类型，都具有对象特性，即可自由扩展属性
- 引用类型，都有一个隐式原型，即 `__proto__`，属性值为一个普通对象
- 引用类型，隐式原型的属性值指向它构造函数 `Constructor` 的显式原型 prototype 属性值
- 当查找一个对象某个属性时，若对象本身没有该属性，会去找它隐式原型 `__proto__` 中寻找
- 若还是没找到会继续在它构造函数的显式原型 `prototype` 中寻找，直至找到或 `__proto__` 为 null 为止，由此形成原型链

:::

## 对象隐式转换规则

1. 如果 `[Symbol.toPrimitive]` 方法存在，有限调用，无视 valueOf 和 toString 方法
2. 否则，若期望为 string 先调用 obj.toString() 如果返回不是原始值，继续调用 obj.valueOf()
3. 否则，若期望是 number 或 default ，先调用 obj.valueOf 如果返回值不是原始值，继续调用 obj.toString

## 什么是浅拷贝

浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以`如果其中一个对象改变了这个地址，就会影响到另一个对象`。

::: details 实现浅拷贝的几种方式

1. `Object.assign()`
2. `lodash`的 \_.clone 方法
3. ES6 展开运算符 `...`
4. Array.prototype.`concat()`
5. Array.prototype.`slice()`
   :::

## 什么是深拷贝

深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象，且`修改新对象不会影响原对象`。

## 赋值和深浅拷贝的区别

<Image src="/02js/clone1.png" alt="shadowCopy" />
<Image src="/02js/clone2.png" alt="deepCopy" />

::: details 实现深拷贝的几种方式

1. JSON.parse(JSON.stringify()) `缺点是不能处理函数和正则`
2. `lodash`的 `_.cloneDeep` 方法
3. `jQuery.extend()` 方法
4. 手写递归方法 - 见 [deepCopy](../../编码与实践/02js/c_js_2-deepcopy/c_js_2-deepcopy.md)
5. 消息通讯：BroadcastChannel、window.postMessage、Shared Worker、Message Channel 进行深拷贝

注：用消息通讯方法，循环引用对象不能复制，如 windows，不支持函数，同步方法会变成异步

:::

## 对象的属性遍历

- 普通属性：下面的常规和排序属性都属于普通属性
- 不可枚举属性
- 原型属性
- Symbol 属性
- 静态属性

::: details

注意：遍历属性拿到 key 的顺序与添加的顺序不同（但有规律）

- 常规属性：字符串作为作为键的属性
- 排序属性：数字作为键的属性
- 键被遍历的顺序规律：常规属性按添加顺序，而排序属性按索引值大小升序排序

相关方法：

|             方法名             | 普通属性 | 不可枚举属性 | Symbol 属性 | 原型属性 |
| :----------------------------: | :------: | :----------: | :---------: | :------: |
|            for...in            |    √     |      ×       |      ×      |    √     |
|         Object.keys()          |    √     |      ×       |      ×      |    ×     |
|  Object.getOwnPropertyNames()  |    √     |      √       |      ×      |    ×     |
| Object.getOwnPropertySymbols() |    ×     |      ×       |      √      |    ×     |
|       Reflect.ownKeys()        |    √     |      √       |      √      |    ×     |

:::

### 如何获取对象的全部静态属性：

`Reflect.ownKeys =  Object.getOwnPropertyNames + Object.getOwnPropertySymbols`

### 如何获取原型上的所有属性

for in + 递归 + 剔除内置属性

### 如何获取所有不可枚举属性

```js
// 获取原型对象
const obj = { ... }
const keys = Reject.ownKeys(obj)
const result = keys.filter(key => {
   return !Object.getOwnPropertyDescriptor(obj, key).enumerable
})
```

## 参考资料

- 浅拷贝与深拷贝 <https://juejin.cn/post/6844904197595332622>

- 深拷贝的终极探索 <https://segmentfault.com/a/1190000016672263>

- How to deep clone a JavaScript object<https://flaviocopes.com/how-to-clone-javascript-object/>


