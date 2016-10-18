var Person = {
  firstName: 'John',
  lastName: 'Connolly',
  birthDate: new Date('1964-09-05'),
  gender: 'male',
  getAge: function() {
    var today = new Date();
    var diff = today.getTime() - this.birthDate.getTime();
    var year = 1000*60*60*24*365.25;

    return Math.floor(diff / year);
  },
  toString: function() {
    return this.firstName + ' ' + this.lastName + ' is a ' + this.getAge() + ' year-old ' + this.gender;
  },
  extend: function(config) {
    var tmp = Object.create(this);

    for (var key in config) {
      if ( config.hasOwnProperty( key ) ) {
        tmp[key] = config[key];
      }
    }

    // 何时创建该对象呢？
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
  job: 'Teacher',
  subject: 'English Literature',
  yearExp: 5,
  toString: function() {
    var originalStr = Person.toString.call(this);

    return originalStr + ' ' + this.subject + ' teacher.';
  }
 })

 var patty = Teacher.extend({
  firstName: 'Patricia',
  lastName: 'Hannon',
  subject: 'chemistry',
  yearExp: 20,
  gender: 'female'
 })

 console.log(patty.toString());
 console.log('The Teacher object was created at %s', patty.getCreationTime());