function aFunction(x, y, z) {
  var argsArray = Array.prototype.slice.call(arguments, 0);
  console.log('The last arguments is: ' + argsArray.pop());
}

aFunction('fri', 'yk', 520)

function bFunction(x, y, z) {
  var argsArray = Array.prototype.slice.call(arguments, 0);
  console.log('The last arguments is: ' + argsArray.shift());
}

bFunction('fri', 'yk', 520)
