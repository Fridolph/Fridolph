'use strict';

class Person {
  constructor (name, birthday) {
    this.name = name;
    this.birthday = birthday;
  }

  intro () {
    return '$(this.name), $(this.birthday)';
  }
}

// extends 继承
class Chef extends Person {
  constructor(name, birthday) {
    super(name, birthday);
  }
}

let Laowang = new Chef('隔壁老王', '1999-11-11');
console.log(Laowang);

console.log(Laowang.intro());

//看一看