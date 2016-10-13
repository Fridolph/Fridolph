var Person = {
  firstName: 'fu',
  lastName: 'sheng',
  birthDate: new Date('1991-11-04'),
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
  yearsExp: 5,
  toString: function() {
    return this.firstName + ' ' + this.lastName + ' is a ' + this.getAge() + ' year-old ' + this.say + this.subject + ' teacher.';
  }
})

var Huanhuan = Teacher.extend({
  firstName: 'Huanhuan',
  lastName: 'fanfan',
  subject: 'chemistry',
  say: '我是大美女'
})

console.log(Huanhuan.toString());