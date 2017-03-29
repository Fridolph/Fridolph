// split() 可以生成数组
var sentence = "wo ai ha chuo chuo yang ke jiu shi";
var words = sentence.split(" ");

for(var i=0; i<words.length; i++) {
  console.log("word " + i + ": " + words[i]);
}