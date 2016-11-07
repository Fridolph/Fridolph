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
  }
}

