ES6引入了两个非常受欢迎的数据结构：maps和sets。maps跟对象类似，可以用键key来map值（values），sets则类似于数组，只不过不允许出现重复值。

## maps

先说下现有object存在的一些弊端：

* 对象原型中可能存在并不需要的映射
* 弄清楚对象中有多少映射并不简单
* 因为键必须是一个字符串或者符号，不能将对象映射到值
* 对象不能保证自身属性的顺序

而Map对象解决了以上问题，它是将键和值映射起来的（即时键是一个字符串）绝佳选择。例如：当想把user对象映射到role时：

```js
const u1 = {name: 'fri'}
const u2 = {name: 'fridolph'}
const u3 = {name: 'fys'}
const u4 = {name: 'yinlinshengxiao'}
```

从创建一个Map对象开始：

    const userRoles = new Map();

可以使用map中的set方法把user赋给role:

userRoles.set(u1, 'User');
userRoles.set(u2, 'User');
userRoles.set(u3, 'Admin');

可链式调用：

userRoles
  .set(u1, 'User')
  .set(u2, 'User')
  .set(u3, 'Admin')

主要API：

Map.set(key, value)   设置对应key的值
Map.get(key)          拿到key上对应的value
Map.size              返回map中元素个数
Map.delete(key)       删除其中一项
Map.clear()           清空Map

使用keys()方法可以拿到map中所有的键，values()可以拿到所有的值，entries()则可以以数组的方式获取键值对，元素的第一个元素为键，第二个元素为值，所有这些方法都返回一个可迭代对象。从而能用for-of循环来迭代

## Weak maps

WeakMap跟Map在本质上是相同的，除了以下几点：

* key必须是对象
* WeakMap中的key可以被垃圾回收
* WeakMap不能迭代或者清空

## set

Set是一个不允许重复数据的集合（跟数学中集合的概念一样）

创建Set实例

    const roles = new Set();

相关API

Set.add(item);
Set.size
Set.delete


## 打破对象习惯

在以往需要映射时，对象往往成为首选。
现在开始，我们应该把ES6的这两种数据结构使用起来
