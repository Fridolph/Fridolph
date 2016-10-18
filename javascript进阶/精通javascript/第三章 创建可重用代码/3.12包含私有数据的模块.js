function getModule() {
  var Foo = {}

  Foo.x = 10;

  Foo.addEmUp = function(x, y) {
    return x + y;
  }

  // 一个私有变量
  var events = [];

  Foo.addEvent = function(eventName, target, fn) {
    events.push({
      eventName: eventName,
      target: target,
      fn: fn
    })
  }

  Foo.listEvents = function(eventName) {
    return events.filter(function() {
      return evtObj.eventName === eventName
    })
  }

  return Foo;
}

var myNameSpace = getModule();

console.log(myNameSpace);