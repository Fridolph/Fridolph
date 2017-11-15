java可以通过初始化块进行数据赋值：

```java
public class HelloWorld {
  // 定义一个成员变量
  String name;    
  // 通过初始化块为成员变量赋值
  {
    name = "imooc";
  }
}
```

在类的声明中，可疑包含多个初始化块，当创建类的实例时，就会依次执行这些代码块。
如果使用static修饰初始化块，就称为静态初始化块。

**需要特别注意：**

> 静态初始化块只在类加载时执行，且只会执行一次，同时静态初始化块只能给静态变量赋值，不能初始化普通的成员变量。

```java
public class HelloWorld {
  int num1;   // 声明变量num1
  int num2;   // 声明变量num2
  static int num3;    // 声明静态变量num3

  public HelloWorld() {   // 构造方法
    sum1 = 91;
    System.out.println("通过构造方法为变量num1赋值");
  }

  {   // 初始化块
    num2 = 74;
    System.out.println("通过初始化块为变量num2赋值");
  }

  static {    // 静态初始化块
    num3 = 83;
    System.out.println("通过静态初始化块为静态变量num3赋值");
  }

  public static void main(String[] args) {
    // 创建类的对象hello
    HelloWorld hello = new HelloWorld();

    System.out.println("num1: " + hello.num1);
    System.out.println("num2: " + hello.num2);
    System.out.println("num3: " + num3);

    // 再创建类的对象hello2
    HelloWorld hello2 = new HelloWorld();
  }
}
```