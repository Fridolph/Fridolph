function MyClass() {}

MyClass.prototype = {
  method: function() {
    return 'Hello';
  }
}

var myClass = new MyClass();

module.exports = myClass;