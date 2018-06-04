var arr = [1,2,3]
var a1 = Array()
var a2 = Array(3) // [,,]
var a3 = Array(1,2,3) // [1,2,3]

// Array.of() 返回由所有参数值组成的数组
let b1 = Array.of(3, 4, 5) // [3,4,5]
let b2 = Array.of(3) // [3]

// ES6 Arrary.from() 将两类对象转为真正的数组
// 第一个参数(必需):要转化为真正数组的对象。
// 第二个参数(可选): 类似数组的map方法，对每个元素进行处理，将处理后的值放入返回的数组。
// 第三个参数(可选): 用来绑定this。
const bar = ["a", "b", "c"];
console.log(Array.from(bar));
// ["a", "b", "c"]

console.log(Array.from('foo'));
// ["f", "o", "o"]
