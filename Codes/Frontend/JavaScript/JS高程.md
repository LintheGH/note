---
title: JavaScript高级程序设计（第3版）
categories: 
- Code
- JavaScript
tags: 
- JavaScript
notebook: JavaScript
---
- script 元素标签
  - 通过 `script`标签嵌入页面的代码中不能含有`</script>`类似的字符串，会产生意外，需要用转译字符串`<\/script>`
  - `async`
  - `defer`
- `noscript`标签：浏览器不支持（禁用）JavaScript脚本时现实的内容，在`body`中
- 数据类型
  - `isNaN()`：接受任何参数，会先把参数转换为数值类型再进行判断，因此`isNaN('NaN')`为true
  - `parseInt`：第接收的第二个参数用于指定进制，`parseInt('070', 8)`，输出56
- 操作符
  - 一元操作符 
  - 位操作符
  - 布尔操作符
  - 乘性操作符
  - 加性操作符
  - 关系操作符：`>` `<` `>=` `=<`
    - 如果两个操作数都是数字，直接比较
    - 如果两个操作数都是字符串：则对比相应字符编码值
    - 如果一个操作数是数值：将另一个数转换为数值比较
    - 如果一个操作数是对象，则调用这个对象的`valueOf`方法，若没有则调用`toString`方法，再使用前面的方法比较
    - 如果操作数是布尔值，先转换为数值
  - 相等操作符
  - 条件操作符
  - 赋值操作符
  - 逗号操作符
- 语句
  - `if`语句
  - `do-while`语句
  - `while`语句
  - `for`语句
  - `for-in`语句
  - `label`语句: 
   
    语法：`label: statement`。可以在代码中添加标签，以便将来使用
    ```javascript
    start: for(var i=0; i < 10; i++){
      alert(i)
      continue start
    }
    ```
  - `continue``break`语句
  - `with`语句

    语法：`with (expression) statement`：width语句的作用是将代码作用域
    ```javascript
    var qs = location.search.substring(1)
    var hostName = location.hostName
    var url = location.href

    // 用with改写

    with(location) {
      var qs = search.substring(1)
      var hostName = hostname
      var url = href
    }
    ```
    > 严格模式下不能使用`with`语句；大量with语句会导致性能下降
  - `switch`语句

- 函数
  -

- 变量、作用域和内存问题
  - 基本类型和引用类型
    - 动态的属性
    - 复制变量值
      - 基本类型：把值复制为新变量的位置上
      - 引用类型：把指针复制为新变量的位置上，这个指针指向相同的对象
    - 传递参数：与变量的复制一致
      - 传递基本类型：相当于基本类型的复制变量
      - 传递引用类型：直接改变这个参数的属性会影响外面的对象
    - 检测类型
      - `typeof`关键字: 检测基本类型时可行，检测引用类型是不准确
        ```javascript
        var s = 'asd'
        var b = true
        var i = 123
        var u
        var n = null
        var o = new Object()

        typeof s // string
        typeof b // boolean
        typeof i // number
        typeof u // undefined
        typeof n // object
        typeof o // object
        ```
      - `instanceof`关键字：根据原型链来识别
        ```javascript
        let person = {}
        let arr = []
        let rex = new RegExp()

        person instanceof Object
        arr instanceof Array
        rex instanceof RegExp

        arr instanceof Object // true
        ```
        > 所有引用类型的值都是`Object`的实例，检测一个引用类型的原型是否是`Object`时，都会返回true
  - 执行环境和作用域

    - **执行环境**(execution context)：

      执行环境定义了变量或函数有权访问的其他数据，决定了它们各自的行为

      每个执行环境都有一个**变量对象(variable object)**，环境中定义的变量和函数都保存在这个对象之中。

      每个函数有自己的执行环境，当执行流进入函数时，函数环境就会被推入一个环境栈中。函数执行完之后，栈将其环境弹出。

    - **作用域链(scope chain)**

      当代码在一个环境中执行是，会创建的一个**作用域链(scope chain)**。
      
      作用域链的最前端，是当前执行代码所在环境的变量对象。
      如果这个环境是函数，则将其**活动对象(activation object)**作为变量对象。活动对象在最开始只包含一个变量，即`arguments`对象。

      作用域链的下一个变量对象来自包含环境（父环境），下下一个变量对象来自父父对象。。。一致延伸到全局环境变量对象。

      标识符解析即沿着作用域链从开始到结尾查找标识符的过程。

    ```javascript
    var color = 'red'

    function change() {
      color = 'blue'
      name = 'dddd'
    }
    var name = '123'

    change()

    console.log(color, name) // blue dddd
    ```
  - 延长作用域链
    在当前环境的作用域链前端添加一个变量对象，达到延长作用域链的作用，有两个语句可以延长作用域链，但是该变量对象会在语句执行完毕后销毁
    - `with`语句
      ```javascript
      function buildUrl() {
        var qs = '?debug=true'
        with(location) { // with 语句在函数的作用域链前端添加了包含location对象的变量对象，可以直接访问 href
          var url = href + qs 
        }

        // port -> with 语句创建的变量对象已经销毁，直接访问location下 port 会报错

        return url // with 语句内部的url变量在函数的执行环境中，可以直接访问
      }
      ```
    - `try-catch`语句的`catch`

  - 没有块级作用域（ES6之前）
    ```javascript
    if(true) {
      var color = 'blue'
    }

    console.log(color)
    ```
    上面的代码中if语句内的定义了变量，可以在外部访问，相同的还有for等的类似的结果，不会想java等的语言有块级作用域，在if执行完毕即销毁（ES6已经有）
    
  - 垃圾回收

    - 标记清楚

    - 引用计数

    - 性能问题
  
- 引用类型

  引用类型的值是引用类型的一个实例

  > 所有引用类型都有`toLocaleString``toString``valueOf`方法

  - `Object`
    - 创建方法
      - 构造函数
        ```javascript
        let obj = new Object()
        obj.name = 'name'
        obj.age = 24
        ```
      - 字面量
        ```javascript
        let obj = {
          name: 'name',
          age: 24
        }
        ```
  - `Array`
    - 创建
      - 构造函数
        ```javascript
        var colors = new Array()
        var colors1 = Arrya() // 省略new
        var colors2 = new Array(6) // length 为 6
        var colors3 = new Array('red', 'blue', 'green') // 元素为 red blue green的数组
        ```
      - 字面量
        ```javascript
        var colors = ['red', 'green', 'blue']
        ```

    - 检测数组
      - `typeof`: 不准确
      - `instanceof`：准确
      - `Array.isArray()`：准确

   i - 转换方法
      - `toLocaleString`：返回一个由数组元素通过元素本身的`toLocaleString`转换的拼接而成的一个字符串
      - `toString`：返回一个数组元素拼接而成的字符串
      - `valueOf`：返回原数组
    
    - 栈方法：LIFO
      - `push`：推入一个
      - `pop`：删除一个最后的元素
    - 队列方法：FIFO
      - `shif`：开头添加一个
      - `unshif`： 删除开头一个
    - 操作方法
      - `reverse`
      - `sort`
      - `concat`
      - `splice`
      - `slice`
    - 位置方法
      - `indexOf`
    - 遍历/迭代方法
      - `every`
      - `some`
      - `forEach`
      - `map`
      - `filter`
      - `reduce`：从前向后遍历
      - `reduceRight`: 从后向前遍历

  - Date
    - `Date.parse`
    ```javascript
    Date.parse('2020/1/31') // 2020.1.31的毫秒数
    ```
    - `Date.UTC`
    ```javascript
    Date.UTC(2020, 0, 31) // 2020.1.31的毫秒数
    ```
    - `Date.now`：返回当前时间的毫秒数  

    - 继承/转换方法
      - `toLocaleString`：根据浏览器返回日期时间
      - `toString`：返回带有时区信息的日期时间
      - `valueOf`： 返回毫秒数

    - 日期格式化方法

      - `toDateString`
      - `toTimeString`
      - `toLocaleDateString`
      - `toLocaleDateString`
      - `toUTCString`

  - RegExp

    创建正则表达式形如：var expression = /pattern/ flags
    
    pattern：正则表达式

    flags：匹配模式：
      - `g`：全局（global），
      - `i`：不区分大小写
      - `m`：多行; 将开始和结束字符（^和$）视为在多行上工作（也就是，分别匹配每一行的开始和结束（由 \n 或 \r 分割），而不只是只匹配整个输入字符串的最开始和最末尾处。

    - 通过 `new RegExp`创建正则
    ```javascript
    var pattern = new RegExp('a+b', 'i')
    // /a+b/i
    var pattern1 = new RegExp('\\d', 'gi') // 如果有\， 需要用\转译
    // /\d/gi
    var pattern2 = new RegExp(/\d/, 'gi') // 在es6中，第一个参数可以是正则表达式，不再局限于字符串
    ```

    - `RegExp` 实例属性
      - `global`：是否设置了`g`标志，
      - `ignoreCase`：是否设置了`i`标志
      - `lastIndex`：整数。只有设置了`g`标志的正则才起作用，表示下一次匹配的起始索引
        > 这里需要注意的是，设置了`g`标志之后，`RegExp`对象每次匹配之后`lastIndex`都会相应改变，下一次使用`RegExp`对象匹配时，从`lastIndex`的位置开始匹配，故有时会匹配不上的情况
      - `multiline`：是否设置了`m`标志
      - `source`:当前正则表达式对象模版文本
    - `RegExp`的实例方法
      - `exec`：返回第一个匹配项信息数组或者null，数组包括index和input
      - `test`：返回boolean
    - 继承方法
      - `toLocaleString`：返回正则表达式字面量
      - `valueOf`：返回正则表达式本身
      - `toLocaleString`：返回正则表达式字面量

    - `RegExp`构造函数的静态属性

      构造函数的静态属性用于作用域中的所有正则表达式，并且基于所执行的最近的一次正则表达式操作而变化。而且可以通过短属性名访问
      长属性名 | 短属性名 | 说明
      :-: | :-: | :-:
      input | $_ | 最近一次匹配的字符串
      lastMatch | $& | 最近一次匹配项
      lastParen | $+ | 最近一次的捕获组
      leftContext | $` | 
      multiline | $*
      rightContext | $'

  - Function 类型

    函数是对象，每个函数都是`Function`的实例。因此，函数名实际上是保存函数对象指针的容器，不会与某个函数绑定

    - 函数没有重载
    ```javascript
    function addSomeNumber(num) {
      return num + 100
    }
    function addSomeNumber(num) {
      return num + 200
    }
    ```
    第二次创建时，实际上是覆盖了变量addSomeNumber的内容

    - 函数声明和函数表达式

      - 函数声明：js解析器会率先读取函数声明，确保在执行环境中任何代码之前可用。
      ```javascript
      alert(sum(10, 20))
      function sum(firstNum, secondNum) {
        return firstNum + secondNum
      }
      ```
      代码执行前，解析器通过函数提升的过程，读取并将函数声明添加到执行环境中

      - 函数表达式: js解析器不会率先读取函数声明，必须等到解析器执行到它所在的代码行，才会被解释执行
      ```javascript
      alert(sum(10, 20))
      var sum = function(firstNum, secondNum) {
        return firstNum + secondNum
      } // error: sum is not a function
      ```
      函数位于一个初始化语句中，在执行到函数所在语句前，变量sum不会保存对函数的引用

    - 函数的内部属性
      - `arguments`
        类数组，包含传入函数的所有参数
        - `callee`: 指针，只想拥有这个arguments对象的函数
        ```javascript
        function factorial(num) {
          if(num <= 1) {
            return 1
          } else {
            // return num * factorial(num - 1) 
            // 改为
            return num * arguments.callee(num - 1) // 可惜严格模式中不允许使用callee，还是需要调用具名函数

          }
        }
        ```
      - `this`：指向函数执行的环境对象，根据执行的环境而定

    - 函数的属性和方法
      
      - 属性：

        - `length`：参数个数

        - `prototype`：原型，不可枚举，在对象中定义的所有实例的方法，实际上是保存在原型中
        
          - 非继承而来的`apply``call``bind`：在特定的作用域中调用函数（指定this）
            - `apply`：接收两个参数：作用域、参数数组（可以是类数组和数组）
            ```javascript
            function sum(num1, num2) {
              console.log(this.a)
              return num1 + num2
            }
            function fun2(num1, num2) {
              var test = {
                a: 'test'
              }
              sum.apply(test, [num1, num2]) // 输出test，返回3
            }
            ```

            - `call`：接受this和其他传入参数
            ```javascript
            function sum(num1, num2) {
              console.log(this.a)
              return num1 + num2
            }
            function fun2(num1, num2) {
              var test = {
                a: 'test'
              }
              sum.call(test, num1, num2) // 输出test，返回3
            }
            ```

            - `bind`：创建函数实例，并绑定执行环境
            ```javascript
            var o = {
              color: 'blue'
            }

            function showColor() {
              console.log(this.color)
            }
            var objectShowColor = showColor.bind(o)
            objectShowColor() // blue
            showColor() // undefined
            a === b // false
            a === a.bind(this) // false
            ```

  - 基本包装类型和3中特殊的引用类型

    - 基本类型和基本包装类型
      
      为了方便操作基本类型，ECMA还提供了3中特殊的引用类型： `Boolean` `Number` `String`，在访问基本类型值的时候，会创建相对应的引用类型，并调用相应的方法。
      ```javascript
      var str = 'string'
      var str2 = str.substring(2)
      ```
      在执行第二行代码时访问`str`时，会创建`String`的实例，过程为:
      1. 创建 `String` 类型的一个实例
      2. 在实例上调用指定方法
      3. 销毁这个实例
      相当于：
      ```javascript
      var str = new String('string')
      var str2 = str.substring(2)
      str = null
      ```
      > Boolean 和 Number 亦有相似的操作

      - 引用类型和基本包装类型的区别

        主要区别是对象的生存期。用 new 关键字创建的引用类型，在执行流离开当前作用域前一直保存在内存中，而自动创建的基本包装类型则在执行代码的执行瞬间。

        ```javascript
        var str = 'string'
        str.color = 'blue'
        console.log(str.color) // undefined
        ```

      - 3中特殊引用类型的创建

        使用new关键字加上对应的类型即可创建引用类型
        ```javascript
        var strObject = new String('string')
        var numObject = new Number(111)
        var boolObject = new Boolean(false)
        ```

        > new 调用基本包装类型的构造函数和直接调用转型函数不一样
        ```javascript
        var num = '111'
        var numObject = new Number(111)
        var strToNum = Number(num)

        typeof strToNum // number
        typeof numObject // object
        
        ```

        使用 `Object` 也可以创建相应的引用类型
        ```javascript
        var strObject = new Object('string')
        var numObject = new Object(11)
        var boolObject = new Object(false)

        strObject instanceof String // true
        numObject instanceof Number // true
        boolObject instanceof Boolean // true
        ```

    - Boolean：boolean值对应的引用类型

      - valueOf：返回基本类型 `true` `false`

      - toString：返回基本类型 `'true'` `'false'`

      - toLocaleString： 返回基本类型 `'true'` `'false'`

    - Number：number值对应的引用类型

      - valueOf：返回基本类型数字

      - toString：返回基本类型数字的字符串
      ```javascript
      var num = 111
      num.toString() // 111
      // 可以传入基数参数表示为几进制
      num.toString(8) // 157
      ```

      - toLocaleString： 返回基本类型数字的字符串

    - String：string值对应的引用类型

      - valueOf：返回基本类型字符串

      - toString：返回基本类型字符串

      - toLocaleString：返回基本类型字符串
  
      - 字符方法
        - `charAt`：以单字符字符串的形式返回给定索引位置的那个字符

        - `charCodeAt`：返回给定索引位置字符的编码

      - 字符串操作方法

        - `concat`

        - `slice`

        - `substring`

        - `substr`

        - 区别：
          ```javascript
          var str = 'hello world'

          // 正数
          str.slice(3) // lo world
          str.substring(3) // lo world
          str.substr(3) // lo world

          str.slice(3, 7) // lo w
          str.substring(3, 7) // lo w
          str.substr(3, 7) // lo worl

          // 对于负数参数的处理的区别
          str.slice(-3) // rld
          str.substring(-3) // hello world
          str.substr(-3) //  rld

          str.slice(3, -4) // lo w
          str.substring(3, -4) // hel
          str.substr(3, -4) // ''
          ``
          - 整数参数的处理
            `slice` `substring`的处理相同，`substr`的第二参数标识需要返回的字符串长度
          - 负数的处理
            `slice`将负数加上字符串长度，即从倒数第几位开始
            `substring`会把负数参数转换为0
            `substr`将第一个负数参数加上字符串长度，第二个负数参数转换为0

      - 位置方法

        - indexOf

        - lastIndexOf

        > 这两个方法接收第二参数表示从制定的索引开始匹配

      - trim

      - 字符串大小转换

        - toLowerCase

        - toUpperCase

      - 字符串匹配方法

        - exec：与 RegExp 的 exec 方法相同

        - match：接收正则表达式或者正则对象（除此之外的参数会隐式调用new RegExp），返回一个数组，与exec返回值相同

        - search: 接收字符串或者正则，返回值和 indexOf 相同，如果启用看g标志，返回所有匹配结果的数组或null

        - replace：接收2个参数，返回一个新的字符串

          - 第一个参数：

            匹配项：字符串或正则对象，需要替换全部匹配项则需要使用正则并添加g标志

          - 第二个参数：替换项或者函数
            
            - 为字符串：直接替换为指定的字符串，此外如果第一个参数使用RegExp对象时还可以使用特殊字符串

              字符序列 | 替换文本
              :-: | :-:
              $$ | $
              $& | 匹配整个模式的子字符串，与 RegExp.lastMatch 的值相同
              $` | 匹配的子字符串之前的子字符串。与 RegExp.leftContext 的值相同
              $n | 匹配第 n 个捕获组的字符串，n = 0～9。没有捕获组，则使用空字符串
              $nn | 匹配第nn个捕获组的字符串，nn = 01 ～ 99。没有捕获组，则使用空字符串

            ```javascript
            var text = 'cat, bat, sat, fat'
            text.replace(/(.at)/g, 'word ($1)') // word (cat), word (bat), word (sat), word (fat)
            ```


            - 函数：返回值为替换项
              
              只有一个匹配项的时候，函数接收3个参数：匹配项，所在索引，原始字符串
              ```javascript
              var str = 'hello world'
              str.replace('lo',function(matchContent, index, str) {
                console.log(matchContent, index, str) // lo, 3, hello world

                return ''
              })
              ```

              有多个匹配项：接收参数为每一个匹配组的匹配项、所在索引、原始字符串
              ```javascript
              var str = 'hello world'
              str.replace(/l/g, function(a,b,c) {
                console.log(a,b,c)

                /*
                  分别输出：
                  l 3 hello world
                  l 4 hello world
                  l 9 hello world
                */
              })
              ```

        - split：接收2个参数，第一个为字符串或者 RegExp 对象，第二个可选参数为数组的大小，返回值为字符串数组

          ```javascript
          var str = "Harry Trump; Fred Barney; Helen Rigby; Bill Abel; Chris Hand"

          var strArr = str.split() // ["Harry Trump; Fred Barney; Helen Rigby; Bill Abel; Chris Hand"]
          var strArr = str.split('') // 每个字符和空格为一个元素的数组
          var strArr = str.split(';') // ['Harry Trump', ' Fred Barney', ' Helen Rigby', ' Bill Abel', ' Chris Hand']
          var strArr = str.split(';') // ['Harry Trump', 'Fred Barney', 'Helen Rigby', 'Bill Abel', 'Chris Hand']
          var strArr = str.split(', ', 2) // ['Harry Trump', 'Fred Barney']
          var strArr = str.split(/\s*(?:;|$)\s*/) // ["Harry Trump", "Fred Barney", "Helen Rigby", "Bill Abel", "Chris Hand", "" ] 为去除空格和；的名字集合
          ```
      
      - localeCompare：比较两个字符串
        - 传入字符串在比较字符串之前，返回1
        - 传入字符串与比较字符串相等，返回0
        - 传入字符串在比较字符串之后，返回-1
        ```javascript
        var str = 'yellow'
        str.localeCompare('brick') // 1
        str.localeCompare('yellow') // 0
        str.localeCompare('zoo') // -1
        ```
      
      - fromCharCode()：将编码转换为字符串，与 chartCodeAt 相反
    
  - 单体内置对象/标准内置对象

    由 ECMA 提供，不依赖于宿主环境。不必实例化。

    除了上面介绍的如 `Object` `Array` `String` `Number` `Boolean`等，还有 `Global` 和 `Math`

    - Global

      “兜底对象”，不属于任何其他对象的属性和方法，都是 Global 对象的属性和方法。如 `isNaN` `isInfinite` `parseInt`等

      - URI编码方法：对 URI(Uniform Resource Identifiers 通用资源标识符)进行编码，以便可以发送给浏览器。

        - encodeURI：

          对整个 URI 进行编码。相对与 encodeURIComponent，encodeURI 不会对冒号、正斜杠、问好和井字进行编码。

        - encodeURIComponent

          对 URI 中某段进行编码，替换所有非字母字符

      - 与编码相对应的是相应的解码

        - decodeURI

        - decodeURIComponent
      
      - escape 和 unescape

        ECMA 第3版的编解码方法。只能正确的编解码 ASCII 字符。因此，这两种方法已经放弃使用。
      
      - eval

        “ECMA解析器”

        ```javascript
        eval("function sayHi(){alert('Hi')}; sayHi()")
        ```

        在 `eval()` 中创建的任何变量或函数都不会被提升，只包含在一个字符串中。

        谨慎使用，可能会被输入影响安全的代码，即所谓代码注入

      - window 对象

        ECMA 没有明确 Global 对象的访问， web浏览器都将这个全局对象作为 window 对象的一部分实现。所有在 Global 中的变量和函数，都在 window 对象中。

      - Math

        - 大小比较

          - min

          - max

          ```javascript
          var min = Math.min(1,4,6,2,8) // 1
          var max = Math.max(1,4,6,2,8) // 8

          // 取数组中最大值、最小值
          var arr = [1,45,2,631,73]
          var arrMax = Math.max.apply(Math, arr) //631
          var arrMin = Math.min.apply(Math, arr) // 1
          ```
        
        - 舍入方法
          
          - ceil

          - floor

          - round

        - random：介于 0 到 1 的随机数

          ```javascript
          // m-n 之间的随机数
          var randomNum = Math.random() * (n + 1 - m) + m
          ```

        - 其他

          方法 | 说明
          :-: | :-:
          Math.abs(num) | 返回num绝对值
          Math.exp(num) | 返回Math.E的num次幂
          Math.log(num) | 返回num的自然对数
          Math.pow(num, power) | 返回num的power次幂
          Math.sqrt(num) | 返回num的平方根
          Math.acos(x) | 返回x的反余弦值
          Math.asin(x) | 返回x的反正弦值
          Math.atan(num) | 返回num的正切值
          Math.cos(num) | 返回num的余弦值
          Math.sin(num) | 返回num的正弦值
          Math.tan(num) | 返回num的正切值
          
- 面向对象程序设计

  - 对象：无序属性的集合

    - 属性：数据属性和访问器属性

      > 这里的属性指的是，JavaScript引擎使用，只有内部才用的特性（attribute），描述了属性（property）的各种特征，规范为使用两对儿方括号括起来，如`[[Enumerable]]`
      
      - 数据属性：数据属性包含一个数据值的位置。在这个位置可以读取和写入值。数据属性有4个描述其行为的特性。

        - `[[Configurable]]`：是否可通过`delete`删除、能否修改属性的特性。默认为`true`

        - `[[Enumerable]]`：能否通过 `for-in`循环返回属性。默认为`true`

        - `[[Writable]]`：能否修改属性的值。默认为`true`

        - `[[Value]]`：包含这个属性的数据值。读取属性值的时候，从这个位置读；写入值的时候把新值保存到这个位置。默认为`undefined`

        - 改变数据属性的默认特征，使用`Object.defineProperty(object, prop, descriptor)`方法：

          `object`： 需要修改的对象

          `prop`：需要修改的属性

          `descriptor`：数据属性

          ```javascript
          var person = {}

          Object.defineProperty(person, 'name', {
            value: 'Nicolas',
            writable: false
          })

          person.name // Nicolas
          person.name = 'Tom' //Nicolas

          Object.defineProperty(obj, 'name',{
            writable: true,
            value: '12345'
          }) // error
          ```

          > 在定义数据属性时，如果`configurable`设置了 false，或者缺省，就不可再对同一个对象调用`Object.defineProperty`。configurable`和`writable`在缺省的情况下会被赋值为false

          > `Object.defineProperty`第一次在 IE8 中实现，但是并不成熟，所以 Vue.js 使用 Object.defineProperty 只支持 IE8以上版本

          ```javascript
          // 一次性定义多个数据属性
          var obj = {}
          Object.defineProperties(obj, {
            'name': {
              valur: 'Tom',
              writable: true
            },
            'age': {
              value: 24,
              writable: false
            }
          })
          ```


      - 访问器属性

        访问器属性不包含数据值，包含一对儿 `getter` 和 `setter`。读取对象的值时，会调用`getter`函数，返回有效的值；在写入属性时，会调用`setter`函数并传入新值。

        访问器属性包含4个特性：
        
        - `[[Configurable]]`：能否配置。

        - `[[Enumerable]]`：能否枚举

        - `[[Get]]`：在读取的时候调用的函数。默认值为 `undefined`

        - `[[Set]]`：在设置值的时候调用的函数。默认值为 `undefined`

        ```javascript
        var book = {
          _year: 2004,
          edition: 1
        }

        Object.defineProperty(book, 'year' {
          get: function() {
            return this._year
          },
          set: function(newValue) {
            if(newValue > 2004) {
              this._year = newValue
              this.edition += newValue - 2004
            }
          }
        })

        book.year = 2005
        book.edition // 2
        ```

        > 只指定 `getter`，默认属性不可写，只指定`setter`，默认读取属性会返回`undefined`

    - 定义多个属性

      `Object.defineProperties`: Object.defineProperties(obj, props)

      ```javascript
      var book = {}

      Object.defineProperties(book, {
        _year: {
          value: 2004，
          writable: true
        },
        edition: {
          value: 1,
          writable: true
        },
        year: {
          get: function() {
            return this._year
          },
          set: function(newValue) {
            if(newValue > 2004) {
              this._year = newValue
              this.edition += newValue - 2004
            }
          }
        }
      })
      ```

    - 读取属性特性： `Object.getOwnPropertyDescriptor`

      ```javascript
      var book = {}

      Object.defineProperties(book, {
        _year: {
          value: 2004，
          writable: true
        },
        edition: {
          value: 1,
          writable: true
        },
        year: {
          get: function() {
            return this._year
          },
          set: function(newValue) {
            if(newValue > 2004) {
              this._year = newValue
              this.edition += newValue - 2004
            }
          }
        }
      })

      var descriptor = Object.getOwnPropertyDescriptor(book, '_year')
      var descriptor2 = Object.getOwnPropertyDescriptor(book, 'year')
      // descriptor 为一个对象
      {
        value: 2004,
        writable: true,
        enumerable: false,
        configurable: false
      }
      
      // descriptor2

      {
        get: [Function: get],
        set: [Function: set],
        enumerable: false,
        configurable: false
      }
      ```

  - 创建对象

    - 工厂模式：

      抽象创建具体对象的过程，根据接受的参数构建一个包含必要信息的对象。

      ```javascript
      function createPerson(name, age, job) {
        var o = new Object()
        o.name = name
        o.age = age
        o.job = job
        o.sayName = function() {
          return this.name
        }
        return o
      }

      var Tom = createPerson('Tom', 24, 'engineer')
      ```

    - 构造函数模式

      类似原生的 `Object` 和 `Array`的构造函数，可以自定义构造函数，从而定义对象类型的属性和方法。

      ```javascript
      function Person(name, age, job) {
        this.name = name
        this.age = age
        this.job = job
        this.sayName = function() {
          return this.name
        }
      }
      var Tom = new Person('Tom', 24, 'Engineer')
      var Jim = new Person('Jim', 26, 'UI')
      ```

      - `new`关键字调用构造函数经历

        1. 创建一个新对象
        2. 将构造函数的作用域赋给新的对象（this指向这个对象）
        3. 执行构造函数中的代码（为这个新的对象添加属性）
        4. 返回新的对象

      在这个例子中，Tom和Jim的构造函数都是同一个，即`Person`

      ```javascript
      Tom.constructor == Person // true
      Jim.constructor = Person //  true
      Tom.constructor === Jim.constructor //  true
      ```

      - 构造函数作为普通函数调用

      ```javascript
      function Person(name, age, job) {
        this.name = name
        this.age = age
        this.job = job
        this.sayName = function() {
          return this.name
        }
      }
      var Tom = Person('Tom', 24, 'Engineer') // 参数值被设定到了Global对象上，在浏览器中即在window中
      window.name // Tom
      window.sayName() // Tom
      ```

      - 构造函数的问题

        在上面的例子中，拥有相同函数`sayName`，而且这个函数的功能相同，当每次创建一个新的实例对象时，都会创建一个新的函数对象，造成性能浪费，如果通过提取函数，会造成封装的破坏，而且会造成this的混乱
        ```javascript
        function sayName() {
          return this.name // this在全局环境中一般指向Global对象，但是这里只想构造函数的作用域对象
        }
        function Person(name, age, job) {
        this.name = name
        this.age = age
        this.job = job
        this.sayName = sayName
      }
        ```
      
      构造函数的这种确定可以用原型模式来避免

      
    - 原型模式

      每个函数都有一个 `prorotype`属性，这个属性是一个指针，指向一个对象，这个对象包含所有实例共享的属性和方法。

      ```javascript
      function Person(type) {
        
      }

      Person.prototype.name = 'Tom'
      Person.prototype.age = 24
      Person.prototype.job = 'Engineer'
      Person.prototype.obj = {a: 1}
      Person.prototype.sayName = function() {
        return this.name
      }

      var Tom = new Person()
      var Jim = new Person()
      console.log('obj', Tom.obj === Jim.obj) // true
      ```

      - 理解原型对象

        所有函数在创建的时候都会根据某种规则，创建一个`prototype`属性，这个属性指向函数的原型对象。默认情况下，这个原型对象上会自动获得一个`constructor`属性，这个属性包含一个指向`prototype`属性所在的函数的指针。前面的例子中则是，Person.prototype.constructor指向Person函数
        ![prototype](https://tva1.sinaimg.cn/large/007S8ZIlgy1gg3hxudh5hj30vw0cimxl.jpg)

        每个实例都包含一个内部属性，这个属性指向`Person.prototype`，它们和构造函数没有直接的关系。上面中的两个对象上，实际上并没有任何属性和方法，通过查找对象属性调用Person.prototype中的方法

        实例对象上的隐形原型对象无法访问到，但可以通过`isPrototypeOf`判断对象间是否有关联，通过`getPrototypeOf`获得实例对象的原型对象指向的原型对象

        - `isPrototypeOf()`

        此方法可以判断实例是否和调用这个方法的构造函数有这中关系。
        
        ```javascript
        Person.prototype.isPrototypeOf(Tom) //  true
        Person.prototype.isPrototypeOf(Jim) // true
        ```

        - `getPrototypeOf()`：

        ```javascript
        Object.getPrototypeOf(Tom) === Person.prototype // true
        Object.getPrototypeOf(Jim).name = 'Tom'
        ```

        对象属性的查找：当读取某个对象的属性时，首先搜索对象本身的属性，若没有则搜索对象隐形原型对象上的属性，找到则返回
        
        >可以通过实例对象访问原型对象上的属性和方法，但是没法通过实例对象修改原型中的值

        - 原型与 `in` 操作符

          `in`操作符会在通过对象能够访问给定属性时返回true，无论该属性存在于实例中还是原型中。

          ```javascript
          function Person() {

          }
          Person.prototype.name = 'Tom'
          Person.prototype.age = 29
          Person.prototype.job = 'Engineer'

          var person = new Person()

          person.hasOwnProperty('name') // false
          'name' in person // true
          ```

          `for...in`循环时，返回的时所有能够通过对象访问、可枚举的属性。

          获取可枚举的实例属性，可以使用`Object.keys`方法。

        - 更方便的原型定义方法

          ```javascript
          function Person() {}

          Person.prototype = {
            name: 'Tom',
            age: 29,
            job: 'Engineer',
            sayName: function() {
              return this.name
            }
          }
          ```

          这种写法会完全重写 Person 的prototype对象，使得`constructor`不再指向 Person 构造函数。instanceof 能够返回正确内容，但是 constructor 无法确定对象类型。此时需要重新定义constructor

          ```javascript
          function Person() {}
          Person.prototype = {
            constructor: Person,
            name: 'Tom',
            age: 29, 
            job: 'Engineer',
            sayName: function() {
              return this.name
            }
          }

          // 但是重新自定义 constructor 会使得这个属性可枚举，[[Enumerable]] 为true，但是我们原生的constructor是不可枚举的，需要用Object.defineProperty

          Object.defineProperty(Person.prototype, 'constructor', {
            enumerable: false,
            value: Person
          })
          ```

        - 原型的动态性

          在原型中查找值的过程是一种搜索的过程，因此对原型对象所做的任何修改都能够立即反映到实例上。
          如果重写整个原型对象，会切断构造函数与最初原型的联系。因为在调用构造函数创建实例时，会为实例添加一个[[Prototype]]指针指向最初原型，但是当重写构造函数的原型时，会切断了最初原型的联系

          ```javascript
          function Person() {}

          var person = new Person()

          Person.prototype.sayName = function() {
            console.log('originPrototype')
          }

          Person.prototype = {
            constructor: Person,
            name: '11111',
            sayName: function() {
              console.log('changePrototype', this.name)
            }
          }

          person.sayName() // originPrototype，这里因为在创建person实例时，指向的是最初的原型
          
          var person2 = new Person()

          person2.sayName() //changePrototype 11111，这里在创建person2实例时，已经更改了原型对象
          ```

        - 原型模式的缺点

          牵一发而动全身

    - 构造函数模式和原型模式

      使用构造函数模式与原型模式结合。

      ```javascript
      function Person(name, age, job) {
        this.name = name
        this.age = age
        this.job = job
      }
      Person.prototype = {
        constructor: Person,
        sayName: function() {
          return this.name
        }
      }

      var person1 = new Person('Tom', 28, 'Engineer')
      var person2 = new Person('Jim', 30, 'UI')

      person1.sayName() // Tom
      person2.sayName() // Jim
      ```

    - 动态原型模式

      ```javascript
      function Person(name, age, job) {
        this.name = name
        this.age = age
        this.job = job

        // 方法
        if(typeof this.sayName != 'function') {
          Person.prototype.sayName = function() {
            return this.name
          }
        }
      }
      ``` 

      方法只会在初次调用构造函数上执行，之后由于原型对象已经初始化完成，不必再次创建。

    - 寄生构造函数模式

      与工厂模式基本一致，寄生构造函数模式主要是重写了返回值。

      ```javascript
      function Person(name, age, job) {
        var o = new Object()
        o.name = name
        o.age = age
        o.job = job
        o.sayName = function() {
          return this.name
        }

        return 0
      }

      var person = new Person('Tom', 30, 'Engineer')

      person.sayName() // 

      // 通常情况下，构造函数并没有返回值，默认返回新的实例。通过添加return值，改写构造函数的返回
      ```

    - 稳妥构造函数模式

      稳妥构造函数模式和寄生构造函数相似，区别是不实用this和new

      ```javascript
      function Person(name, age, job) {
        var o = new Object()

        o.sayName = function() {
          return name
        }
      }
      ```

      除了sayName方法之外，无法访问name的值

  - 继承

    - 原型链：

      让原型对象等于另一个实例，而这个实例的原型对象又等于另外一个实例的原型对象，层层递进，构成一个链条
      ```javascript
      function SuperType() {
        this.property = true
      }
      SuperType.prototype.getSuperValue = function() {
        return this.property
      }

      function SubType() {
        this.subProperty = false
      }
      SubType.prototype = new SuperType()

      SubType.prototype.getSubTypeValue = function() {
        return this.subProperty
      }

      var instance = new SubType()

      instance.getSubTypeValue() // true
      ```

      通过实现原型链，扩展了原型搜索机制。访问属性时，会沿着原型链搜索。

      - 所有实例都继承自 object，所以，所有原型链的最上游都是 Object

      - 确定原型和实例的关系

        通过 instanceof 确定原型和实例之间的关系。

        ```javascript
        instance instanceof Object //  true
        instance instanceof SuperType // true
        instance instanceof SubType //  true
        ```

        通过`isPrototypeOf`确定实例和构造函数的关系

        ```javascript
        Object.prototype.isPrototypeOf(instance)
        SuperType.prototype.isPrototypeOf(instance)
        SubType.prototype.isPrototypeOf(instance)
        ```

      - 原型链的问题

        1. 包含引用类型值的原型。
          ```javascript
          function SuperType() {
            this.colors = ['red', 'blue', 'green']
          }

          function SubType() {}
          SubType.prototype = new SuperType()

          var instance1 = new SubType()
          instance1.colors.push('black') // colors: ['red', 'blue', 'green', 'black']
          var instance2 = new SubType()
          instance2.colors // ['red', 'blue', 'green', 'black']
          ```

        2. 没有办法在不影响所有对象实例的情况下，给超类型的构造函数中传递参数。

        > 以上两个问题导致原型链的应用不是很多

    - 构造函数式继承

      子构造函数内调用需要继承的构造函数

      ```javascript
      function SuperType() {
        this.colors = ['red', 'green', 'blue']
      }
      function SubType() {
        SuperType.call(this)
      }
      var sub1 = new SubType()
      sub1.colors.push('black')
      var sub2 = new SubType()

      sub1.colors === sub2.colors //  false
      ```

      - 问题

        1. 需要的方法都在父类中定义，所以不能最大程度的封装


    - 组合继承

      将原型链继承和构造函数式继承结合

      ```javascript
      function SuperType(name) {
        this.name = name
        this.colors = ['red', 'green', 'blue']
      }
      SuperType.prototype.sayName = function() {
        return this.name
      }

      // 继承属性
      function SubType(name, age) {
        SuperType.call(this, name)
        this.age = age
      }

      // 继承方法
      SubType.prototype = new SuperType()

      SubType.prototype.sayAge = function() {
        return this.age
      }

      var instance1 = new SubType('Tom', 29)

      instance1.colors.push('black') // ['red', 'green', 'blue', 'black']

      var instance2 = new SubType('Jim', 30) 

      instance2.colors // ['red', 'green', 'blue']

      ```

    - 原型继承

      创建一个构造函数，然后传入的对象作为这个构造函数的原型，最后返回这个临时构造函数的实例。

      ```javascript
      function object(o) {
        function F() {}
        F.prototype = o
        return new F()
      }

      var person = {
        name: 'Tom',
        friends: ['Jim', 'Van']
      }

      var person1 = object(person)
      person1.name = 'Ellie'
      person1.friends.push('joel') //['Jim', 'Van', 'joel']
      var person2 = object(person)
      person2.friends.push('bill') // ['Jim', 'Van', 'joel', 'bill']
      ```
      实际上相当于对`o`对象做了一次浅拷贝


      > 在 ES5 中，新增了 Object.create 方法规范了原型式继承，方法接收两个参数，其实现和原型继承一样。

      ```javascript
      var person = {
        name: 'Tom',
        friends: ['Jim', 'Ellie', 'Joel']
      }

      var person1 = Object.create(person, {
        name: {
          value: 'Greg' 
        }
      }) // 第二个参数可以额外定义对象属性，与Object.defineProperty的第二个参数一样
      ```
    
    - 寄生式继承

      寄生式继承和原型式继承相关紧密联系。创建一个仅用于封装继承过程的函数，函数内部集成了所有需要增强对象的属性和方法。

      ```javascript
      function createObject(original) {
        var clone = Object.create(original)
        clone.sayName = function() {
          return this.name
        }
        return clone
      }


      // 调用
      var person = {
        name: 'Jim',
        friends: ['Joel', 'Ellie']
      }

      var personInstance = createObject(person)
      personInstance.sayName() // Jim
      ```

      > 这种继承方式和构造函数式继承的确定一样，不能做到最大程度的封装

    - 寄生组合式继承

      相较与组合式继承的两次调用父类，造成冗余，寄生组合式继承的子类只继承父类的实例属性，原型继承父类的方法，减少冗余，同时，子类的constructor指向本身，达到增强。

      寄生组合继承的函数接收两个参数，一个是子类，一个是父类，在内部创建一个父类原型的副本，然后设置子类的constructor，最后将对象赋给子类原型,
      ```javascript
      function inheritPrototype(subType, superType) {
        var prototype = Object.create(superType.prototype)
        prototype.constructor = subType
        subType.prototype = prototype 
      }
      ```

      ```javascript

      // 寄生组合
      function inheritPrototype(subType, superType) {
        var prototype = Object.create(superType.prototype)
        prototype.constructor = subType
        subType.prototype = prototype
      }

      //  继承
      function SuperType(name) {
        this.name = name
        this.colors = ['red', 'green', 'blue']
      }

      SuperType.prototype.syaName = function() {
        return this.name
      }

      function SubType(age) {
        SuperType.call(this, 'instance')
        this.age = age
      }
      inheritPrototype(SubType, SuperType)

      SubType.prototype.sayAge = function() {
        return this.age
      }


      // 使用

      var instance = new SubType(1234)

      instance.sayName() // instance
      instance.sayAge() // 1234
      ```


- 函数表达式

  函数的创建：

    - 函数声明（函数声明提升）
    - 函数表达式（没有函数声明提升，匿名函数）

    ```javascript

    sayMorning() // 正确执行
    function sayMorning() {
      console.log('morning')
    }

    sayYo() // 错误
    var sayYo = function() {
      console.log('Yo')
    }

    //

    if(condition) {
      function sayHi() {
        console.log('hi')
      }
    } else {
      function sayHi() {
        console.log('yo')
      }
    }

    sayHi() // 对于不同浏览器有不同的处理，有些是hi有些是yo，这种函数的声明会造成不可预期的错误

    var sayHi
    if(condition) {
      sayHi = function() {
        console.log('hi')
      }
    } else {
      sayHi = function() {
        console.log('yo')
      }
    }

    sayHi() // 结果可预期
    ```

  - 递归

    函数调用自身

    ```javascript
    function factorial(num) {
      if(num <= 1) {
        return 1
      } else {
        return num * factorial(num - 1)
      }
    } // 典型的递归阶乘
    ```

  - 闭包

    有权访问另一个函数作用域中的变量的函数。通常来讲闭包的创建，就是在一个函数内部创建另一个函数，这个函数可以访问外部函数的变量。

    ```javascript
    function createComparisonFunction(propertyName) {
      return function(object1, object2) {
        var value1 = object1[propertyName]
        var value2 = object2[propertyName]

        if(value1 < value2) {
          return -1
        } else if(value1 > value2) {
          return 1
        } else {
          return 0
        }
      }
    }
    ```

    闭包与作用域链

      函数在第一次被调用时，会创建一个执行环境及相应的作用域链，并把作用域链赋值给一个特殊的内部属性`[[Scope]]`。函数的活动对象在作用域链的第一位，外部函数的活动对象在第二位，外部的外部函数活动对象在第三位。。。直到作用域链的终点的全局执行环境。而函数的活动对象是使用 this、arguments、和其他命名参数的值来初始化，在闭包中，这就会影响到this的指向。

      在上面的例子中，函数`createComparisonFunction`内部返回的匿名函数引用了外部函数的变量`propertyName`，因此，在`createComparisonFunction`返回匿名函数被销毁后，其作用域链仍在匿名函数创建的执行环境中没有释放，当匿名函数执行完毕，匿名函数的执行环境即作用域链才被释放

      > 由于闭包会导致作用域链内的某些执行环境得不到释放，会占用更多的内存

    - 闭包与变量

      闭包只能取得包含函数中任何变量的最后一个值。

      ```javascript
      function createFunctions() {
        var result = new Array()
        for(var i=0;i< 10;i++) {
          result[i] = function() {
            return i
          }
        }
      }
      ```
      上面例子创建的函数就是一个闭包，但是闭包内保存的是变量对象，在createFunctions执行完毕后，i最后变成了10，执行函数是所有都返回10，而不是各自的索引

      可以通过修改创建另一个闭包强制符合预期

      ```javascript
      function createFunctions() {
        var result = new Array()
        for(var i=0;i<10;i++) {
          result[i] = function(num){
            return function() {
              return num
            }
          }(i)
        }
      }
      ```

      上面的例子的函数输出都是各自的索引。这里没有把闭包赋值给数组，而是创建了另一个闭包的匿名函数，在执行匿名函数时，传入了变量`i`，由于是值传递，会将变量`i`当前的值复制给`num`，最内部的闭包保存着这个外部匿名函数变量对象的值，能够达到预期。


    - 关于`this`

      ```javascript
      var name = 'window'

      var obj = {
        name: 'object',
        getName: function() {
          return function() {
            return this.name
          }
        }
      }

      obj.getName()() // window
      ```

    - 内存泄漏

  - 模仿块级作用域

    匿名函数模拟块级作用域
    ```javascript
    (function() {
      // 这里的变量是块级作用域
    })()
    ```

  - 私有变量

    所有函数中定义的变量都是私有的，外部不能访问这些变量。

    通过创建闭包，可以访问私有变量，称为特权方法。

    ```javascript
    function MyObject() {
      var privateVariable = 10
      function privateFunction() {
        return false
      }

      // 特权方法
      this.publicMethod = function() {
        privateVariable++
        return privateFunction()
      }
    }
    ```

      - 静态私有方法
        
      - 模块模式

      - 增强模块模式

- BOM：浏览器对象模型

  - window

    - 全局作用域

      ```javascript
      var name = 'Jim'

      function sayName() {
        console.log(this.name)
      }
      name // Jim
      window.name // Jim
      sayName() // Jim
      ```
      使用var添加的window属性有`[[Configurable]]`，值为false，因此不能被`delete`删除（现在已经可以删除）

    - 窗口关系及框架

    - 窗口位置

      - screenLeft
      - screenTop
      - screenX(fireFox)
      - screenY(fireFox)

      - moveTo
      - moveBy

    - 窗口大小

      - innerHeight
      - innerWidth

      - outerHeight
      - outerWidth

      - resizeTo
      - resizeBy (有些浏览器会禁止调整窗口大小)

    - 导航和打开窗口

      - window.open

    - 超时调用和间歇调用

      - `setTimeout`
      - `setInterval`

      接手两个参数，一个是执行的函数，第二个是毫秒数，表示过**浏览器的定时触发线程**在多久后把事件函数推到任务队列中，需要等待队列中前面的任务执行才执行，所以，不一定是按照规定的时间就执行

      - `clearTimeout`
      - `clearInterval`

    - 系统对话框

      - alert
      - confirm：返回`true`或者`false`
        ```javascript
        if(confirm('确定离开？')) {
          window.close()
        }
        ```
      - prompt：带输入框的提示框，确定时返回输入内容，取消返回null
        ```javascript
        prompt("what's your name?", "Jim")
        ```


  - location

    提供了当前窗口中加载的文档有关的信息，还有一些导航功能。`location`既是`window`对象的属性，也是`document`的属性。
    - hash

    - host

    - hostname

    - href 
      ```javascript
      // 以下是相同的效果
      location.assign('https://www.baidu.com')
      window.location = 'https://www.baidu.com'// 也会调用 location.assign
      location.href = 'https://www.baidu.com' // 也会调用 location.assign
      ```

    - pathname

    - port

    - protocol

    - search

  - navigator

    保存客户端浏览器信息和方法的对象

    - 检测插件

      wndow.navigator.plugins 

      返回对象数组，每个对象包含的属性包括：

        name
        description
        filename
        length


  - screen

    screen对象在js编程中的作用不大，主要用来表明客户端的能力。包括：

    availHeight: 屏幕的像素高度减系统部件高度之后的只
    availLeft：
    availTop：
    pixelDepth：屏幕的位深



  - history

    history对象记录用户上网的记录。


- DOM

  文档对象模型是针对 HTML 和 XML 文档的一个 API。

  - Node类型

    DOM1 级定义了一个 Node 接口，该接口将由 DOM 中所有节点类型实现。JavaScript 中的所有节点类型都继承自Node类型，一次所有节点类型都共享着相同的基本属性和方法。

    - nodeType属性：每个节点都有一个 nodeType属性，用于表明节点的类型。节点类型由在 Node 类型中定义的下列 12 个数值常量来表示，任何节点类型必居其一。

      Node.ELEMENT_NODE: 1
      Node.ATTRIBUTE_NODE: 2
      Node.TEXT_NODE: 3
      Node.CDATA_SECTION_NODE: 4
      Node.ENTITY_REFERENCE_NODE: 5
      Node.ENTITY_NODE: 6
      Node.PROCESSING_INSTRUCTION_NODE: 7
      Node.COMMENT_NODE: 8
      Node.DOCUMENT_NODE: 9
      Node.DOCUMENT_TYPE_NODE: 10
      Node.DOCUMENT_FRAGMENT_NODE: 11
      Node.NOTATION_NODE: 12

      ```javascript
      var el = document.createElement('div')
      el.nodeType // 1 即 ELEMENT_NODE
      el.nodeType === Node.ELEMENT_NODE //  true
      ```

    - nodeName 和 nodeValue 属性：根据节点类型有不同的值，如果为文本类型nodeValue为内容的字符串

    - 节点关系

      - childNodes：每个节点都有一个 childNodes 属性，其中保存者一个 NodeList 对象。
        ```javascript
        var el = document.createElement('div')
        var span = document.createElement('span')
        el.append(span)

        var children = el.childNodes

        typeof children // object
        children instanceOf Array // false, NodeList 类型
        ```

        childNodes 是一个类数组，可以通过下标，或者 NodeList.item() API获取

        ```javascript
        var span = children.item(0) // span 节点
        ```

      - parentNode：父节点

      - previousSibling：上一个兄弟节点

      - nextSibling：下一个兄弟节点

      - firstChild

      - lastChild


    - 操作节点

      - appendChild：向 childNodes 列表末尾添加一个节点 `someNode.appendChild(document.createElement('span'))`，返回值为插入的节点

      - insertBefore：在节点前插入一个新节点 `var returnNode = someNode.insertBefore(newNode, referenceNode)`, 如果 referenceNode 为 null 则 newNode 将被插入到子节点的末尾

      - replaceChile：`var returnNode = someNode.replaceChile(newNode, replaceNode)`返回的节点为被替换的节点

      - removeChild：移除一个节点`var returnNode = someNode.removeChild(someNode.firstChild)`，返回节点为被删除的节点

      - cloneNode：创建节点的副本，接受一个参数，表示是否深度复制，true为深度复制`var clone = someNode.cloneNode(true)`

  - Document 类型

    JavaScript 通过 Document 类型表示文档。在浏览器中，document 对象是 HTMLDocument（继承自 Document 类型）的一个实例，表示整个 HTML 页面，该属性window下。包括：

      nodeTyp 值为9
      nodeName 为 #document
      nodeValue 为 null
      parentNode 为 null
      ownerDocument 为null
      其子节点可能是一个 DocumentType（最多一个）、Element（最多一个）、ProcessingInstruction或者Comment
      ```HTML
      <!DOCTYPE html>
      <html lang="en">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
          html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }
          .box {
            width: 300px;
            height: 300px;
            margin: 200px auto;
            border: 1px solid #ccc;
          }
        </style>
        <script></script>
      <body>
        <div class="box" id="box">测试box</div>
      </body>
      <span>span</span>
      <div></div>
      </html>
      ```
      浏览器读取后会自动把对应的标签放到对应的内容内，只会有一个head和body

    - 文档子节点

      - document.documentElement：访问子节点的快速方式。该属性始终指向 HTML 元素。
        ```javascript
        var html = document.documentElement
        html === document.childNodes[0] // true
        html === document.firstChild // true
        ```

      - document.body：访问子节点的快速方式。该属性指向 <body> 元素。

      > 这两个都可以用 childNodes 访问。document.childNodes[1].childNodes[1] === body

      - document.doctype：取得对<!DOCTYPE>的引用

    - 文档信息

      - document.title

      - document.URL：完整的来源页面的URL

      - document.domain：域名

      - document.referrer：取得来源页面的 URL，直接打开而不是跳转的则为空字符串。

    - 查找元素

      - document.getElementById

      - document.getElementByClassName

      - document.getElementByTagName

    - 特殊集合

      - document.anchors：文档中所有带 name 特性的`<a>`元素，html5中已经不支持 `name` 属性，用 id 取代

      - document.applets：文档中所有 `<applet>` 元素，html5中已经不支持，用 `object` 取代

      - document.forms：文档中所有的 `<form>` 元素。

      - document.images： 文档中所有 `<img>` 元素。

      - document.links：文档中所有带 `href` 属性的 `<a>` 元素

    - DOM 一致性检测

      由于 DOM 分为多个级别，包含多个部分，因此检测浏览器实现了 DOM 哪些部分十分必要。

      `document.implementation` 属性提供相应的信息和功能。DOM1 级只为 document.implementation 规定了一个方法，即 `hasFeature`。

      ```javascript
      var hasXmlDom = document.implementation.hasFeature('XML', '1.0') // 接收两个参数，需要检测的DOM功能名称及版本号
      ```

    - 文档写入

      - write：原样写入

      - writeln：会在字符串末尾添加一个换行符(\n)

      - open：打开一个要写入内容的文档，全部内容会被擦除

      - close：关闭文档写入流

  - Element 类型

    nodeType 为 1
    nodeName 为元素标签名
    nodeValue 为 null
    parentNode 可能是 Document 或 Element

    - HTML 元素

      所有 HTML 元素都由 HTMLElement 类型表示。 HTMLElement 类型直接继承自 Element 并添加了一些属性。

      id，元素在文档中的唯一标识符
      title，有关元素的附加说明信息，一般通过工具提示条显示出来
      lang，元素内容的语言代码，很少使用
      dir，语言方向，值为 ltr(left-to-right)，或者 rtl(right-to-left)，很少使用
      className，元素的 class 类

    - 取得属性

      - getAttribute: 传递的参数的属性名和实际的属性名一致。如果要得到 class 应该传入 class 而不是 className。可以取得自定义属性
        ```html
        <div class="test" define_prop="test" data-test="test234">test</div>

        <script>
          var test = document.getElementByClassName('test')[0]
          var defineProp = test.getAttribute('define_prop')

          // 取得data属性
          var dataset = test.dataset
          var testProp = dataset.test // test234

        </script>
        ```
        有两类特殊的特性，它们虽然有对应的属性名，但属性名的值与通过 getAttribute 访问的值不同。获取 style 属性时返回的是对象，访问 onclick 类似的事件属性时，返回的是字符串。

        **通常访问属性直接使用 DOM 元素对象本身的属性，访问自定义属性时才使用 getAttribute 方法。**

    - 设置属性

      - setAttribute：接收两个参数，属性名和属性值。属性名会被统一转换为小写；可以设置自定义属性。

    - 移除属性

      - removeAttribute

    - attributes 属性

      ELement 类型是使用 attributes 属性的唯一一个 DOM 节点类型。

      attributes 属性包含 NameNodeMap，与 NodeList 类似，是一个动态属性。包含：

        - getNamedItem(name)： 返回 nodeName 属性等于 name 的节点。
        - removeNamedItem(name)：从列表中删除 name 属性的节点。
        - setNameItem(node)：向列表中添加 nodeName 属性为索引的节点。
        - item(pos)：返回位于数字 pos 位置处的节点
    
    - 创建元素

      document.createElement

    - 元素子节点

      获取节点的所有子节点:
      ```javascript
      let nodes = []
      for(var i=0;i<element.childNodes.length;i++>) {
        if(element.childNodes[i].nodeType === 1) { Element 类型
          nodes.push(element.childNodes[i])
        }
      }
      ```

  - Text 类型

    nodeType 为 3
    nodeName 为 #text
    nodeValue 为 所包含的文本
    parentNode 为 一个Element
    没有子节点

    可以使用下列方法修改节点中的文本

    appendData(text)：将 text 添加到节点的末尾

    deleteData(offset, count)：从 offset 指定的位置开始删除 count 个字符

    insertData(offset, text)：从指定位置添加 text 文本

    replaceData(offset, count, text)：从 offset 到 count 位置替换为 text

    splitText(offset)：从指定位置将当前文本分成两个文本节点。返回第二段文本，节点值变为第一段文本

    substringData(offset, count)：提取指定位置到 count 为止的字符串。

    - 创建文本节点

      document.createTextNode：接收需要插入节点中的文本。

      一个节点可以有多个文本节点。如果两个文本节点是相邻节点，那么两个文本会连起来，不会有空格。

    - 规范化文本节点

      若文档中存在两个相邻的文本节点，会分不清 那个文本节点是哪个字符串。可以用 `normalize`方法。在包含两个相邻文本节点的节点调用此方法会将相邻的两个文本节点合并。
      ```javascript
      var box = document.createElement('div')
      var text1 = document.createTextNode('1234')
      var text2 = document.createTextNode('11111')
      box.appendChild(text1)
      box.appendChild(text2)
      box.normalize() // 合并 text1 和 text2
      ```

    - 分割文本
    

      `splitText()`与 normalize 方法相反。在文本节点上调用，将文本节点分为两个，原节点为分割的前一段，新文本节点为分割后的第二段。

  - Comment 类型

    通过 Comment 类型表示 DOM 中的注释

    nodeType 为 8
    nodeName 为 #comment
    nodeValue 为注释内容
    parentNode 可能是 Document 或 Element
    没有子节点

    - 创建注释节点：`var comment = document.createComment()`

  - CDATASection 类型

    CDATASection 类型只针对基本 XML 的文档，标识的是 CDATA 区域。与 Comment 类似，CDATASection 类型继承自 Text 类型，因此拥有除 splitText 之外的所有字符串操作方法。

    nodeType 为 4
    nodeName 为 #cdata-section
    nodeValue 为 CDATA 区域中的内容
    parentNode 可能是 Document 或 Element
    不支持子节点

  - DocumentType 类型

    nodeType 为 10
    nodeName 为 doctype 的名称
    nodeValue 为 null
    parentNode 为 Document
    不支持子节点

    DOM1 级中，DocumentType 对象不能动态创建，只能通过解析文档代码的方式来创建。支持它的浏览器会把 DocumentType 对象保存在 `document.doctype` 中。DOM1 级描述了 DocumentType 的3个对象属性：name、entities和notation。name 表示文档类型的名称

  - DocumentFragment 类型

    所有节点类型中，只有 DocumentFragment 在文档中没有对应的标记。文档片段是一种轻量级文档，就像 document 文档一样，可以存储节点，不同的是，文档片段没有真实的 DOM 结构，对它所有的修改都不会引起回流重绘。

    nodeType 为 11
    nodeName 为 #document-fragment
    nodeValue 为 null
    parentNode 为 null

    **由于对文档片段（DocumentFragment）的修改不会引起文档（document）的回流重绘，故一般用在大量节点绘制的性能优化上**

    - 创建 DocumentFragment 节点：`document.createDocumentFragment`

      ```javascript
      var fragment = document.createFragment()
      var ul = document.getElementById('my-list')
      for(var i=0;i< 10000;i++) {
        var li = document.createElement('li')
        li.innerText = 'test'+i
        fragment.appendChild(li)
      }
      ul.appendChild(fragment) // 一次性推进
      ```

  - Attr 类型

    nodeType 为 11
    nodeName 为 属性的名称
    nodeValue 为 属性的值
    parentNode 为 null
    HTML 中不支持子节点

    相关方法

      getAttribute

      setAttribute

      removeAttribute


- DOM 扩展

  - 选择符 API

    - querySelector：接收一个 css 选择符，返回一个 Node

    - querySelectorAll：接收一个 css 选择符，返回 NodeList

    - matchesSelector：接收一个 css 选择符，返回这个元素是否和该选择符匹配。

      ```javascript
      var test = document.createElement('div')
      test.className = 'test'
      test.matchesSelector('.test') // ture
      ```

      > 有些浏览器使用前缀名称实现这个方法，比如 chrome 使用 webkitMatchesSelector 

  - 元素遍历

    - childElementCount

    - firstElementChild

    - lastElementChild:

    - previousElementSibling

    - nextElementSibling

  - HTML5

    - 与类相关的扩充

      - getElementByClassName

      - classList: DOMTokenList 类型实例。

        - item(index)：返回对应索引的雷鸣

        - add(value)：添加类名，如果已存在则不添加

        - contains(value)：是否包含给定类名

        - remove(value)：删除类名

        - toggle(value)：已存在则删除，不存在则添加

    - 焦点管理

      - document.activeElement属性

        始终返回当前文档中的焦点元素。

    - HTMLDocument 的变化

      - readyState

    - 字符集属性

      - document.charset = 'UTF-8'

    - 自定义数据属性

      ```html
      <div data-appid="123456"></div>
      <script>
        var appid = document.getElementByTagName('div')[0].dataset.appid
      </script>
      ```

    - 插入标记

      - innerHTML

      - outerHTML

      - insertAdjacentHtml

    - scrollIntoView

      element.scrollIntoView(alignToTop | scrollIntoViewOptions)
      
      参数：

        - alignToTop: 可选。 true | false，是否与上边对齐,false 则与下边对齐

        - scrollIntoViewOptions：可选。
          - behavior: 'auto', 'smooth'，
          - block：垂直方向对齐方式：'start','center','end','nearest'
          - inline：遂平方向对齐方式：'start','center','end','nearest'

  - 专有扩展

    - 文档模式

    - children属性：元素中的所有为元素的子节点

      > 与 childNodes 的区别：childNodes 返回节点的所有节点，包含文本节点；而 children 只包含元素节点(nodeType: 1)

    - contains()：判断某节点是否包含某个节点。

      ```javascript
      document.documentElement.contains(document.body) // true
      ```

      > DOM3 中 compareDocumentPosition()，可以根据返回值判断两个元素的位置关系(1.无关 2.居前 4.居后 8.包含 16.被包含)

    - 插入文本: 
    
      - innerText

      - outerText

- DOM2 和 DOM3

- 事件

  JavaScript 和 HTML 的交互通过事件实现。通过使用侦听器（处理程序）预定事件，事件发生时执行相应的代码。即通常所说的观察者模式。

  - 事件流

    从页面中接收事件的顺序。有事件冒泡流和事件捕获流。

    - 事件冒泡（IE事件流）：从目标元素向上传播到document

    - 事件捕获：从 document 向下传播

    - DOM 事件流：DOM2 级事件流包括三个阶段，事件捕获 、处于目标阶段和冒泡阶段。

  - 事件处理程序

    - HTML 事件处理程序

      某个元素支持的事件，都有一个对应的同名 HTML 属性，这个属性的值能够执行 Javascript 代码。
      ```html
      <div onclick="alert('Click')"></div>
      ```
      > 不能使用未经转译的 HTML 语法字符，可以直接访问变量对象，不用取值

    - DOM0 级事件处理程序

      将一个函数赋值给一个元素对象的事件处理程序属性
      ```javascript
      document.onclick = function() {
        console.log('click')
      }
      ```
      DOM0 级方法指定的事件处理程序是元素的方法，在元素的作用域中运行，this 指向元素本身。

    - DOM2 级事件处理程序

      addEventListener
      removeEventListener

    - IE 事件处理程序

      attachEvent 和 detachEvent
  
  - 事件对象 

    - DOM 中的事件对象

      属性/方法 | 类型 | 读/写 | 说明
      :-: | :-: | :-: | :-: 
      bubbles | Boolean | 只读 | 是否冒泡
      cancelable | Boolean | 只读 | 是否可以取消默认行为
      currentTarget | Element | 只读 | 事件处理程序当前处理的元素
      defaultPrevented | Boolean | 只读 | 是否已经阻止默认行为（preventDefault()）
      detail | Integer | 只读 | 与事件相关的细节信息
      eventPhase | Integer | 只读 | 0.没有事件正在处理 1.捕获阶段 2.处于目标 3.冒泡阶段
      preventDefault | Function | 只读 | 取消默认行为，cancelable 为 true 时可执行
      stopImmediatePropagation | Function | 只读 | 取消进一步的捕获或者冒泡，同时阻止任何事件处理程序被调用。DOM3 级事件新增
      stopPropagation | Function | 只读 | 取消进一步捕获或冒泡，cancelable 为 true 时可执行
      target | Element | 只读 | 事件目标
      trusted | Boolean | 只读 | 为 true 表示事件为浏览器生成。为 false 表示事件有 JavaScript 创建（DOM3 级新增）
      type | String | 只读 | 被触发的事件类型
      view | Abstractivew | 只读 | 与事件关联的抽象图。等同于发生事件的 window 对象

      > currentTarget 始终与 this 相同，而 target 视事件的真实目标而定，如果直接将事件处理程序指定了目标元素，则三者相同
    
    - IE 事件对象

    - 跨浏览器事件对象

  - 事件类型

    - UI事件

      - DOMActivate： 表示元素已经被用户操作激活，DOM3 级事件中废弃

      - load：页面完全加载。
        ```html
        <html>
          <body onload="alert('loaded')"></body>
        </html>
        <script>
          window.onload = function() {}
          document.onload = function() {}
        </script>
        ```
        window 和 document 的 onload 效果一致，DOM2 级事件规范为在 document
        图像上也可以使用 onload 事件

      - unload：

      - abort：用户停止下载过程时，如果嵌入的内容没有加载完，则在 <object> 元素上触发

      - error：javascript 错误时在 window 上面触发；无法加载图片时，在 <img> 上触发；无法加载嵌入内容时在 <object> 上触发；当框架无法加载时在框架上触发。

      - select：用户选择文本框（input textarea)中的一个或多个时触发

      - resize：窗口或框架大小变化时相应触发。通过 js 或者 <body> 元素添加事件处理程序

      - scroll：用户滚动带滚动条的元素中的内容时，在该元素上触发。

    - 焦点事件

      - blur：元素失去焦点触发，不会冒泡

      - DOMFocusIn：废弃

      - DOMFocusOut：废弃

      - focus：元素获得焦点触发，不会冒泡。

      - focusIn：focus相似，会冒泡

      - focusOut：blur 事件的通用版本

    - 鼠标与滚轮事件

      - click：用户鼠标点击或者回车触发。

      - dblclick：双击鼠标触发。

      - mousedown：按下任意鼠标键触发，不能通过键盘触发

      - mouseup：鼠标释放时触发。

      - mouseenter：光标首次移动到元素范围内触发。事件不冒泡

      - mouseleave：光标移到元素外部时触发。事件不冒泡

      - mouseout：光标位于一个元素上，然后移动到另一个元素时触发，移入的元素可能在外部也可能是子元素

      - mousemove：光标在元素内部移动时触发。

      - mousewheel：滚轮事件

      相关信息

      - 视口中鼠标位置：clientX、clientY。

      - 页面中鼠标位置：pageX、pageY

      - 整个电脑屏幕中鼠标位置：screenX、screenY
        
      - 修改键：

        鼠标点击时，键盘同时按下的键，在event中表示，`shiftKey`, `ctrlKey`, `altKey`, `metaKey`，为 true 则标识按下了相应的按键

      - 相关元素：event.relatedTarget。

        在 mouseover 和 mouseout  事件中，涉及从一个元素移动到另一个元素的情况，事件的主要目标是获得光标的元素，相关元素就是失去光标的元素。

      - 鼠标按钮：event.button（有出入，主要参考 MDN）

        - 0：主按键，一般为鼠标左键
        - 1: 辅助按键，一般为中建
        - 2: 次按键，一般为右键
        - 3: 第四个按键，一般为浏览器后退按键
        - 4: 第五个按键，一般为浏览器前进按键

      - 鼠标滚动：event.wheelDelta，滚动的距离,以像素为单位

    - 键盘与文本

      - keydown

      - keypress 

      - keyup

      用户按了键盘上的字符键，首先会触发 `keydown` 事件，然后是 `keypress` 事件，最后是 `keyup` 事件，如果按的是功能键，不会触发 `keypress` 事件。如果按住不放，不断触发 `keydown` 和 `keypress` 事件，功能键长按不会重复触发事件。

      - 相关信息

        - 键码：keyCode，每个 keyCode 对应一个键盘按键。

        - 字符编码：

    - 复合事件：处理 IME（Input Method Editor：输入法编辑器）的输入序列，其实就是输入法。可以让用户输入物理键盘上找不到的字符。

      - compositionstart：在 IME 的文本复合系统打开时触发，标识要开始输入。

      - compositionupdate：在向输入字段中插入新字符时触发。

      - compositionend：在 IME 关闭时触发。

    - 变动事件：DOM2级的变动（mutation）事件能在 DOM 中某一部分发生变化时给出提示。

      - DOMSubtreeModified：在 DOM 结构中发生任何变化时触发。

      - DOMNodeInserted：节点插入另一个子节点中时触发

      - DOMNodeRemoved：节点从父节点移除时触发

      - DOMNodeInsertedIntoDocument：节点被插入文档之后触发，触发在 DOMNodeInserted 后面

      - DOMNodeRemovedFromDocument：节点从文档中移除后触发，触发在 DOMNodeRemoved 后面

      - DOMAttrModified：特性被修改后触发。

      - DOMCharacterDataModified：文本节点的值发生改变时触发。

    - HTML5 事件

      - contextmenu 事件：右键菜单事件。

      - beforeunload：浏览器卸载页面前触发。

      - DOMContentLoaded：形成完整 DOM 树后触发。

      - readystatechange：

        在支持这个事件的每个对象（文档或者元素） 上会有一个 readyState 属性

        - uninitialized：未初始化

        - loading：正在加载数据

        - loaded：加载数据完毕

        - interactive：可以操作对象，但还没有完全加载

        - complete：对象已经加载完

        > 并非所有对象都会经历这几个状态。如果某个阶段不适用某个对象，则可能跳过这个阶段，并没有规定那个阶段适用于那个对象。使用时需要注意这点

      - hashchange：必须把 hashchange 事件处理程序给 window 对象。event 对象保存着 oldURL 和 newURL 两个属性。

    - 设备事件

      - orientationchange 事件：移动设备查看模式（横向、纵向）

      - mozOrientation：firefox的查看模式事件

      - deviceorientation：规范定义的 orientatinchange事件

      - devicemotion：能够检测设备是不是往下掉，或者是不是被走着的人拿在手里

    - 触摸与手势事件

      - 触摸事件

        - touchstart

        - touchmove

        - touchcancel

        - touches

        - targetTouchs

        - changeTouches

      - 手势事件：2个以上手指手势

        - gesturestart

        - gesturechange

        - gestureend


  - 内存与性能

    - 事件委托：利用冒泡原理处理事件处理程序过多。

    - 移除事件处理程序

  - 模拟事件

    - DOM 中的事件模拟

      - document.createEvent：创建模拟事件对象，已废弃，用 `new Event()` 替代

      - document.dispatchEvent：触发模拟事件，new Event() 创建的事件也可以触发

      - 模拟鼠标事件

      - 模拟键盘事件

      - 模拟其他事件

      - 自定义 DOM 事件

- 表单脚本

- Canvas 绘图(todo)

- HTML5 脚本编程

  - 跨文档消息传送 XDM，使用 window.postMessage 方法来向包含在当前页面中的 `<iframe>` 页面传递消息，内嵌页面内的window对象的message事件会被触发。

  - 原生拖放

    - 拖放事件
      
      元素被拖放时，一次触发以下事件
      1. dragstart
      2. drag
      3. dragend

      > 默认可拖放元素是文本、图片、链接，其他需要拖放需要设置 `draggable` 为 true

      一个元素被拖到一个有效的放置目标时，会依次触发以下事件
      1. dragenter
      2. dragover
      3. dragleave 或 drop

    - 自定义放置目标

      在一些不允许放置的元素上，不会触发 `drop` 事件，但是依然可以触发 `dragenter` 和 `dragover` 事件，想要设置为可放置元素，需要重写 `dragenter` 和 `dragover` 事件的默认行为
      ```javascript
      var dropTarget = document.getElementById('droptarget')

      dropTarget.addEventListener('dragenter', function(e) {
        e.preventDefault()
      })
      dropTarget.addEventListener('dragover', function(e) {
        e.preventDefault()
      })
      ```

    - dataTransfer 对象

      - setData：设置被拖动对象要传递的信息

      - getData：释放区域接收的信息

      - dropEffect：被拖动元素可以执行哪种放置行为

        - none：不能把拖动的元素放到这里。除文本框外所有元素的默认值

        - move：应该把拖动的元素移动到释放区域

        - copy：应该把拖动元素复制到释放区域

        - link：放置区域会打开拖动的元素（必须是一个链接）

      - effectAllowed：只有搭配 dropEffect 才有用。表示允许拖动元素的那种 dropEffect

        - uninitialized：没有给被拖动元素设置任何防止行为

        - none：被拖动元素不能有任何行为

        - copy：只允许 copy

        - link：只允许 link

        - move：只允许 move

        - copyLink：允许 copy 和 link

        - copyMove：允许 copy 和 move

        - all：全部允许

    - 可拖动

      - 默认情况下，图像、链接和文本是可以拖动的，其他需要拖动元素需要设置 draggable 属性为 true

      > 支持 draggable 属性的版本为 IE10+

    - dataTransfer 其他成员

      - addElement：为拖动操作添加一个元素。添加这个元素只影响数据，不会影响拖动操作时页面元素的外观。

      - clearData：清除以特定格式保存的数据。

      - setDragImage：指定一幅图像，作为拖动时鼠标下的元素。

      - types：当前保存的数据类型

  - 媒体元素：video、audio 元素

    - 属性：

      属性 | 数据类型 | 说明
      :-: | :-: | :-:
      autoplay ｜ boolean ｜ 获取或设置浏览器的循环播放
      buffered | 时间范围 | 标识已下载缓冲的时间范围内对象
      bufferedBytes | 字节范围 | 表示已下载的缓冲的字段番位对象
      bufferingThrottled | int | 浏览器是否对缓冲节流
      controls | boolean | 浏览器内置控件
      currentLoop | int | 当前媒体循环次数
      currentSrc | string | 当前媒体文件的URL
      currentTime | float | 已播放的秒数
      defaultPlaybackRate | float | 播放速度
      duration | float | 总播放事件（秒）
      ended | boolean | 是否播放完成
      loop | boolean | 是否循环播放
      muted | boolean | 是否静音
      networkState | int | 网络链接状况：0.空 1.正在加载 2.正在加载元数据 3.已经加载第一帧 4.加载完成
      paused | boolean | 是否暂停
      playbackRate | float | 播放速度
      played | 时间范围 | 目前为止已经播放的时间范围
      readyState | int | 媒体是否已就绪。0.数据不可用 1.可以显示当前帧 2.可以播放 3.可以从头到尾播放
      seekable | boolean | 可以搜索的时间范围
      src | string | 媒体URL
      start | float | 开始播放的位置（秒）
      totalBytes | int | 当前资源总字节数
      videoHeight | int | 视频高度
      videoWidth | int | 视频宽度
      volume | float | 音量。0.1到1.0

    - 事件

      事件 | 触发时机 
      :-: | :-:
      abort ｜ 下载中断
      canplay | 可以播放，readyState 为 2
      canplaythrough | 可以连续播放，readyState 为 3
      canshowcurrentframe | 当前帧已经下载完成，readyState 为 1
      dataunavailable | 没有数据不能播放，readyState 为 0
      durationchange | duration 属性的值变化
      emptied | 网络连接中断
      empty | 发生错误阻止了媒体下载
      ended | 已经停止
      error | 下载期间发生网络错误
      load | 重新加载资源
      loadeddata | 第一帧已加载，帧数据可用
      loadedmetadata | 元数据已加载
      loadstart | 下载开始
      pause | 暂停
      play | 开始播放
      playing | 已播放中
      progress | 在在下载
      ratechange | 播放速度改变
      seeked | 搜索结束
      seeking | 正移动到新位置
      stalled | 浏览器尝试下载，但未接收到数据
      timeupdate | 播放位置改变
      volumechange | 音量改变
      waiting | 播放暂停，等待下载更多数据

      当视频、音频处于加载过程中时，依次触发的事件顺序

      1. loadstart
      2. durationchange
      3. loadedmetadata
      4. loadeddata
      5. progress
      6. canplay
      7. canplaythrough

    - 自定义媒体播放器

    - 检测编解码器的支持情况

      - canPlayType: 可以传入 MIME 类型 和 编解码器， 返回 probably、maybe、''
        ![音频可播放类型](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggrp1zmc25j313i08awf6.jpg)
        ![视频可播放类型](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggrp2nyd3oj312k07agmb.jpg)
        
    - Audio 类型
      audio 可以通过构造函数创建
      ```javascript
      var audio = new Audio('sound.mp3')
      audio.addEventListener('canplaythrough', function() {
        this.play()
      })
      ```
  - 历史状态管理

    - hashchange

    - pushState：向 history 历史栈中推进一条历史记录，但不会向服务器发送请求

    - replaceState：取代 history 最后一条历史记录，不会向服务器发送请求

    > pushState replaceState 不会触发 window.onpopstate 事件

- 错误处理和调试

  - 浏览器报告的错误

    - 