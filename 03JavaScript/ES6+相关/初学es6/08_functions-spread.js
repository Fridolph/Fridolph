let sports = ['足球', '篮球'],
    fruits = ['香蕉', ...sports];

console.log(sports);
// ['足球', '篮球']

console.log(...sports);
// 足球 篮球

console.log(fruits);
// ['香蕉', '足球', '篮球']