---
title: java学习 02
tags: [java]
---

Java 学习 02
<!-- more -->

## 类和实例

```java 类
public class Person {
  public String name;
  public int age;
}

public class Book {
  public String name;
  public String author;
  public String isbn;
  public double price;
}

```

一个类可以包含多个字段`field`，字段用来描述一个类的特征。

```java 创建实例
Person ming = new Person();
ming.name = "Xiao Ming";
ming.age = 20;
System.out.println(ming.name); // Xiao Ming
```

### 私有变量、方法

```java 私有
public class Main {
  public void main() {
    Person ming = new Person();
    ming.setName("Xiao Ming");
    ming.setAge(24);
    System.out.pirntln(ming.getName() + ", " + ming.getAge()); // Xiao Ming, 24
  }
}
class Person {
  private String name;
  private int age;
  public void setName(String name) {
    this.name = name;
  }
  public void setAge(int age) {
    this.age = age;
  }
  public String getName() {
    return this.name;
  }
  public int getAge() {
    return this.age;
  }
}
```

### 方法

```
修饰符 方法返回类型 方法名(方法参数列表) {
	若干语法；
	return 方法返回值；
}
```

- `this`变量

  方法内部可以使用`this`变量，始终指向当前实例。
  
- 方法参数

  ```java 参数
  class Person {
    ...
    public void setNameAndAge(String name, int age) {
      
    }
  }
  
  Person ming = new Person();
  ming.setNameAndAge("Xiao Ming", 24); // 与规定的参数类型和数量一一对应，否则报错
  ming.setNameAndAge("Xiao Ming"); // error
  ming.setNameAndAge(12); // error
  ```

- 可变参数

  ```java 可变参数
  class Group {
    public String[] name;
    public void setName(String... name) {
      this.name = name;
    }
  }
  ```

  

- `private`方法

  ```java private方法
  public class Main {
    public static void main() {
      Person ming = new Person();
      ming.setBirth(2000);
      System.out.println(ming.getAge()); // 20
    }
  }
  
  class Person {
    private String name;
    private int birth;
    public void setBirth(int birth) {
      this.birth = birth;
    }
    public int getAge() {
      return calcAge(2020);
    }
    private int calcAge(int year) {
      return year - this.birth;
    }
  }
  ```

  

### 构造方法

