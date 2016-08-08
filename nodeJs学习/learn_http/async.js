/*var c = 0;

function printIt(){
  console.log(c);
}

function plus(){
  c++
}

plus()
printIt()*/

/*var c = 0;

function printIt(){
  console.log(c);
}

function plus(){
  setTimeout(function(){
    c++
  },1000)
}

plus()
printIt()*/

var c = 0;

function printIt(){
  console.log(c);
}

function plus(callback){
  setTimeout(function(){
    c++
    callback()
  },1000)  
}

plus(printIt)
