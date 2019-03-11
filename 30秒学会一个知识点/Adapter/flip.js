// Flip将函数作为参数，然后将第一个参数作为最后一个参数。返回一个接受可变输入的闭包，并拼接最后一个参数，使其成为应用其余参数之前的第一个参数。

const flip = fn => (first, ...rest) => fn(...rest, first)

let a = { name: 'John Smith' };
let b = {};
const mergeFrom = flip(Object.assign);
let mergePerson = mergeFrom.bind(null, a);
mergePerson(b); // == b
b = {};
Object.assign(b, a); // == b
