$.expr[':'].mycustomselector = function(element, index, meta, stack){ 
// element- 一个DOM元素 
// index – 栈中的当前循环索引 
// meta – 有关选择器的元数据 
// stack – 要循环的所有元素的栈 
// 如果包含了当前元素就返回true 
// 如果不包含当前元素就返回false }; 
// 定制选择器的用法： $('.someClasses:test').doSomething();