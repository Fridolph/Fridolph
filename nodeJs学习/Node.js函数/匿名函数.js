function execute(someFunction, value) {
  someFunction(value)
}

execute(function(word) {
  console.log(word);
}, "Hello")