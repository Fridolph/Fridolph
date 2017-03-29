function dg(number) {
  if (number == 1) {
    return number;
  }
  else {
    return number * dg(number - 1);
  }
}
console.log(dg(5));  //120