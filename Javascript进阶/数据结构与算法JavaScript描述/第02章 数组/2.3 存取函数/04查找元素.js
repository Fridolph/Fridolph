/*const readline = require('readline');

var names = ["fys", "yk", "yh", "hei", "jialin", "jun"];
// putstr("Enter a name to search for: ");
// var name = readline();
var position = names.indexOf(names);



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a name to search for: ', (answer) => {
  // TODO: Log the answer in a database
  
  if(position >= 0) {
    console.log("Found " + rl + " at position " + position);
  }
  else {
    console.log(rl + " not found in array.");
  }

  // console.log('Thank you for your valuable feedback:', answer);

  rl.close();
});*/

var names = ["fys", "yk", "yh", "hei", "jialin", "jun"];
var name = "fys";
var firstPos = names.indexOf(name);
var lastPos = names.lastIndexOf(name);
console.log("First found " + name + " at position " + firstPos);
console.log("Last found " + name + " at position " + lastPos);