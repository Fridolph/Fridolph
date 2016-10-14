var Person = {
  firstName: '阿大',
  lastName: '大大大',
  birthDate: new Date('1990-10-10'),
  say: '我是老大',
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

    // 何时创建该对象
    var creationTime = new Date();

    // 一个私有的访问器
    var getCreationTime = function() {
      return creationTime;
    }

    tmp.getCreationTime = getCreationTime;
    return tmp;
  }
}

var Teacher = Person.extend({
  job: '人民教师',
  subject: 'English Literature',
  yearsExp: 5,
  toString: function() {
    var originalStr = Person.toString.call(this);
    return originalStr + ' ' + this.subject + ' teacher.';
  }
})

var patty = Teacher.extend({
  firstName: '啪啪',
  lastName: 'duangduang',
  subject: 'chemistry',
  yearsExp: 20,
  say: '我不是成龙'
})

console.log(patty.toString());
console.log('The Teacher object was created at %s', patty.getCreationTime());