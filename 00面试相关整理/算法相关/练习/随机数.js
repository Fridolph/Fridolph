function randomNum(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1) + min)
  console.log(num)
  return num;
}

randomNum(2, 32)
