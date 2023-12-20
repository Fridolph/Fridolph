var globalVariable = 'This is global variable'

function globalFunction () {
  var localVarible = 'This is local varible'

  console.log('-----------------------------');
  console.log('Visit global/local variable');
  console.log(globalVariable);
  console.log(localVarible);

  globalVariable = 'This is chagned variable'

  console.log(globalVariable);

  function localFunction () {
    
    var innerLocalVariable = 'This is inner local variable'
    console.log('-----------------------------');
    console.log('Visit global/local/innerLocal variable');
    console.log(globalVariable);
    console.log(localVarible);
    console.log(innerLocalVariable);
  }

  localFunction()

}

globalFunction()
