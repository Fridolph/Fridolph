var myModule = (function() {
  // 一个私有变量
  var events = [];

  return {
    x: 10,
    addEmUp: function(x, y) {
      return x + y;
    },
    addEvent: function(eventName, target, fn) {
      events.push({
        eventName: eventName,
        target: target,
        fn: fn
      })
    },
    listEvents: function(eventName) {
      return events.filter(function(evtObj) {
        return evtObj.eventName === eventName
      })
    }
  }
})()
