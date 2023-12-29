## tsconfig.ts

- compilerOptions 编译器选项
  - lib 库，如 exnext、DOM
  - target 编译成功按哪个ES标准编译，如ESNext、ES5、ES2015
  - module 编译后使用什么规范，如 CommonJS、ESNext
  - rootDir 要编译的文件目录
  - outDir 编译后文件存放的目录
  - moduleResolution 填node，一般采用`node`模块解析的方式查找文件。从内层到最高目录的外层查找 import 引入的文件；classsic，采用`classic`模块解析的方式，从外层到内层方式查找import引入的文件
  - resolveJsonModule 是否支持引入`json`文件
  - allowJs 允许ts文件引入js文件
  - checkJs allowJs为true时生效。js也会当作ts来检测和编译
  - declearation 生成 `.d.ts` 文件进行类型声明
  - sourceMap 生成`.js.map`
  - strict 是否按照严格模式
  - typeRoots 声明的第三方包去哪里找，如 [`node_modules/@types`]
  - types 与typeRoots一起使用，如 [node, lodash]
  - baseUrl 为导入路径设置别名
  - paths 与baseUrl成对使用，如 ` "@/user/*": ["02/src/user/*"] `
  - experimentalDecorators 支持装饰器时必须开启
  - emitDecoratorMetadata
- include 生效的目录，常用
- exclude 不包含的目录，不常用
- extends 继承的方式

## 多级目录配置

1. 修改rootDir到当前的多级目录下
2. 根据情况修改ourDir  ./dist
