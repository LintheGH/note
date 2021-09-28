---
title: java 学习01
tags: [java]
---

Java 学习 01
<!-- more -->

## Java 的版本
  - Java ME：Miro Edition，迷你版本，移动版本的标准，SE 的 JVM 和 标准库不能在EE运行
  - Java SE：Standard Edition，标准版本，包含标准JVM和标准库。
  - Java EE：Enterprise Edition，企业版本。在SE的版本上提供了大量API和库，

  ### 名词解释
  - JDK：Java Development Kit
  - JRE：Java Runtime Environment
  > JRE就是运行Java字节码的虚拟机。但是，如果只有Java源码，要编译成Java字节码，就需要JDK，因为JDK除了包含JRE，还提供了编译器、调试器等开发工具。
  - JSR：Java Specification Request。JSR标准规范，保证Java语言的规范性
  - JCP：Java Community Process。JCP组织。负责审核JSR的组织



## Java 数据类型

### 基本数据类型

 - 整数类型：byte，short，int，long

   ```java 定义整型
   public class Main {
     public static void main(String[] args) {
       int i = 23432123;
       int i2 = -234234;
       int i3 = 2_234_1234; // 用下划线分割易识别
       int i4 = 0xff0000; // 十六进制的16711690
       int i5 = 0b1000000000; // 二进制的512
       long l = 9000000000000000000L; // 长整型需要在后面加上L
     }
   }
   ```

   > 同一个数的不同进制的表示是完全相同的，例如 15 = 0xf = 0b1111

 - 浮点数据类型：float，double

   ```java 浮点类型
   float f1 = 3.14f; // 对于 float 类型需要在后面加上f
   float f2 = 3.14e38f; // 科学计数法表示 3.14 x 10^38
   double d = 1.79e308; // 
   double d2 = -1.79e308;
   double d3 = 4.9e-324; // 科学计数法表示的4.9x10^-324
   ```

   > 浮点类型 float 最大可表示 3.4x10^38，double 类型最大可表示 1.79x10^308

 - 字符类型：char

   ```java char类型
   char a = 'A'
   char zh = '中'
   ```

   > Char 类型使用单引号`'`表示，与双引号`"`的字符串区分

 - 布尔值类型：boolean

   <img src="https://tva1.sinaimg.cn/large/0081Kckwgy1glrutimrk1j30ls0iqmx7.jpg" style="zoom:25%;" />

### 引用数据类型

除了基本数据类型之外都是引用类型，如最常用的 String 字符串

```
String s = "hello"
```

- 类（class）
- 接口（interface）
- 数组（array）：存储相同类型的一组数据
```java 数组
public class Main {
	public static void main(String[] args) {
  	int[] ns = new int[5]; // 初始化时即固定数组大小，同时制定成员的数据类型
    ns[0] = 67;
    ns[1] = 34;
    ns[2] = 13;
    ns[3] = 86;
    ns[4] = 99;
    System.out.printfln(ns.length); // 5
  }
  
  public static void arr2() {
    int[] ns = new int[] {1,2,3,4}; // 由编译器推算数组的大小
    
    // 进一步简写
    int[] ns2 = {1,2,3,4};
    
    System.out.printfln(ns[1]); // 2
    System.out.printfln(ns2[1]); // 2
  }
  
  public static void mulArr() {
    int[] ns = { // 多维数组
      {1,2,3,4},
      {5,6,7,8},
    }
  }

}
```

> 数组初始化未制定值时都有默认值，整型的默认值为 `0`，浮点型的默认值为`0.0`，布尔型的默认值为`false`
>
> 数组一旦创建后，大小不可变
>
> 访问数组元素时，如果索引值超出范围，运行时将报错

### 常量

定义变量的时候，加上 `final`修饰符，就是常量

```java 常量
final double PI = 3.14; // 
PI = 300; // compile error
```


### var 关键字

如想省略变量类型，可以使用 `var` 关键字

```java var关键字
var sb = new StringBuilder(); // 编译器会自动识别为 StringBuilder 类型
// 实际上等于
StringBuilder sb = new StringBuilder();
```

### 变量的作用域

Java 的变量作用域，只能包含在 `{}`中。

```java 变量作用域
{
    ...
    int i = 0; // 变量i从这里开始定义
    ...
    {
        ...
        int x = 1; // 变量x从这里开始定义
        ...
        {
            ...
            String s = "hello"; // 变量s从这里开始定义
            ...
        } // 变量s作用域到此结束
        ...
        // 注意，这是一个新的变量s，它和上面的变量同名，
        // 但是因为作用域不同，它们是两个不同的变量:
        String s = "hi";
        ...
    } // 变量x和s作用域到此结束
    ...
} // 变量i作用域到此结束
```

## 运算和运算符

### 运算符

- 四则运算：`+` `-` `*` `/` `%` `++` `--` `+=` `^` 等
- 位运算：
- 移位运算：
- 布尔运算：
  - 比较运算符：`>` `<` `==` `>=` `<=` `!=`
  - 与运算：`&&`
  - 或运算：`||`
  - 非运算：`!`
  - 三元运算符：'?:'

### 运算注意事项

- 益处：当数据量超过变量类型所能存储的数据量时会`溢出`，造成计算不正确

- 运算符优先级

- 类型提升与强制类型转换：强制类型转换，在需要转换的数据前面加上`(类型)`

  ```java 类型转换
  // 运算过程中两种类型不一致，自动提升至范围较大的类型，如 `int`转换为 `long`类型。也可以强制类型转换
  public class Type {
    public static void main() {
  		short s = 1234;
      int i = 123456;
      int x = s + i; // s 自动转换为int
      short y = s + i; // 编译错误；
    }
    
    public static void auto() {
      int i = 1234567;
      short s = (short) i; // 将 i 强制转换为 short 类型
    }
    
    // 强制类型转换结果可能出现偏差
    public static void err() {
      int i1 = 1234567;
      short s1 = (short) i; // -10617
      int i2 = 12345678;
      short s2 = (short) i2; // 24910
    }
    
    // 在复杂的四则运算中，两整数的运算不会自动进行类型提升
  public static void intEr() {
      double d = 1.2 + 24/5; // 5.2, (24.5) 的结果为4
  }
  }
  ```
  
  - 浮点数存在运算误差：十进制 0.1 在二进制中是一个无限循环小数，只能存储一个近似 0.1的数
  
    ```java 浮点误差
    public class Main {
      public static void main() {
        double x = 1.0 / 10;
        double y = 1 - 9.0 / 10;
      System.out.printfln(x);
        System.out.printfln(y);
      }
    }
    ```
  
    



## 流程控制

### 输入输出：

 - 输出：`System.out`

   - `System.out.println`：print line的缩写，表示输出并换行

   - `System.out.printf`：格式化输出

     ```java 格式化输出
     public class Main {
       public static void main() {
         double d = 3.1415926;
         int n = 12345000;
         System.out.printf("%.2f¥n", d); // 输出两位小数 3.14
         System.out.printf("%.4f¥n", d); // 输出4位小数
         System.out.printf("n=%d, hex=%08x", n, n) // n=12345000 hex=00bc5ea8 两个%占位符必须输入两个
       }
     }
     ```

     Java的占位符

     占位符 | 说明
     :-: | :-:
     %d | 格式化输出为整数
     %x | 格式化输出为十六进制整数
     %f | 格式化输出为浮点数
     %e | 格式化输出为科学计数法表示的浮点数
     %s | 格式化字符串

- 输入 

### if判断

### switch 判断

### while循环

### do while 循环

### for 循环

- for循环

- for each 循环：遍历数组、list、map，或者说“可迭代”的数据类型

  ```java for each循环
  public class Main {
    public static void main(String[] args) {
      int[] ns = {1, 4, 9, 16, 25};
      for(int n:ns) {
        System.out.println(n);
      }
    }
  }
  ```

### break 和 continue 

## 命令行参数

Java程序的入口是`main`方法，而`main`方法接受一个命令行参数，它是一个`String[]`数组

```java
public class main{
  public static void main(String[] args) {
    for(String arg:args) {
      if("-version".equals(arg)) { // 当输入 version 命令时，输入版本
        System.out.println("v 1.0");
        break;
      }
    }
  }
}
```

执行编译后的main.class

```
java main -version // v 1.0
```





