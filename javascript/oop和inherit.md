
### 面向对象

  - 面向对象是一个编程思想，编程是为了解决问题，编程思想就是在解决问题的时候的所用到的思想

  - 算法

  - 对象：无序的集合，有若干键值对组成

  - 面向对象和面向过程
    - 面向过程：解决问题拆分成数个步骤
    - 面向对象：创造一个或多个对象来解决问题，对象需要提前设置方法

#### 面向对象的特点
- 特点：
  - 抽象：
    需要解决的问题的相关联系信息抽离出来进行整体思想

  - 封装：把核心代码封装起来，只留出有限的接口供使用
  - 继承：类之间的继承，为了代码复用，多重继承
  - 多态：指的保留一个类的方法不变，传入不同的类实现不同的操作，不 
   yuyl同的对象作用于同一操作产生不同的结果

#### 创建对象的方式
- 创建
  - 字面量：创建一个对象，为对象分别添加属性和方法
    ```JavaScript
    var obj = { name: 'Jim' }
    ```
  - 工厂函数创建：利用函数来创建对象，并将创建的对象返回出去，这种模式叫做工厂模式，函数叫做工厂函数
    ```JavaScript
    function factory () {
      var obj = {
        name: 'Jim',
        age: 25
      }
      return obj
    }
    ```
    - 缺点：
      - 不能 new 创造实例
      - 函数内的方法属性重复创造，占用内存，不能复用
    > 工厂函数
  - 构造函数创建对象
    ```JavaScript
    function Creator () {
      this.name = 'Jim'
      this.age = 25
      this.say = function () {
        say = 'my name is' + this.name
        alert(say)
      }
    }
    var persona = new Creator()
    ```
    > 构造函数都有prototype对象

    > 关于 new 
    > 1. 创建对象
    > 2. 将对象的原型对象指向函数的原型对象
    > 3. 在执行函数的时候把函数中的this指向这个对象
    > 4. 返回这个对象



### 继承
- 子类执行父类
  ```JavaScript
  function father () {
    this.name = 'tom'
    this.age = 35
    this.say = function () {
      alert (111)
    }
  }
  function son () {
    this._father = father
    this._father()
    this.sonName = 'Jim'
    this.sonAge =  24
  }
  ```
- 通过 `call`、`apply`执行父类
  ```JavaScript
  function father () {
    this.name = 'tom'
    this.age = 35
    this.say = function () {
      alert (111)
    }
  }
  function son () {
    father.call(this)// 或者 father.apply(this)
    this.sonName = 'Jim'
    this.sonAge =  24
  }
  ```
- 原型式继承
  ```JavaScript
  function father () {
    this.name = 'tom'
    this.age = 35
    this.say = function () {
      alert (111)
    }
  }
  function son () {
    this.sonName = 'Jim'
    this.sonAge =  24
  }
  son.prototype = new father()
  ```
- 子类执行父类，子类原型继承父类原型
  ```JavaScript
  function father () {
    this.name = 'tom'
    this.age = 35
    this.say = function () {
      alert (111)
    }
  }
  function son () {
    father.call(this)
    this.sonName = 'Jim'
    this.sonAge =  24
  }
  son.prototype = { ...father.prototype }
  ```
