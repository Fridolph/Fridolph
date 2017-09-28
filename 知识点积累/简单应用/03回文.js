function palindrome(str) {
  // Good luck!
  var re = /[\W\s_]/gi;
  str = str.replace(re,"");
  return str.toLowerCase() === str.split("").reverse().join("").toLowerCase();
}


console.log(palindrome("eye"));
