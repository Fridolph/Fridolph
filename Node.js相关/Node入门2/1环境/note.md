## CommonJS

* 每个文件是一个模块，有自己的作用域

## require规则

`/` 表示绝对路径 `./`表示相对于当前文件

支持 `js` `json` `node` 扩展名，不写依次尝试

不写路径则认为是 `build-in`模块或者各级 `node_modules`内的第三方模块

## require特性

module被加载的时候执行，加载后缓存

一旦出现某个模块被循环加载，就只输出已经执行的部分，还未执行的部分不会输出

## exports 和 module.exports


## global

Buffer 
process 
console 