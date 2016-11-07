(function() {
  var results;

  this.assert = function assert(value, desc) {
    var li = document.createElement('li');
    li.className = value ? "pass" : "fail";
    li.appendChild(document.createTextNode(desc));
    results.appendChild(li);

    if (!value) {
      li.parentNode.parentNode.className = "fail";
    }
    return li;
  };

  this.test = function test(name, fn) {
    results = document.getElementById('results');
    results = assert(true, name).appendChild(document.createElement('ul'));
    fn();
  };
  
})();