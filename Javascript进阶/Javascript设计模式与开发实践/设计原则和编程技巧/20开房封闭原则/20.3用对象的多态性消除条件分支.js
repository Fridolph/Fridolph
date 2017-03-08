/**
 * 过多的条件分支语句是造成程序违反开放封闭原则的一个常见原因。每当需要增加一个新的if语句时，都要被迫改动原函数。把if换成switch-case只是换汤不换药
 *
 * 利用对象的多态性来让程序遵守开放封闭原则，是一个常用的技巧。代码如下：
 */

var makeSound = function(animal) {
  if (animal instanceof Duck) {
    console.log('嘎嘎嘎');
  } else if (animal instanceof Chicken) {
    console.log('咯咯咯');
  }
}

var Duck = function() {};
var Chicken = function() {};

makeSound(new Duck()); // 嘎嘎嘎
makeSound(new Chicken()); // 咯咯咯

// 当增加一只狗后，原代码将改成：
var makeSound = function(animal) {
  if (animal instanceof Duck) {
    console.log('嘎嘎嘎');
  } else if (animal instanceof Chicken) {
    console.log('咯咯咯');
  } else if (animal instanceof Dog) { // 增加跟狗相关的代码
    console.log('汪汪汪');
  }
};

var Dog = function() {};
makeSound(new Dog());

/******************* 改良 *******************/

/**
 * 利用多态的思想，我们把程序中不变的部分隔离出来（动物都会叫），然后把可变的部分封装起来（不同类型的动物发出不同的声音）这样一来程序就有了可扩展性。
 *
 */
var makeSound = function(animal) {
  animal.sound();
}

var Duck = function() {};
Duck.prototype.sound = function() {
  console.log('嘎嘎嘎');
}

var Chicken = function() {};
Chicken.prototype.sound = function() {
  console.log('咯咯咯');
}

makeSound(new Duck());
makeSound(new Chicken());

// 增加狗，不用改动原makeSound函数
var Dog = function() {};
Dog.prototype.sound = function() {
  console.log('汪汪汪');
}

makeSound(new Dog());