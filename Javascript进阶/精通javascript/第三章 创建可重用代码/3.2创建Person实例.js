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
  }
}

var ke = Object.create(Person);
ke.firstName = 'ke';
ke.lastName = 'erhuo';
ke.bithDate = new Date('1994-11-15');

console.log(ke.toString());

