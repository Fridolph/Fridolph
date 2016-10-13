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

var Ke = Person.extend({
  firstName: 'keke',
  lastName: 'hachuochuo',
  birthDate: new Date('1994-11-15')
});

console.log(Ke.toString());

/**
 * 这里将Object.create调用封装在函数extend中，在调用extend()时它在内部调用Object.create。
 * 假如extend()在调用时传入了一个配置对象，这是一种非常典型的javascript模式。
 *
 * 通过循环tmp属性, extend()函数确保只有已经存在于tmp对象中的config的属性会扩展进新创建的tmp对象。将属性从config复制到tmp后，就可以将tmp作为Person的实例返回。
 */