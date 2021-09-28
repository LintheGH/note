---
title: ES6及后续新特性
categories: 
- Code
- JavaScript
tags: 
- ES6
notebook: JavaScript
---

## ES6 model 模块语法
---
> ES6 模块语法采用尽量**静态化**方法，使得在编译时就能够确定模块依赖关系。
> 由于采用静态化的方法，使得导入`import` 和导出`export` 时如果在语句中会报错，导入导出要在模块顶层任意位置

- 采用严格模式
    - ES6 的模块自动采用严格模式
        > - 变量必须声明后再使用
        > - 函数的参数不能有同名属性，否则报错
        > - 不能使用with语句
        > - 不能对只读属性赋值，否则报错
        > - 不能使用前缀 0 表示八进制数，否则报错
        > - 不能删除不可删除的属性，否则报错
        > - 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
        > - eval不会在它的外层作用域引入变量
        > - eval和arguments不能被重新赋值
        > - arguments不会自动反映函数参数的变化
        > - 不能使用arguments.callee
        > - 不能使用arguments.caller
        > - 禁止this指向全局对象
        > - 不能使用fn.caller和fn.arguments获取函数调用的堆栈
        > - 增加了保留字（比如protected、static和interface）

- `export` 命令
    - 分别导出
    ```javascript
    //分别导出
    export var firstName = 'Michael';
    export var lastName = 'Jackson';
    export var year = 1958;
    ```
    - 导出一组变量的方法
    ```
    //导出一组变量的方法
    var firstName = 'Michael';
    var lastName = 'Jackson';
    var year = 1958;
    
    export {firstName, lastName, year};
    ```
    - 导出函数
    ```
    exprot function(){
        //some javascript
    }
    ```
    - 导出时通过 `as` 重命名
    ```
    function v1 (){...}
    function v2 (){...}
    
    export {
        v1 as streamV1,
        v2 as streamV2,
        v2 as streamLastestVersion//一般来说重复导出和导出只会执行一次，通过 as 重命名包一个接口导出两次
    }
    ```
    - 输出动态接口，其他模块可以访问动态值
    ```
    export var foo = 'bar';
    setTimeout(() => foo = 'baz', 500);//500 毫秒后值改变
    ```
    - **默认输出**
    ```
    //导出匿名函数
    export default function () {
        console.log('foo');
    }
    
    //导出具名函数
    export default function foo() {
        console.log('foo');
    }
    // 或者写成
    function foo() {
        console.log('foo');
    }
    export default foo;//把 foo 作为default 导出
    ```
- import 导入模块
    - 
    ```
    // main.js
    import {firstName, lastName, year} from './profile.js';
    
    function setName(element) {
    element.textContent = firstName + ' ' + lastName;
    }
    ```
    - 重命名
    ```
    import { lastName as surname } from './profile.js';
    ```
    - 导入整个模块
    ```
    import './lodash'//仅执行，不导入值
    ```
    - 整体导入
    ```
    //circle.js
    export function area(radius) {
        return Math.PI * radius * radius;
    }
    export function circumference(radius) {
        return 2 * Math.PI * radius;
    }
    
    //main.js
    import * as circle from './circle';
    console.log('圆面积：' + circle.area(4));
    console.log('圆周长：' + circle.circumference(14)); 
    ```
    - 导入 default
    ```
    //MyClass.js
    export default class { ... }
    
    // main.js
    import MyClass from 'MyClass';//可以以任意名称导入
    let o = new MyClass();
    ```
## 新增语法/运算符
---
- 箭头函数

  - 使用箭头函数的注意点

    - 箭头函数没有自己的 `this`
  
      箭头函数没有自己的`this`对象，内部的`this`就是定义时上下层作用域中的`this`。箭头函数内部的`this`指向是固定的。
  
      ```javascript
      function foo() {
        setTimeout(() => {
          console.log('id:', this.id);
        }, 100);
      }
      
      var id = 21;
      
      foo.call({ id: 42 }); // 42
      
      
      function bar() {
        setTimeout(function() {
          console.log('id_:', this.id_);
        }, 100);
      }
      
      var id_ = 21;
      
      bar.call({ id_: 42 }); // 21
      ```
      
      
  
- 字符串模版

  - 使用`` `来标识，可以当做普通的字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

    ```javascript
    let text = `Hello
    world` // 空格和换行被保留
    let text2 = `this is a param ${param}， and a function ${fn()}` // 变量或函数 
    ```

  - 模版编译

    ```javascript
    ```

  - 标签模版：模版字符串跟在一个函数后面，该函数被调用来处理这个字符串。这种被称为“标签模版”功能

    ```javascript
    alert`Hello`
    // 等同于
    alert(['Hello'])
    ```

    标签模版其实不是模版，而是调用函数的一种形式。

    如果模版字符里面有变量，则有一定的规则处理成多个参数

    ```javascript
    let a = 5;
    let b = 10;
    
    tag`Hello ${a + b} world ${a * b}`
    // 等同于
    tag(['Hello ', ' world ', ''], 15, 50)
    ```

    标签模版把变量前后的字符组成第一个字符串数组。

- `...`运算符
  
  - `...option` 作为函数中的形参时，option 是一个数组，接收多个参数
    
      ```javascript
      // 定义
      let fn = function (param, ...option) {
          return option
      }
      // 调用
      fn('a', 'b', 'c')// 结果为 ['b', 'c']
      ```
  
- `::`运算符
  
  - call/apply/bind 函数绑定的替代，`::`运算符
      - 函数绑定运算符是并排的两个冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。
          ```javascript
          foo::bar;
          // 等同于
          bar.bind(foo);
          
          foo::bar(...arguments);
          // 等同于
          bar.apply(foo, arguments);
          
          const hasOwnProperty = Object.prototype.hasOwnProperty;
          function hasOwn(obj, key) {
              return obj::hasOwnProperty(key);
          }
          ```
      - 如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。
          ```javascript
          var method = obj::obj.foo;
          // 等同于
          var method = ::obj.foo;
          
          let log = ::console.log;
          // 等同于
          var log = console.log.bind(console)
          ```
      - 如果双冒号运算符的运算结果，还是一个对象，就可以采用链式写法。
          ```javascript
          import { map, takeWhile, forEach } from "iterlib";
          
          getPlayers()
          ::map(x => x.character())
          ::takeWhile(x => x.strength > 100)
          ::forEach(x => console.log(x));
          ```
  
- 语法

  - 装饰器

    装饰器是与类相关的语法，用来修饰或修改类和类方法。

    ```javascript
    @frozen
    class Foo {
      @configurable(false)
      @enumerable(true)
      method() {}
      
      @throttle(500)
      expensiveMethod() {}
    }
    ```

    - 类的装饰器

      ```javascript
      @testable
      class Foo {
        // ...
      }
      
      function testable(target) {
        target.isTestable = true
      }
      
      Foo.isTestable // true
      ```

      `testable`装饰器为 Foo 类添加了 `isTestable` 的静态属性，如果需要在实例上添加属性需要在原型中添加

      ```javascript
      function testable(target) {
        target.prototype.isTestable = true
      }
      const inst = new Foo()
      inst.isTestable // true
      ```

      如果需要修改装饰器的行为

      ```javascript
      function testable(isTestable) {
        return function(target) {
          target.isTestable = isTestable;
        }
      }
      
      @testable(true)
      class MyTestableClass {}
      MyTestableClass.isTestable // true
      
      @testable(false)
      class MyClass {}
      MyClass.isTestable // false
      ```

    - 方法的装饰器

      ```javascript
      class Person {
        @readonly
        name() { return `${this.first} ${this.last}` }
      }
      
      function readonly(target, name, descriptor){
        // descriptor对象原来的值如下
        // {
        //   value: specifiedFunction,
        //   enumerable: false,
        //   configurable: true,
        //   writable: true
        // };
        descriptor.writable = false;
        return descriptor;
      }
      
      readonly(Person.prototype, 'name', descriptor);
      // 类似于
      Object.defineProperty(Person.prototype, 'name', descriptor);
      ```
  
    - 属性装饰器：属性装饰器属于 TS 的范畴
  
      接收两个参数：
  
      - target：装饰静态成员来说是类的构造器，对于实例成员来说是类的原型
      - Key：装饰的属性名
  
      返回的结果会被忽略
  
      ```typescript
      function add(target, key) {
      	target.a = key
      }
      
      class Foo {
      	@add
        b = 1
      }
      
      const bar = new Foo()
      bar.a // 'b'
      ```
  
      
  
  - 可选链新特性：
    ```javascript
      const obj = {
        a_: 'a_',
        a: {
          b_: 'b_',
          b: {
            c: 12345,
            fn: () => {
              return 'this is funtion'
            }
          }
        }
      }
    
      const value = obj?.a?.b?.c 
    
      const objFnResult = obj?.a?.b?.fn?.() //.()运算符适用于之前的表达式
    
      const value2 = obj?.['a']?.b?.c // 如果对象中有该key对应的value，则返回value，否则返回undefined


      console.log(value, objFnResult, value2) // 12345 this is function 12345
    ```


## 数组方法扩展
---
- `find()`  数组实例方法
  > 返回第一个符合条件的成员
  
  ```javascript
  [1, 4, -5, 10].find((n) => n < 0) // -5
  
  [1, 5, 10, 15].find(function(value, index, arr) {
      return value > 9;
  }) // 10
  
  // 绑定了this
  function f(v){
    return v > this.age;
  }
  let person = {name: 'John', age: 20};
  [10, 12, 26, 15].find(f, person);    // 26
  
  ```

  - find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。

  - find 方法每次遍历，都要执行判断函数

  - 可以接受第二个参数，用来绑定回调函数的this对象。

  - `findIndex()` 和 `find()`实例方法类似，返回第一个符合条件成员的索引

- `fill()`数组实例方法
  > 使用给定值，填充指定数组
  
  - 填充数组
    ```javascript
    ['a', 'b', 'c'].fill(7)
    // [7, 7, 7]， 元素组中的成员会被替换
    
    new Array(3).fill(7)
    // [7, 7, 7]
    
    ```
  
  - 接受第二、三个参数，指定替换元素的位置
    ```javascript
    ['a', 'b', 'c'].fill(7, 1, 2)
    // ['a', 7, 'c']
    ```
    表示数值7替换掉索引1开始，2结束之前的元素

  - 如果填充的类型为对象，那么被赋值的是同一个**内存地址的对象**，而不是深拷贝对象。
    ```javascript
    let arr = new Array(3).fill({name: "Mike"});
    arr[0].name = "Ben";
    arr
    // [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]
    
    let arr = new Array(3).fill([]);
    arr[0].push(5);
    arr
    // [[5], [5], [5]]
    ```
## 新数据类型
---
- `Symbol`
  
  - `Symbol()`：通过`Symbol()`创建的值都是独一无二的。
    - `Symbol()`创建的值为原始值类型，所以，`new Symbol()`会报错。
    - `Symbol()`方法接受一个参数作为标示区分，如果参数是对象，则先调用对象的`toString`方法，再生成Symbol值
      ```javascript
      const s = Symbol() // Symbol
      const s2 = Symbol('foo') // Symbol('foo')
      
      const obj = {
        toString() {
          return 'abc'
        }
      }
      const s3 = Symbol(obj) // Symbol('abc')
      ```
    - `Symbol()`的参数仅作为标示区分，两个参数相同的Symbol是不同的
      ```javascript
      const s = Symbol('foo')
      const s2 = Symbol('foo')
      
      s === s2 // false
      ```
    > Symbol 值不能参与运算，会报错

    > Symbol 可以转换成String类型数据， `String(Symbol('foo'))`输出字符串`'Symbol(foo)'`

    > Symbol 可以转换为Boolean类型， `Boolean(Symbol())`的结果为`true`

  - `Symbol.prototype.description`属性：在创建Symbol类型数据时如果传入参数作为描述，此属性可以返回描述
    ```javascript
    const s = Symbol('foo')
    s.description // foo
    ```
  - `Symbol`作为属性名的遍历：该属性不会出现在`for...in`、`for...of`、`Object.keys()`、`JSON.Stringify()`、`Object.getOwnPropertyNames()`中
    
    > `Object.getOwnPropertySymbols()` 可以返回一个以`Symbol`作为属性名的Symbol数组
    
  - `Symbol.for()``Symbol.keyFor()`： `Symbol.for()`表示重用一个Symbol，`Symbol.keyFor()`返回一个已登记的Symbol值的key
    ```javascript
    var s = Symbol('foo')
    var s2 = Symbol('foo')
    s === s2 // false
    
    var s3 = Symbol.for('foo')
    var s4 = Symbol.for('foo')
    s3 === s4 // true
    ```
    使用`Symbol.for()`时，系统会全局搜索以`'foo'`作为key的Symbol的值，没有则创建，有则返回此symbol值。
    > `Symbol.for()`创建是symbol值会在全局登记，而`Symbol()`创建的symbol值不会全局登记
  
    ```javascript
    const s = Symbol.for('foo')
    Symbol.keyFor(s) // 'foo'
    
    const s2 = Symbol('foo')
    Symbol.keyFor(s2) // undefined
    
    ```

## `Iterator`遍历器和`for...of`循环
---
  - `Iterator`遍历器：为各种数据结构提供统一的，处理（遍历）数据成员的一种接口机制。当数据集合拥有了遍历器（Iterator），则此数据集合为可遍历的数据集合，则可用于`for...of``Set()``Map()`的方法操作。
    - `Iterator`的模拟：
      - `Iterator`的遍历过程：
        1. 创建一个指针对象，指向当前的数据结构的其实位置，也就是说，遍历器对象实际是一个指针对象
        2. 第一次调用指针对象的`next()`，将指针指向第一个数据成员
        3. 第二次调用指针对象的`next()`，将指针指向第二个数据成员
        4. 不断调用`next()`，直到所有数据成员被遍历，指针指向数据结构的结束位置
        > 每次调用`next()`，都会返回成员信息：一个包含成员和遍历结束标志{value, done}
      ```javascript
      function markIterator(array) {
        let nextIndex = 0
        return {
          next() {
            return (nextIndex<arr.length?
            {value: array[nextIndex], done: false}:
            {value:undefined, done: true}
            )
          }
        }
      }
      
      var it = markIterator(['a', 'b']) // 1. 创建指针对象，{next(){...}}
      
      it.next() // 2. 指针指向第一个成员 {value: 'a', done: false}
      it.next() // 3. 指针指向第二个成员 {value: 'b', done: false}
      it.next() // 4. 所有成员已被遍历，指针指向结束位置 {value: undefined, done: true}


      // 对于遍历器来说： value: undefined和done: false可以忽略，上面可以简写成：
      /*  
        function markIterator(array) {
          let nextIndex = 0
          return {
            next() {
              return (nextIndex<arr.length?{value: array[nextIndex]}:{done: true})
            }
          }
        }
      */
      ```
    
    - 默认 `Iterator` 接口
    
      ES6 规定默认的`Iterator`接口部署在`Symbol.Iterator`上。`Symbol.Iterator`键名是一个Symbol特殊值，值是一个函数，执行此函数则返回一个遍历器
    
      - 原生拥有`Iterator`的数据结构： 
        - `Array`
        - `String`
        - `Set`
        - `Map`
        - 类Array对象
        - 函数的 arguments 对象
        - NodeList 对象
    - 拥有`Iterator`的数据结构的`for...of`循环：当数据结构拥有了`Iterator`，就可以被`for...of`操作，因此，`for...of`的操作实际上是调用`Iterator`接口产生的遍历器
      ```javascript
      const arr = ['red', 'green', 'blue'];
    
      for(let v of arr) {
        console.log(v); // red green blue
      }
    
      const obj = {};
      obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);
    
      for(let v of obj) {
        console.log(v); // red green blue
      }
      ```
    - 调用`Iterator`的场合：
      - 结构赋值
      - 扩展运算符`...`
      - `Generator`
      - `for...of`
      - `Array.form()`
      - `new Set()`
      - `new Map()`
      - `Promise.all()`
      - `Promise.race()`


## 新数据结构
---
  - `set`
    - set 本身是一个构造函数，构造出来的结果类似于数组，但成员唯一不重复
      ```javascript
      const s = new Set();
      
      [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
      
      for (let i of s) {
        console.log(i);
      } // 2,3,5,4
      
      ```
      `Set`函数接受一个`可迭代对象iterable`作为参数，用来初始化
      > iterable 包括 字符串，数组，类数组对象等可遍历对象
      ```javascript
      // 例一
      const set = new Set([1, 2, 3, 4, 4]);
      [...set]
      // [1, 2, 3, 4]
      
      // 例二
      const items = new Set('abccdeefgg');
      [...items]
      // [a,b,c,d,e,f,g]
      ```
      向 Set 加入值的时候，不会发生类型转换，`所以5和"5"是两个不同的值`。Set 内部判断两个值是否不同，使用的算法叫做`“Same-value-zero equality”`，它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。
      ```javascript
      let set = new Set();
      let a = NaN;
      let b = NaN;
      set.add(a);
      set.add(b);
      set // Set {NaN}
      ```
    - `Set`的实例方法和属性
      - 两个属性
        - `constructor`: 构造函数，默认是set本身
        -  `size`: 实例属性，返回实例成员总数

      - `add(value)`: 实例方法。向实例中添加成员，重复的成员不会重复添加，返回值为 Set 结构本身
        ```javascript
        const s = new Set()
        s.add(1)
        s.add(2)
        s.add(1)
        
        s.size // 2
        
        s.add(NaN)
        s.add(NaN)
        s.size // 3 NaN会被认为是相同的，不会重复添加
        
        // 可以链式调用
        s.add(5).add(6)
        s.size // 5
        ```
      - `delete(value)`：实例方法。删除实例成员，返回值为 boolean ，用于判断是否删除成功
        ```javascript
        const s = new Set([1,2,3,3,4,4])
        s.size // 4
        s.delete(2) // true
        s.size // 3
        ```
      - `has(value)`： 实例方法。判断实例内是否有某成员， 返回值为 boolean， true 为含有，false 为没有
        ```javascript
        const s = new Set([1,2,3,4,5,7,7])
        s.has(6) // false
        s.has(7) // true
        ```
      - `clear()`： 实例方法。清除实例内所有成员，没有返回值
        ```javascript
        const s = new Set([1,2,3,4,5,5])
        s.clear()
        s.size // 0
        ```
      - `keys()`、`values()`和`entries()`： 实例方法。返回值都是遍历器对象。由于 Set 结构没有键名，只有键值，或者说键名和键值一致，所以 `keys()`和`values()`的结果一致。`entries()`方法返回是键名和键值的组合。
        ```javascript
        const s1 = new Set(['red', 'blue', 'green'])
        for(let item of s1.keys()) {
          console.log(item)
        }
        // red
        // blue
        // green
        
        for(let item of s1.values()) {
          console.log(item)
        }
        // red
        // blue
        // green
        
        for(let item of s1.entries()) {
          console.log(item) 
        }
        // ['red', 'red']
        // ['blue', 'blue']
        // ['green', 'green']
        ```
      - `forEach()`： 实例方法。
        ```javascript
        const s = new Set([1,2,3])
        
        s.forEach((value, key, set) => {
          console.log(key + ':' + value)
        });
        // 1: 1
        // 2: 2
        // 3: 3
        
        ```
      - 关于`Set`数据类型的一些操作
        - 和扩展运算符 `...` 的使用：

           `...`扩展运算符内部使用 `for...of`遍历，所以`...`扩展符可以作用于 Set 集合,`[...new Set([1,2,3,4,5,5])]`、`[...new Set('aabbccdd')]`之后便可用数组方法便利地操作数据

        - 遍历Set同时改变内部数据
          目前没有直接方法在遍历Set结构同时改变内部值的方法，可以通过间接方法实现
          ```javascript
          // 方法1: 原Set结构映射为新的结构，然后再赋值到原Set结构
          var set1 = new Set([1,2,3,4])
          set1 = new Set([...set1].map(val => val*2)) // 键值变为原来两杯
          
          // 方法2: 使用 Array.from() 方法
          var set2  = new Set([5,6,7,8,9])
          set2 = new Set(Array.from(set, (val) => val*2 ))
          ```
  - `Map` JS的 Object 对象，只能用字符串作为键值，而`Map` 结构的键值可以是字符串外的其他数据类型
    ```javascript
    const data = {};
    const element = document.getElementById('myDiv');
    
    data[element] = 'metadata';
    data['[object HTMLDivElement]'] // "metadata"
    // DOM 节点作为对象data的键，但是由于对象只接受字符串作为键名，所以element被自动转为字符串[object HTMLDivElement]。
    
    const m = new Map()
    const o = {p: 'Hello World'}
    
    m.set(o, 'content')
    m.get(0) // content
    ```

    `Map` 接受任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构作为参数
    ```javascript
    const set = new Set([
      ['name', '124'],
      ['age', '24'],
    ])
    
    const map = new Map(set)
    map.get('name') // 124
    map.get('age') // 24
    
    const map2 = new Map([['foo', 'bar']])
    const map3 = new Map(map2)
    map3.get('foo') // bar
    ```
    以引用类型数据作为键值时，要注意设值和取值的键名
    ```javascript
    const map = new Map()
    
    map.set(['a'], 'content')
    map.get(['a']) // undefined
    
    const a = ['a']
    map.set(a, 'content')
    map.get(a) // content
    ```

      - `Map` 的实例方法和属性
        - 属性
          - `size`:实例属性，返回成员总数
        - 方法
          - `set(key, val)`：设置map的键值对，参数分别为 `key`和对应的`vale`， 返回值是当前map对象
            ```javascript
            const map = new Map()
            map.set('name', 'zhangsan').set('age', 24)
            map.get('name') // zhangsan
            map.get('age') // 24
            
            map.set('age', 30)
            map.get('age') // 30 
            ```
        - `get(key)`： 读取map对象的值，返回为键值对的值
          ```javascript
          const map = new Map()
          const hello = function() {console.log('aaa')}
          map.set(hello, 'es6')
          map.get(hello) // es6
          ```
        - `has(key)`：返回值为boolean
          ```javascript
          const map = new Map()
          map.set('name', 'zhangsan')
          map.has('name') // true
          map.has('age') // false
          ```
        - `delete(key)`：删除某键值对，返回值为boolean
          ```javascript
          const map = new Map([['name', 'zhangsan'], ['age', 24]])
          map.delete('name') // true
          map.get('name') // undefined
          ```
        - `clear()`：清除map对象成员，没有返回值
          ```javascript
          const map = new Map([['name', 'zhangsan'], ['age', 24]])
          map.get('name') // zhangsan
          map.clear()
          map.get('name') // undefined
          ```
        - `keys()`、`values()`和`entries()`： 遍历器。
          ```javascript
          const map = new Map([['F', 'no'], ['T', 'yes']])
          
          for(let item of map.keys()) {
            console.log(item)
          }
          // F
          // T
          for(let item of map.values()) {
            console.log(item)
          }
          // no
          // yes
          for(let item of map.entries()) {
            console.log(item[0] + ':' +item[1])
          }
          // F: no
          // T: yes
          
          // map结构转换为数组
          [...map.keys()] // ['F', 'T']
          [...map.values()] // ['no', 'yes']
          [...map.entries()] // [['F', 'no'], ['T', 'yes']]
          ```