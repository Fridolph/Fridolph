var Person = {
  firstName: 'KeKe',
  lastName: 'Xiaokeke',
  birthDate: new Date('1994-11-15'),
  say: 'I love u',
  getAge: function() {
    var today = new Date();
    var diff = today.getTime() - this.birthDate.getTime();
    var year = 1000*60*60*24*365.25;

    return Math.floor(diff / year);
  }, 
  toString: function() {
    return this.firstName + ' ' + this.lastName + ' is a ' + this.getAge() + ' year-old ' + this.say;
  },
  extend: function(config) {
    var tmp = Object.create(this);
    for (var key in config) {
      if (config.hasOwnProperty(key)) {
        tmp[key] = config[key];
      }
    }
    return tmp;
  }
}

var Teacher = Person.extend({
  job: 'teacher',
  subject: 'English Literature',
  yearExp: 5,
  toString: function() {
    return this.firstName + ' ' + this.lastName + ' is a ' + this.getAge() + ' year-old ' + this.say + ' ' + this.subject + ' teacher.';
  }
})

var ke = Person.extend({
  firstName: 'Kekekekeke',
  lastName: 'yangdake',
  birthDate: new Date('1991-11-04')
})

var yin = Teacher.extend({
  firstName: 'yinlin',
  lastName: 'shengxiao',
  subject: '电竞',
  yearsExp: 20,
  say: "我爱你"
})

console.log('Is ke an instance of Person? ' + Person.isPrototypeOf(ke)); // true
console.log('Is ke an instance of Teacher? ' + Teacher.isPrototypeOf(ke)); // false
console.log('Is yin an instance of Teacher? ' + Teacher.isPrototypeOf(yin)); // true
console.log('Is yin an instance of Person? ' + Person.isPrototypeOf(yin)); // true

/**
 * isPrototypeOf() 有一个叫作getPrototypeOf()的配套函数, 其调用形式为Object.getPrototypeOf(obj), 它返回当前对象的原型。
 */