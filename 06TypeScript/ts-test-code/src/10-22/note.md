## 理解专业术语

- Controller 控制器装饰器

  @Contrller 修饰的类，用来支持页面的各种请求的类（实现路由）

- Service 
  
  @Service 业务逻辑层装饰器

- Autowired 自动装配

  @Autowired 一般是帮助把外部其他数据注释【简单理解为赋值】给当前类属性或方法参数的装饰器，这些数据可以是string、number等基本数据类型，也可以是一个对象。

- dependencyid 唯一标识符变量
  
  作为 @Autowired 装饰器函数的实参，使用 @Autowired 为不同类属性，或方法参数注入数据时，dependencyid 用于区分这些不同的类

- singleton 标注是否是单例注入的参数，可选

- target 标识被注入的目标类


## 依赖注入中的单件模式的实现方式
