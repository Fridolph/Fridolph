/**
 * 故事结构，小明，女神A，小明和A共同的朋友B
 * 小明向女神求婚，请B代小明送花给A
 */
// var Flower = function() {};

// var xiaoming = {
//   sendFlower: function(target) {
//     var flower = new Flower();
//     target.receiveFlower(flower);
//   }
// };

// var A = {
//   receiveFlower: function(flower) {
//     console.log('收到花 ' + flower);
//   }
// };

// xiaoming.sendFlower(A);

/**
 * 接下来，引入代理B，即小明通过B来给A送花
 */
var Flower = function() {};

var xiaoming = {
  sendFlower: function(target) {
    var flower = new Flower();
    target.receiveFlower(flower);
  }
}

var B = {
  receiveFlower: function(flower) {
    A.receiveFlower(flower);
  }
}

var A = {
  receiveFlower: function(flower) {
    console.log('收到花 ' + flower);
  }
}

xiaoming.sendFlower(B);