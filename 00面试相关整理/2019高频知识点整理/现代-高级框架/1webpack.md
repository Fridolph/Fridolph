> loader 和 plugin的区别

loader 用于对模块的源代码进行转换。

plugin范围更广 插件目的在于解决 loader 无法实现的其他事。

# webpack优化点

## 减少webpack的打包时间

### 1. 优化Loader loader文件的搜索范围 include exclude

### 2. 编译过的文件缓存 `loader: 'babel-loader?cacheDirectory=true'`

### 3. HappyPack 将loader的同步执行转换为并行

webpack打包过程也是单线程，特别是执行loader，长时间编译任务多，就导致了等待

### 4. DllPlugin 将特定类库提前打包然后引入

这种方式极大减少打包类库的次数，只有当类库更新版本才需要重新打包，且也实现了将公共代码抽离成单独文件的优化方案

其他优化点：

- resolve.extensions 用来表明文件后缀列表，默认查找的是 .js .json，将高频后缀排在后面
- resolve.alias 可通过别名方式映射一个路径，能让webpack更快找到路径
- module.noParse 若确定一个文件下无其他依赖，可让该属性Webpack不扫描该文件

## 让webpack打出的包更小

### 1. 按需加载

配合前端路由，将每个路由页面单独打包为一个文件

### Scope Hosting

解析模块依赖关系，尽可能把打包出来的模块合到一个函数中去

webpack4 `optimization: { concatenateModules: true }`

### Tree Shaking

由于ES6导入 的静态结构支持，可实现删除项目中未被引用的代码
