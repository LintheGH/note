---
title: JavaScript 高级程序设计第4版
tags: [JavaScript]
date: 2020/12/9 14:53:17
categories: 
- Code
- JavaScript
---

## JavaScript 组成

- ECMAScript：JavaScript语言标准
- DOM：文档对象模型
- BOM：浏览器对象模型

### HTML中的 JavaScript

#### 推迟执行、异步执行脚本

- defer：推迟执行脚本，只能在外部脚本中使用，脚本会被推迟执行，但会保证按照顺序在`DOMContentLoaded`之前执行。

- async：异步执行脚本，只能在外部脚本中使用。立即下载脚本，不会根据脚本顺序执行，保证会在在`Loaded`后执行。

  > 实际中，defer中的两个脚本不一定会按照顺序和在`DOMContentLoaded`之前执行，因此，在开发中并不推荐使用defer和async

## 语言基础

### var、let、const

- var：函数作用域、声明提升
- let：块作用域、暂时性死区、没有声明提升、不可重复
- const：块作用域、暂时性死区、没有声明提升、初始化必需赋值、不可修改、不可重复

### 数据类型

#### 基本数据类型

- Undefined：

  - undefined：变量未赋值时的默认值

- null(特殊，也可以说是引用类型)：

  - null：typeof null // Object

- Boolean：

  - true

  - False

    > 各数据类型和Boolean类型的相互转换

- Number：

  - 浮点值：

    - 科学计数法

    - 浮点精度问题：

      由于使用IEEE 754数值，浮点值精度会存在误差。如 0.1 + 0.2 = 0.30000000000000004 而非 0.3。采用IEEE 754的语言都有相同的浮点精度问题，如JAVA

    - 值的范围：由于内存的限制，ECMAScript并不支持所有值，Number.MIN_VALUE保存浏览器能够表示的最小值，Number.MAX_VALUE保存浏览器能够保表示的最大值。超过表示范围的数会被记为 `-Infinity`和`Infinity`，并且不能进一步计算。

    - `isInfite()`函数可以确定一个值是否可表示

    - `NaN`：not a number，表示需要返回数值的操作失败。`NaN !== NaN`，NaN不等于任何值

      - `isNaN`：表示值是否是NaN

  - 其他类型值转换为Number

    - `Number()`
    - `parseInt()`
    - `parseFloat()`

- String：与其他语言相比，ECMAScript没有`''`和`""`的区分

  - 字符串不可变：字符串创建后不可变，要修改字符串值，需要销毁原始字符串再创建一个新的字符串
  - 其他类型值转为字符串：`toString()`（null、undefined）没有`toString()`方法

- Symbol：唯一不可变。

  - 基本使用

    ```javascript
    let gs = Symbol();
    let os = Symbol();

    console.log(gs == os); // false

    let gss = Symbol('foo');
    let oss = Symbol('foo');
    console.log(gss == oss); // false
    ```

  - `Symbol.for('foo')`使用全局符号注册表

    使用`Symbol.for`时，首先在全局检索使用 foo 描述的符号，存在则返回该符号，不存在则创建后返回该符号。
    
    ```javascript Symbol全局符号注册
    let gss = Symbol.for('foo');
    let oss = Symbol.for('foo');
    
    console.log(gss == oss); // true
    
    let localSym = Symbol('foo');
    let globalSym = Symbol.for('foo');
    console.log(localSym == globalSym); // false
    ```
    
  - `Synbol.keyFor`查询全局注册符号，返回符号对应的字符串键

    ```javascript Symbol.keyFor
    let gs = Symbol('foo');
    let oss = Symbol.for('bar')
    
    console.log(Symbol.keyFor(gs)); // undefined 只能查询全局注册的符号
    console.log(Symbol.keyFor(oss)); // bar
    ```

    

  - 使用符号作为属性：凡是可以用字符串或数值作为属性的地方，都可以用符号。

    ```javascript
    const s1 = Symbol(),
        	s2 = Symbol(),
          s3 = Symbol();
    
    const o = {
      [s1]: 'foo',
      [s2]: 'bar',
      a: 'aaa',
    }
    o[s3] = 'foo bar'
    
    ```
  ```
  
  
  ```
  
- Symbol的实例属性在`for...in`遍历中不能取出来
  
    ```javascript
    const s1 = Symbol('foo');
    const s2 = Symbol('bar');
    const o = {
      [s1]: 'foo',
      [s2]: 'bar',
      a: 'aa',
    }
    
    for(let key in o){
      console.log(key, o[key]);
    } // a aa
    ```
  
- 获取实例对象中的Symbol
    ```javascript
    const s1 = Symbol('foo');
    const s2 = Symbol('bar');
    const o = {
      [s1]: 'foo',
      [s2]: 'bar',
      a: 'aa',
    }
    // 获取Synbol
    Object.getOwnPropertySymbol(o); // [Symbol (foo), Symbol(bar)]
    
    // 获取实例属性
    Object.getOwnPropertyNames(o); // ['a']
    
    //获取实例对象的常规、符号属性描述的对象
    Object.getOwnPropertyDescriptors(o); 
	```

  > `Object.getOwnPropertySymbols`和`Object.getOwnPropertyNames`的返回值彼此互斥

- `Symbol.iterator`迭代器：作为对象的迭代器供`for...of`使用
  
    

#### 引用数据类型

- Object

### 操作符

作用于字符串、数值、布尔值、对象。应用于对象时，会调用`valueOf`或`toString`方法来取得可以计算的值。

#### 一元操作符

- 递增/递减操作符

  ```javascript
  let age = 28;
  let age2 = ++age + 2;
  
  console.log(age); // 29
  console.log(age2); // 31
  
  let num = 2;
  let num2 = 20;
  let num3 = num++ + num2;
  let num4 = num + num2;
  console.log(num3); // 22
  console.log(num4); //23
  
  // 递减同理
  ```

- 一元加/减

  作用于数值时，不会发生转变；作用于非数值时，相当于调用`Number()`转换，作用于对象时，会调用`valueOf`或`toString`。

  ```javascript
  let num = 25;
  num = +num;
  console.log(num); // 25
  
  let s = '01'
  let s2 = '1.2'
  let s3 = 's'
  let b = false
  let f = 1.2
  let o = {
    valurOf: function() {
      return -1
    }
  }
  
  console.log(+s, +s2, +s3, +b, +f, +o); // 1 1.2 NaN 0 1.2 -1
  console.log(-s, -s2, -s3, -b, -f, -o); // -1 -1.2 NaN -0 -1.2 1
  ```

- 位操作符

  - `~`按位非
  - `~`按位与
  - `|`按位或
  - `^`按位异或
  - `<<`左移
  - `>>`有符号右移
  - `>>>`无符号右移

#### 布尔操作符

- `!`逻辑非：转换为boolean后取反
- `&&` 逻辑与：
- `||` 逻辑或

#### 乘性操作符

- `*`乘法操作符：

  操作数是数值：执行常规乘法。

  任意操作数是NaN：返回NaN

  Infinity * 0: NaN

  Infinity * (非零数)：根据非零数符号返回 Infinity 或 -Infinity

  Infinity * Infinity：Infinity

- `/`除法操作符

- `%`取模操作符

#### 指数操作符

ECMAScript 7 新增了指数操作符`**`。与`Math.pow()`有相同的效果。

```javascript
console.log(Math.pow(3, 2)); // 9
console.log(3 ** 2); // 9

console.log(Math.pow(16, 0.5)); // 4
console.log(16 ** 0.5); // 4
```

#### 加性操作符

- 加法操作符

  - 若两操作数为数字，则根据规则返回结果。
  - 如果其一是字符串
    1. 如果两个操作数都是字符串，直接拼接起来
    2. 如果只有一个字符串，则将另一个操作数转换为字符串，再将两数拼接
  - 如果一方不是字符串或者数字，那么将会转化为数字或字符串，对象先调用`valueOf()`，没有则调用`toString()`;若为`undefined`或 `null`，则调用`String()`函数，分别获取`"undefined"` 和 `"null"`

  ```javascript 加法操作
  console.log( 5 + 5); // 10
  console.log('5'+ 5);// '55'
  console.log({toString: function() {return 123}} + 1); //124
  console.log(true + '123'); // true123
  console.log(true + 123); // 124
  console.log([1,2,4,5] + 123); // 1,2,3,4,5123
  ```

  

- 减法操作符

  - 两操作数是数值，执行减法操作返回结果
  - 任一操作数为 NaN，直接返回 NaN
  - 如果有任一操作数是字符串、布尔值、null 或 undefined，则先使用`Number()`将其转换为数值，然后再根据前面的规则执行数学运算。
  - 如果任一操作数是对象，则调用其`valueOf()`方法取得表示它的数值。如没有`valueOf()`方法，则调用`toString()`方法，转换后进行运算。

  ```javascript 减法操作符
  console.log(2 - 1); // 1
  console.log(NaN - 1); // NaN
  console.log('123' - 1); //122
  console.log(null - 1); //-1
  console.log(undefined - 1); // NaN
  console.log([1,2,3,4] - 1); //  NaN
  console.log({valueOf: function() {return 123}} - 1); // 122
  ```

  #### 关系操作符：`<` `>` `<=` `>=`

  - 如果操作数都是数值，则执行数值比较
  - 如果操作数都是字符串，执行对应的字符编码比较
  - 任一操作数是数值，将另一个操作数转换为数值比较
  - 任一操作数是对象，则调用`valueOf()`，取得结果后根据前面的规则比较，没有则调用`toString()`方法
  - 任一操作数是布尔值，转换为数值比较

  ```javascript 关系操作符
  1 < 2; // true
  'A' > 'a'; // false
  1 < '2'; // false
  {valueOf: function() {return 1}} > 1; // false
  true > 0; // true
  ```

  #### 相等操作符：`==` `===` `!=` `!==`

  - 等于和不等于

    - 任一操作符是布尔值，则转换为数值后再比较。
    - 如一操作数是字符串，另一操作数是数值，则尝试将字符串转换为数值后再比较。
    - 如果一操作数是对象，另一个操作数不是，则调用`valueOf()`取得原始值，再根据前面的规则比较。
    - null 和 undefined 相等，null 和 undefined 不能转换为其他类型再进行比较
    - NaN 不等于任何值，包括 NaN
    - 如果两操作数都是对象，则比较他们是不是同一个对象（相同的引用）。

    ```javascript 等于和不等于
    true == 1; //  true
    '1' == 1; // true
    const a = {valueOf: function() {return 1}}
    a == 1; // true
    null == undefined; // true
    NaN == NaN; // false
    const b = {a: 1};
    const c = b;
    b == c; // true
    ```

  - 全等和不全等：严格匹配，不进行类型转换

  #### 条件操作符：`?:`

  #### 赋值操作符：`=`

  #### 逗号操作符：`,`

  ### 语句

  - `if`

  - `do-while`

  - `while`

  - `for`

  - `for-in`

    枚举对象中的**非符号**键属性，`for(property in expression) statement`

    ECMAScript 中的对象是无序的，`for-in`循环不能保证顺序；`for-in`对象中所有可枚举属性都会被枚举一遍，并不一定是对象本身的属性

    ```javascript for-in
    function Obj() {
      this.a = 1;
      this.b = 2;
      this.c = 3;
    }
    Obj.prototype.c = 4;
    Obj.prototype.e = 5;
    
    const obj = new Obj(); // {a: 1, b: 2, c: 3}
    for(const key in obj) {
      console.log(key, obj[key]);
    }
    // a 1
    // b 2
    // c 3
    // d 4
    // e 5
    
    ```

    

  - `for-of`：遍历可迭代对象，若对象有`Symbol.iterator`迭代器，即为可迭代对象

  - 标签语句：`label:statement`

  - `break`和`continue`语句

  - `with`语句

  - `switch`语句

  

  ## 变量、作用域于内存

  

  ### 原始值与引用值

  - 原始值是简单的数据，引用值则由多个值构成对象。保存原始值的变量是**按值**访问，而引用值保存在内存中，变量保存的是对这个内存中对象的引用（指针），是**按引用**访问。

    - 动态属性：引用值可随时添加、修改、删除属性；原始值不能添加、修改、删除属性。

      ```javascript
      const person = new Object();
      person.name = 'jim';
      console.log(person.name); // jim
      
      const name = 'jim'
      name.age = 27; // 虽然不报错，但不会添加属性
      console.log(name.age); // undefined
      ```

      

    - 复制值：原始值复制时，会被复制到新变量的位置，相互独立。引用值复制会复制指针，两个值相同。

    - 传递参数

      ECMAScript 中所有函数的参数都是按照值转递，即函数外部的值会被复制到函数内部的参数重，其规则与复制值一至。

      ```javascript 参数传递
      function add(num) {
      	num += 10;
        return num;
      }
      const count = 20;
      const result = add(count);
      console.log(count); // 10
      console.log(result); // 20
      
      function setName(obj) {
        obj.name = 'jim'
        obj = new Object();
        obj.name = 'tim'
      }
      const person = {}
      setName(person);
      console.log(person.name); // jim
      
      ```

      

  ### 执行上下文与作用域

  - 执行上下文：变量或函数的上下文决定了他们可以发访问哪些数据，及他们的行为。每个上下文都有一个关联的变量对象，在这个上下文中定义的所有变量和函数都存在这个对象上面。无法通过代码访问。

  - 执行上下文栈：每个函数都有自己的上下文。当代码执行流进入函数时，函数的上下文被推到一个**上下文栈**上，在函数执行完毕后，上下文栈会弹出该函数的上下文，将控制权还给之前的执行上下文。

  - 作用域链：上下文中的代码在执行的时候，会创建**变量对象**的一个**作用域链**。作用域链决定了各级上下文中的代码在访问变量和函数的顺序。代码正在执行的上下文的变量对象是中位于作用域链的最前端，作用域链中的下一个变量对象来自包含当前执行代码的上下文，以此类推，最后一个变量对象是全局上下文的变量对象。

    > 代码执行时的标识符解析通过沿作用域链逐级搜索完成。搜索过程始终从作用域链的最前端开始，逐级往后。

    ```javascript 执行上下文与作用域链
    var color = 'blue';
    function changeColor() {
      let anotherColor = 'red';
      function swapColors() {
        let tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
      }
      
      swapColors();
    }
    changeColor();
    ```

    <img src="https://tva1.sinaimg.cn/large/008eGmZEgy1gmohpdg9tnj309o0aiwef.jpg" alt="作用域链" style="zoom:50%;" />

  - 作用域增强：使用有增强作用域作用的语句时，会在作用域链前端添加一个变量对象。

    - `try/catch`语句的`catch`块

    - `with`语句

      ```javascript
      const obj = {
      	a: 1
      }
      function test() {
        with(obj) {
             console.log(a)
             }
      }
      
      test(); // 1
      ```

  - 变量声明

    - var：声明的变量会自动添加到最近的上下文。如果变量为经声明就被初始化会添加到全局上下文。
    - let：块级（`{}`界定内部）作用域；不能重复声明；存在“暂时性死区”，不能在声明前使用变量。
    - Const：除了和`let`一致外，还有声明必需初始化；声明周期内不能再次被赋值；

  ### 垃圾回收

  - 标记清理（常用）
  - 引用计数

## 基本引用类型

引用值（或者对象）是某个特定**引用类型**的实例。新对象通过 new 操作符后跟一个**构造函数**来创建。

### Date

Date 类型早期参考了 java.utils.Date。表示UTC时间的1970年1月1日零时至今所经过的**毫秒数**。Date类型可以表示1970年至285616年的日期。

- Date.parse

  接收一个表示日期的字符串参数，尝试将这个字符串表示为改日期的毫秒数。当表示日期的字符串参数直接传给 `Date` 构造函数时，内部处理会调用`Date.parse`函数。

  ```javascript Date.parse
  const someDate = Date.parse('5/23/2019');
  const someDate2 = new Date('5/23/2019'); // 等价
  const someDate3 = Date.parse('2019-5-23');// NaN
  /*
  Date.parse接受的字符串格式
  1.月/日/年：5/23/2019
  2.月名 日，年：may 23，2019
  3.周几 月名 日 年 时：分：秒 时区：Tue May 23 2019 00:00:00 GMT-0700;
  4.ISO 8601扩展格式：YYYY-MM-DDTHH:mm:ss:sssZ;2019-5-23T00:00:00
  */
  ```

  > Date 的实现依赖宿主环境。例如Date.parse的处理，chrome中传入'2019-5-23'能够返回毫秒数，在Safari中返回NaN。因此处理日期通常使用日期处理库。

- Date.UTC

  返回日期的毫秒数。参数是年，零起点月（1月为0），日，时，分，秒，毫秒。年和月为必需。

  和 `Date.parse`类似，当传入`new Date`的参数第一个为数字时，会内部调用`Date.UTC`处理
  
  ```javascript Date.UTC
  const someTime = Date.UTC(2019, 5); // 2019年6月1日零点
  const someTime2 = new Date(2019, 5); // 2019年6月零点
  ```
  
- 继承方法

  - `toLocalString`：根据浏览器的不同返回本地时间（不带时区）
  - `toString`：返回带时区的本地时间

- 日期格式方法：

  - `toDateString`：本地年月日，带时区
  - `toTimeString`：本地时分秒，带时区
  - `toLocaleDateString`：本地年月日，不带时区
  - `toLocaleTimeString`：本地时分秒，不带时区
  - `toUTCString`：完整的UTC时间

- 日期/时间获取和设置

### RegExp

正则表达式通过类似 Perl 的简洁语法来创建。

```
let expression = /pattern/flags;
```

pattern表示简单或复杂的正则表达式。

flages包括：

- `g`：全局匹配，查找字符串的全部内容

- `i`：忽略大小写

- `m`：多行模式

- `y`：粘附模式，表示只查找从 `lastIndex`开始及之后的字符串

- `u`：Unicode模式，启用Unicode 匹配

- `s`：dotAll 模式，元字符`.`匹配任何字符（包括\n 或 \r）。

  ```javascript 正则表达式
  const str = 'foo bar'
  
	const globalFlag = /o/g; // 匹配所有o
  ```

### 原始包装类型

为了方便操作原始类型，ECMA创建了三种原始包装类型。`Boolean`、`Number`和`String`

```javascript
let s1 = 'test';
s1.substring(2); // st
```

按照一般来说，s1 为基本类型，并没有属性。但是上面在执行`s1.substring(2)`的时候，后台创建了String的基本包装类型，并在执行完毕后销毁了这个实例。执行`s1.substring(2)`	这个语句时后台的操作是

```javascript
let s1 = new String('test');
s1.substring(2);
s1 = null; // 赋值null让垃圾回收机制回收
```

但是不能访问这个创建的基本包装类型，因为已经及时销毁了

```javascript
let s1 = 'test';
s1.color = 'blue';
console.log(s1.color); // undefined
```

除了可以用各自的构造函数来创造基本包装类型之外，也可以用`new Object`来创建这三个基本包装类型。

```javascript
let booleanObj = new Object(true);
let stringObj = new Object('test');
let numberObj = new Object(0);
// 其他类型也是如此
let arr = new Object([1,2,3,4]);
let obj = new Object({a: 1});
let sy = new Object(Symbol('foo'))
```

`new Object`可以根据传入的数据类型自动创建相对应的引用类型

各个原始类型重写了继承的`valueOf` `toString` `toLocalString`方法，除此之外还有一些自己的实例方法。

- Boolean

  `new Boolean()`传入true/false。Boolean实例回重写`valueOf`、 `toString`方法，返回一个原始值。

- Number

  `new Number()`传入一个数值。Number实例重写`valueOf`、`toString`和`toLocalString`方法，`valueOf`返回数值，`toString`、`toLocalString`返回字符串的数值

  - `toFixed`四舍五入保留多少位小数

    ```javascript
    let num = 1.234;
    num.toFixed(1); // 1.2
    ```
  - `toExponential`以多少为小数的科学计数法表示

  - `toPrecision`

  - `isInteger`

  - `isSafeInteger`
- String

  `new String()`传入字符串。重写了`valueOf``toString`和`toLocalString`，返回字符串原始值
  
  - `length`
  
  - `charAt`
  
  - `charCodeAt`：索引上的字符转为编码
  
  - `fromCharCode`：将编码转为字符
  
  - `codePointAt`：可以将用两个16位码元表示的字符正确转换为编码（charCodeAt的增强版）
  
  - `fromCodePoint`：
  
    ```javascript
    let str = 'ab😂cd';
    
    str.charCodeAt(2); // 55357，这个表示并不正确
    String.fromCharCode(55357); // <?>
    
    str.codePointAt(2); // 128514
    String.fromCodePoint(128514); // 😂
    ```
  
  - `normalize`
  
  - `concat`
  
  - `slice`
  
  - `substr`
  
  - `substring`
  
  - `indexOf`
  
  - `lastIndexOf`
  
  - `startsWith`
  
  - `endsWith`
  
  - `includes`
  
  - `trim`
  
  - `repeat`
  
  - `padStart`
  
  - `padEnd`
  
  - `toLowerCase`
  
  - `toLocalLowerCase`:根据当地语言转换小写
  
  - `toUpperCase`
  
  - `toLocalUpperCase`：根据当地语言转换大写
  
  - `match`
  
  - `exec`
  
  - `search`
  
  - `replace`
  
  - `localeCompare`：两字符串比较，根据顺序返回负值、0、正值

### 单例内置对象

由ECMAScript提供，不与宿主环境有关，ECMAScript开始执行时就存在，不需要显示实例化掉内置对象。

- Global

  - URL编码方法

    - `encodeURI`
    - `encodeURIComponent`
    - `decodeURI`
    - `decodeURIComponent`

  - eval：ECMAScript解析器

  - Global对象属性

    - `undefined`
    - `NaN`
    - `Infinity`
    - `Object`
    - `Array`
    - `Function`
    - `Boolean`
    - `String`
    - `Number`
    - `Date`
    - `RegExp`
    - `Symbol`
    - `Error`
    - `EvalError`
    - `RangeError`
    - `ReferenceError`
    - `SyntaxError`
    - `TypeError`
    - `URIError`

  - window对象

    浏览器将`window`对象实现为Global对象的代理，但是，window远不止Global对象那么简单。

- Math

  Math对象上提供的计算要比直接在javascript上实现快得多。

  - `min`

  - `max`

    ```javascript
    let max = Math.max(3, 54, 32, 16); // 54
    let min = Math.min(3, 54, 32, 16); // 3
    let arr = [3, 54, 32, 16];
    let arrMax = Math.max(...arr); // 54
    ```

  - `ceil`

  - `floor`

  - `round`

  - `found`：返回数值最接近的单精度浮点表示

  - `random`：返回0～1，包含0不包含1的随机数。

## 集合引用类型

### Object

### Array

- 创建数组

  ```javascript
  let colors = new Array();
  let colors2 = new Array(3);
  let colors3 = Array(3);
  let colors4 = ['red', 'blue', 'yellow'];
  ```

- 数组方法

  - `from`

    把类数组转换为数组

    ```javascript
    Array.from('Matt'); // ['M', 'a', 't', 't'];
    let m = new Map().set(1, 2).set(3,4);
    let s = new Set().add(1).add(2).add(3).add(4);
    Array.from(m);// [[1, 2], [3, 4]]
    Array.from(s);// [1,2,3,4]
    
    // arguments 转换为数组
    function getArgsArray() {
      return Array.from(arguments);
    }
    getArgsArray(1,2,3,4); // [1,2,3,4]
    
    // 转换带有特定属性的自定义对象
    let obj = {
      0: 1,
      1: 2,
      3: 3,
      length: 3
    }
    Array.from(obj); // [1, 2, 3]
    
    
    ```

    第二个参数为处理函数

    ```javascript
    let arr = [1,2,3,4];
    let arr2 = Array.from(arr, x => x**2); // [1, 4, 9, 16]
    let arr3 = Array.from(arr, function(x){return x**this.exponent}, {exponent: 2}); // [1, 4, 9, 16]
    ```

    

  - `of`

    将一组参数转换为数组

    ```javascript
    Array.of(1,2,3,4); // [1,2,3,4]
    ```

- 数组索引

- 检测数组

  - `instanceof`
  - `Array.isArray`

- 迭代器方法

  - `keys()`
  - `values()`
  - `entries()`

- 复制和填充方法

  - `fill()`
  - `copyWithin()`

- 转换方法

  - `valueOf`
  - `toString`
  - `toLocalString`
  - `join`

- 栈方法

  - `push`
  - `pop`

- 队列方法

  - `shift`
  - `unshift`

- 排序方法

  - `sort`
  - `reverse`

- 操作方法

  - `concat`
  - `slice`
  - `splice`

- 索引和位置方法

  - `indexOf`
  - `lastIndexOf`
  - `includes`

- 断言函数

  - `find`
  - `findIndex`

- 迭代方法

  - `forEach`
  - `map`
  - `every`
  - `some`
  - `filter`

- 归并方法

  - `reduce`：从开头开始遍历
  - `reduceRight`：从最后开始遍历

### 定型数组

- `ArrayBuffer`





## 事件

- 事件流：早期的事件流分为了 IE 的事件冒泡，网景的事件捕获

  - 事件冒泡：从最具体的元素（文档中最深的节点）开始触发，然后向上传播至没有那么具体的元素（文档）。

  - 事件捕获：从最不具体的节点最先收到事件，而最具体的节点最后收到事件。

  - DOM事件流：

    DOM2 Events 规范规定事件流分为3个阶段：**事件捕获、到达目标和事件冒泡**

- 事件处理程序

  相应事件而调用的函数被称为**事件处理程序**

  - HTML 事件处理程序

    ```html
    <button onclick="console.log('click')"></button>
    
    <script>
    	function clickHandler() {}
    </script>
    <button onclick={clickHandle()}></button>
    ```

  - DOM0 事件处理程序

    ```javascript
    let btn = document.getElementById('myBtn')
    btn.onclick = function() {} // 绑定
    btn.onclick = null // 解绑
    
    ```

  - DOM2 事件处理程序

    DOM2 Events 为事件处理程序的赋值和移除定义了两种方法：`addEventListener`和`removeEventListener`。这两个方法暴露在所有的 DOM 节点上，它们接收3个参数，事件名，事件处理函数和一个布尔值，true 表示在捕获阶段调用事件处理程序，false（默认值）表示在冒泡阶段调用事件处理程序。

    ```javascript
    let btn = document.getElementById('myBtn')
    function handler() {}
    btn.addEventListener('click', handler, false) // 绑定
    btn.removeEventListener('click', handler) //解绑
    ```

  - 事件对象

    - DOM 事件对象
    - IE 事件对象
    - 跨浏览器事件对象

  - 事件类型

    - 