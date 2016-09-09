function say(word) {
  console.log(word);
}

function execute(someFunction, value) {
  someFunction(value)
}

execute(say, "Hello.");