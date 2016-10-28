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
  job: '人民教师',
  subject: 'English Literature',
  yearsExp: 5,
  toString: function() {
    var originalStr = Person.toString.call(this);

    return originalStr + ' ' + this.subject + ' teacher.';    
  }
});

var patty = Teacher.extend({
  firstName: 'Patricia',
  lastName: 'Hannon',
  subject: '我是subject',
  yearsExp: 20,
  say: '~哈戳戳'
});

console.log(patty.toString());