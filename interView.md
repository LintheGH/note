interView 准备
- HTML

  - 语义化：根据内容的结构化，选择合适的标签，便于开发者阅读，同时让搜索引擎更好的解析。

  - HTML5部分新标签：
    - article
    - aside
    - details
    - header
    - footer
    - main
    - mark
    - nav
    - progress
    - Section
    
  - viewport：移动设备缩放适配

    meta 标签的`name=viewport`

    [ppk关于 viewport 的理论](https://www.runoob.com/w3cnote/viewport-deep-understanding.html)

    - layout viewport：浏览器可视区域

      由于移动设备相对来说都比较窄，在现实 pc 端页面的时候，都会出现错误，所以通过设置 viewport 一个比较宽的可视区域来达到移动端显示 pc 端能够正常

      所以一般来说移动设备的 layout viewport 都比浏览器的可视宽度要大

    - visual viewport：代表浏览器可视区域的大小，通常可以通过 `window.innerWidth`来获取

    - idea viewport：移动设备的理想 viewport。不管设备的像素密度如何，相同的内容在不同的移动设备中都显示相同的效果。因此理想的 idea viewport 的宽度即为设备宽度。

    - 设置 viewport：

      ```html
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
      ```

      设置了 viewport 等于设备宽度，初始缩放大小和最小缩放大小，不允许用户缩放。

- CSS

  - 盒模型

    - IE盒模型：border-box；宽高：border、padding+自身宽高
    - 标准盒模型：content-box；宽高：自身的宽高

  - 获取宽高的方法：

    - dom.offsetHeight/offsetWidth
    - dom.getClientRect：带小数、可以获取相对视窗的位置（可以用于图片懒加载）

  - 获得各种宽高的方法

    - 屏幕宽高(分辨率)：window.screen.width/height
    - 屏幕工作区域宽高（可用高度，去除工具栏）：window.screen.availWidth/availHeight
    - 网页全文的宽高：document.body.scrollWidth/scrollHeight
    - 滚动条卷去的宽高（没有border）：document.body.scrollTop/scrollLeft
    - 可见区域的宽高（加上border）：document.body.clientHeight/clientWidth

  - BFC

    Block Formatting Context的缩写

    - Box：css布局的基本单位

      box是css布局的基本单位，一个页面可以看成由许多的box组成。元素的类型和display属性决定了这个Box类型。

    - box有几个不同的类型

      - Block-level box：display为block，list-item，table元素。会生成block-level box。
      - Inline-level box：display为inline，inline-block, inline-table的怨毒，会生成inline-level box。
      - Run-in box：css3中才有。

    - formatting context：css规范中的一个定义，不同的类型有不同的渲染规则，决定了其子元素如何定位，以及和其他元素的关系和相互作用。BFC，即Block-level box的formatting context。

      - 他的规则是：
        - 内部的box会在垂直方向，一个接一个地放置。
        - box垂直方向的距离由margin决定。属于**同一个**BFC的两个相邻的box会发生margin重叠（margin重叠问题）
        - 每个盒子（块/行盒）的margin box的左边，与包含块border box的左边相接触
        - BFC的区域不会与float box重叠（自适应两栏布局）
        - BFC就是页面上的一个隔离的独立容器，容器里面的元素不会影响外面的元素，反之亦然。
        - 计算BFC高度时，浮动元素也参与计算（高度塌陷问题）

    - 创建BFC

      - float值不为none
      - position的值不是static或relative
      - display的值时inline-block、table-cell、flex、table-caption或inline-flex
      - overflow的值不是visible

    - 几个BFC相关问题

      1. margin重叠（防止重叠）
      2. 自适应两栏布局
      3. float元素导致parent高度塌陷（清除浮动）

  - 居中问题：

    - 水平居中：
      1. 内联元素：text-align: center
      2. 不定宽块元素居中：margin: 0 auto;// 需要设置父元素宽度。
      3. 定位居中：left：50%；transform：translateX(-50%);
    - 垂直居中：
      1. 内联元素垂直居中：height和line-height相同
      2. flex布局：justify-content: center; align-item: center;
      3. 定位居中：top: 50%;transform: translateY(-50%)
      4. table布局：.father{display: table}; .children{ display: table-cell; vertical-align: middle;text-align: center}
    - 垂直、水平居中：
      1. 定位
      2. flex布局

  - 画三角形：利用边框透明

  - inline、inline-block和block的区别，为什么image是inline还可以设置宽高

  - js动画和css3动画的区别

    - js动画：
      - 优点：
        1. 相比较 css3，对动画的控制比较强，播放暂停，加速都可以控制。
        2. 效果较丰富：如曲线动画
        3. 兼容性相对来说较好
      - 缺点：js在主调用栈中，当调用栈还有其他要处理时，动画卡顿掉帧
    - css3动画
      - 优点：
        1. 浏览器可以对动画进行优化，可以使用类似requestAnimationFrame的机制
        2. 可以使用硬件加速动画
      - 缺点：
        1. 对动画的控制较弱
        2. 较复杂的动画实现比较麻烦

  - Css3新特性、新属性

    [CSS3 和 HTML5 新特性一览](https://juejin.cn/post/6844903829679390728#heading-2)

    - 过渡：transition

    - 变形：tranform

    - 动画：animation

    - 边框：border-radius；border-shadow；border-image

      ...

- javascript

  - 数据类型

    - 基本数据类型：number、string、boolean、undefined、null、symbol

    - 引用数据类型：Object

      **这部分包含对象的各种方法；以及继承的toString、valueOf**

      - Date

      - RegExp

      - Array

      - Object

      - 各种单体内置对象

        - Math

        - Array

        - Object

        - Function

          等。。。

  - new的执行过程

    - 如果构造函数返回原始值，return没有任何作用；如果返回的是一个对象，那么这个实例就是这个对象

      ```javascript
      function Ins(name) {
        this.name = name
        return Date;
      }
      let test = new Ins('test') // test 是Date函数
      test.name // Date函数的name
      function Ins2(name) {
        this.name = name
        return 1
      }
      let test2 = new Ins2('test2'); //test2 是 Ins2的实例 
      test2.name// test2
      
      ```
      
      > 构造函数不需要使用return，返回原始值没有作用，返回对象改变了构造函数的作用，缺省默认返回this
      
    - new 的实现过程

      1. 创建一个空对象，指定这个空对象的原型为函数原型
      2. 通过this将属性和方法添加到这个对象上
      3. 返回这个this

    - 自己实现一个new

      ```javascript
      function myNew(fn, ...args) {
        // 创建一个对象，原型置顶为函数的原型
        let obj = Object.create(fn.prototype)
        // 绑定obj到函数上，并传入参数执行
        fn.call(obj, ...args)
        // 返回这个对象
        return obj;
      }
      
      function test(name, age) {
        this.name = name
        this.age = age
      }
      
      let ins = myNew(test, 'Jim', 20) // {name: 'Jim', age: 20}
      ins instanceof test; // true
      ```

      

  - typeof instanceof

    - typeof

      - typeof 对基本类型使用时返回各自的类型（null 特殊
      - typeof对引用类型使用除了Function外都返回Object

    - instanceof

      通过原型链判断是否是某个对象的实例

      - Symbol.hasInstance

        该方法决定一个对象是否认可被调用对象为它的实例，和instanceof一样

        ```javascript
        function Foo() {}
        let f = new Foo()
        f instanceof Foo; // true
        Foo[Symbol.hasInstance](f); // true
        ```

        实际上，instanceof操作符会在原型链上寻找这个属性，在ES6中，instanceof操作符会使用 Symbol.hasInstance 函数来确定关系。我们可以自定instanceof的行为

        ```javascript
        function MyInstance() {}
        MyInstance.prototype[Symbol.hasInstance] = function() {return true}
        let test = new MyInstance()
        '' instanceof test; // true
        
        class PrimitiveString {
          static [Symbol.hasInstance]() {
        		return true
        	}
        }
        '' instanceof PrimitiveString; // true
        ```

        > 因此，使用instanceof判断对象是否是构造对象的实例并不是百分百可靠

        

  - 类型转换、隐式类型转换（== ）

    **类型转换有三种情况**

    - 转换为boolean
    - 转换为number
    - 转换为string

    **转换为boolean**

    除了undefined、null、false、NaN、0、-0，''转换为false外，其他都转换为true

    **Symbol.toPrimitive**

    作为将对象转换为原始值的函数，很多内置操作 都会尝试强制将对象转换为原始值，包括字符串、数值和未制定的原始类型。

    **对象转换原始类型**

    对象转化原始类型的时候，会调用 `valueOf`和 `toString`。

    - 调用方法视情况而定
      - 转换number类型调用valueOf
      - 转换为string类型调用toString
    - 调用这两种方法的时候需要返回原始类型
      - 在调用valueOf的时候如果不是返回原始类型，会调用toString
      - 若toString返回值不是原始类型，会报错
    - 若有Symbol.toPrimitive，则优先级最高

    **四则运算**

    - 加法运算符的规则

      - 运算符一方为字符串，那么会把另一方转换为字符串

      - 如果一方不是字符串或数字，会将它转换为字符串或数字

        ```javascript
        1 + '1'// '11'
        true + true // 2
        4 + [1,2,3] // 41,2,3
        'a'+ +'b' // 'aNaN' 这里 +b 为 NaN
        ```

    - 乘法运算符

      - 如果一方是数字，则另一方转换为数字

    - 比较运算符

      - 如果是对象，则为对象转换原始值的规则
      - 如果是字符串，比较 unicode 字符串索引
      - 如果是boolean，转换为数字

    **==的隐式转换**

    对于 `==`，如果对比双方的类型不一致，则会发生隐式类型转换。

    - 判断的大致流程
      1. 首先判断两者类型是否相同，相同则比较大小
      2. 类型不相同则发生隐式转换
         1. 先判断是否对比`null`和`undefined`，是则返回true
         2. 是否 `string`和`number`对比，是则string转换number
         3. 是否有一方是`boolean`，是则先把boolean转换为number，再判断
         4. 是否一方为`object`且另一方是`string`、`number`、`symbol`，是则把object转换为原始类型再进行判断

  - this的问题，结合call、bind、apply

    - this的指向问题
    - 改变this的指向
    - call、bind、apply的区别

  - 手写call、bind、apply

    - call、apply的思路
      1. 对绑定对象的处理，如果为原始值，需要转换为包装对象
      2. 把函数绑定到绑定的对象上（使用Symbol做临时对象防止key重复）
      3. 执行对象上的函数（即this，由于是在对象上调用this，故此时函数内部的this指向绑定的对象）
      4. 删除临时属性，返回结果
      5. apply的处理和call大体相同，需要添加对第二个参数非数组/类数组的判断
    - bind
      1. 返回一个新函数，其内部调用函数的call，绑定对象为传入的对象
      2. 需要对返回函数的原型进行处理
      3. 需要对通过new调用返回函数处理（new调用的this为返回函数的this，否则为处理过的绑定对象）

    ```javascript
    // call
    Function.prototype.myCall = function(thisArg, ...args) {
    	if(thisArg === undefined || thisArg === null) {
    		thisArg = window
    	} else {
    		thisArg = Object(thisArg) // 原始值时为原始值的包装对象
    	}
    	const S = Symbol('tempVar') // 用Symbol临时变量，同时防止key重复
      thisArg[S] = this //把函数绑定到指定的对象上
      const result = thisArg[S](...args) // 执行函数得到结果
      delete thisArg[S] // 删除临时变量
      return result
    }
    
    
    function arrayLike() {
       if (o &&                                    // o不是null、undefined等
           typeof o === 'object' &&                // o是对象
           isFinite(o.length) &&                   // o.length是有限数值
           o.length >= 0 &&                        // o.length为非负值
           o.length === Math.floor(o.length) &&    // o.length是整数
           o.length < 4294967296)                  // o.length < 2^32
         return true
      else
        return false
    }
    
    // apply
    Function.prototype.myApply = function(thisArg, args) {
      if(thisArg === undefined || thisArg === null) {
    		thisArg = window
    	} else {
    		thisArg = Object(thisArg) // 原始值时为原始值的包装对象
    	}
    	const S = Symbol('tempVar') // 用Symbol临时变量，同时防止key重复
      thisArg[S] = this //把函数绑定到指定的对象上
      
      let args_ = arguments[1] // 取得参数数组
      let result;
      if(args_) {
        if(!Array.isArray(args_) && !isArrayLike(args_)) {
          throw new TypeErrro('myApply 第二参数必须是数组或类数组对象') //第二个参数不为数组或类数组则抛出错误
        } else {
          let args = Array.from(args_)
          result =  thisArgs[S](...args)
        }
      } else {
        result = thisArg[S]()
      }
      delete thisArg[S] // 删除临时变量
      return result
    }
    
    // bind的简单实现
    Function.prototype.myBind = function(thisArg, ...args) {
      if(thisArg === undefined || thisArg === null) {
        thisArg = window
      } else {
        thisArg = Object(thisArg)
      }
      
      return (...args_) => {
        this.call(thisArg, ...args, ...args_);
      }
    }
    // bind 优化实现
    Function.prototype.myBind = function(thisArg, ...args) {
      const thisFn = this // 保存原函数相关内容
    	const bindFunction = function(...args_) { // 有第二个参数
        const isNew = this instanceof bindFunction; // 返回的函数是否有通过new 调用（通过new调用的this会变为返回的函数的this
        const context
        if(isNew) {
          context = this
        } else {
          if(thisArg === undefined || thisArg === null) {
            context = window
          } else {
            context = Object(thisArg)
          }
        }
        return thisFn.call(context, ...args, ...args_)
      }
      // 改变新函数的原型指向原函数原型
     	if(thisFn.prototype) { // 存在原函数没有原型的情况，如箭头函数
        bindFunction.prototype = Object.create(thisFn.prototype)
      }
      
      return bindFunction
    }
    ```

    

  - 深浅拷贝

    - 浅拷贝

      创建一个新对象，是原始对象的精确拷贝，若缘对象中有引用对象则新对象会影响原始对象

      - Object.assign
      - `...`扩展

    - 深拷贝

      从内存中完全复制一份一样的，新对象不会影响原始对象。对象的深拷贝存在很多边界问题，比如原型链的处理，DOM处理等。

      - JSON.stringify(会存在JSON.stringify的序列化问题)
        - JSON.stringify的序列化问题[你不知道的JSON.stringfy的威力](https://juejin.cn/post/6844904016212672519)
          - 对象中有undefined、null、symbol、function会忽略
          - 数组中的undefined、null、symbol、function会处理为null

  - 立即执行函数

    用function定义函数后立即调用，即叫立即执行函数（立即调用的函数表达式IIFE(Imdiately Invoked Function Expression)

    - js代码执行时，会对函数声明对函数进行解析（函数提升），而函数表达式，当逐行解析到它时才会解析。

    - 正因为函数提升，导致函数声明的函数不能立即执行。

    - 匿名函数不能单独存在，所以没有立即执行

      ```javascript
      function () {}
      // error
      ```

    - 只有函数表达时能够立即执行

      ```javascript
      var test = function() {
        console.log('test')
      }()
      // test
      ```

    - 使用圆括号的两种常用的立即执行函数

      ```javascript
      (function() {console.log(666666)})()
      ((function() {console.log(66666)})())
      ```

      

  - 数组去重

    - ES6方法

      ```javascript
      const repeatArr = [1,1,2,2,3,4]
      
      const reault = Array.from(new Set(repeatArr))
      ```

    - 遍历：基本数据类型

      ```javascript
      const repeatArr = [1,1,2,2,3];
      
       // 使用空数组存储非空值，遍历原始数组，用indexOf或者includes来查询是否存在，不存在则推入值。
      function handler(arr) {
        let res = []
        for(let i=0;i<arr.length;i++) {
          if(res.indexOf(arr[i]) === -1) {
             res.push(arr[i])
           }
        }
        return res
      }
      
      // es6
      function handler2(arr) {
        return arr.filter((item, index) => arr.lastIndexOf(item) === index) 
      }
      
      // 利用对象 key 不可重复
      function handler3(arr) {
        let obj = {}
        let result = []
        for(let i=0;i<arr.length;i++) {
          if(obj[arr[i]]) {
            continue
          }
          obj[arr[i]] = arr[i]
          result.push(arr[i])
        }
        
        return result
      }
      ```

    - 

  - 对象方法

  - 异步编程

    - callBack
    - es6后续异步编程方法
      - promise
        - 手写promise（promise/A+规范）
      - async/await
        - async/await的实现（promise的语法糖）
      - genertor

  - 闭包 **

    函数A内部有一个函数B，函数B可以访问函数A内部变量，这个函数B就是一个闭包。

    ```javascript
    function A() {
      let a = 1
      window.B = function() {
    		console.log(a)
    	}
    }
    A()
    B()
    ```

    有一种说法是函数嵌套函数，返回这个函数可以访问外层函数的变量，这个定义并没有很全面。

  - 事件

  - eventloop **

    - 通常结合promise、setTimeOut的问题

      - 浏览器为多进程应用程序
      - 一个进程有多个线程
      - JS是单线程的，通过事件队列达到异步调用的效果
      - JS分为同步任务和异步任务
      - 同步任务都在JS引擎线程中执行，形成一个执行栈（调用栈），执行栈采用的是后进先出的策略（LIFO）
      - 当调用栈清空，主线程空闲的时候，会将放入到任务队列中的事件依次推入到调用栈中执行。
      - 调用栈有大小，超出栈时会报错，就是我们平时所说的爆栈

    - 宏任务和微任务

      - 宏任务（Tasks）：每次调用栈调用的代码可以当作一个宏任务，包括

        - Javascript的所有代码
        - setTimerout
        - setInterval
        - I/O
        - UI render

        即通常上宿主环境提供的为宏任务

      - 微任务

        - Process.nextTick(Node)
        - Promise
        - MutationObserver

        即语言标准提供的为微任务

  - 原型链 

    - 原型：

      - **函数上的prototype属性，指向原型对象**，默认情况下，所有原型对象自动获得一个construction属性，指向与之关联的构造函数，**默认的constructor指向它本身**。原型对象除了自动获得的contructor属性外，**其余均继承自Object**
      - 调用构造函数生成的实例，其内部的[[prototype]]指针指向构造函数的原型，默认情况下**没有访问这个[[prototype]]特性的标准方法**，但是不同的浏览器中各自实现了。因此对象实例不能通过`.prototype`得到（为undefined），可以通过`Object.getPrototypeOf()`获得一个实例对象的原型，或者通过宿主环境提供的特殊属性。

      **概括来说既是：每个构造函数有一个prototype的原型对象，原型对象有一个contructor指回构造函数，而实例有一个内部指针[[prototype]]指向原型**

    - 原型链：**对象实例和原型形成的链条，即为原型链**

    - 正常的原型链**终止于`Object`的原型**

    - `Object`原型的原型是**`null`**

    - 对象实例上寻找属性和方式时，先找对象本身的属性和方法，再寻找原型链上的

    - 相关方法

      - `Object.getPrototypeof()`获得原型
      - `Person.prototype.isPrototypeof()`构造函数的原型是否是某个实例的原型

  - 继承 **

    **通过原型链获得属性和方法。**

    - ECMAScript的继承都是实例继承（很多语言都实现了接口继承和实例继承）

    - 继承方式

      - 原型链继承：改变原型指向另一个对象

      - 组合继承：通过子类调用`Parent.call(this)`继承父类的实例属性和方法，通过指定子类的原型为`new Parent()`继承父类的原型属性和方法

        ```javascript
        function Parent(name) {
          this.name = name
          this.colors = ['blue', 'red']
        }
        Parent.prototype.sayName = function() {
          return this.name
        }
        function Child(name) {
          Parent.call(this, name)
        }
        Child.prototype = new Parent()
        let child = new Child('Jim')
        child.colors // ['blue', 'red']
        child.sayName() // Jim
        ```

        - 缺点：子类原型通过调用父类来赋值，这样造成子类实例的属性和实例原型上有相同的一份属性，造成内存的浪费

      - 寄生组合式继承：优化掉组合继承的缺点即是寄生组合式继承。在赋值子类原型时只继承父类的原型，并且把contructor指向子类本身

        ```javascript
        function Parent(name) {
          this.name = name
          this.colors = ['blue', 'red']
        }
        Parent.prototype.sayName = function() {
          return this.name
        }
        
        function Child(name) {
          Parent.call(this, name)
        }
        Child.prototype = Object(Parent.prototype)
        child.prototype.constructor = Child
        ```

        

  - 模块化：es6模块化（ES Module），commonJS，

  - es6

    - var、let、const
    - 箭头函数

  - 设计模式 ** 

    *设计模式在另一篇文章*

- 性能优化

  - 图片懒加载 *

  - 前端缓存

  - 节流

    ```javascript
    function throll(fn, duration) {
      let now = 0;
      
    	return function() {
        if(Date.now() - now > duration) {
          now = Date.now()
          fn()
        }
      }
    }
    ```

  - 防抖

    ```javascript
    function debounce(fn, duration) {
      let timer = null
      return function() {
        clearTimerout(timer)
        timer = setTimeout(() => {
          fn()
        }, duration)
      }
    }
    ```

  - 预加载、预渲染

  - 懒加载、懒执行

  - CDN

  - 回流、重绘

- 浏览器

  - cookie、sessionStorage、localStorage
    - 相同点：
      - 都是同源。
      - 存储数据都是以字符串形式
    - 不同点：
      - cookie数据始终在同源http请求中携带，session和localStorage不会自动传给服务器。
      - cookie数据大小不能超过4k，localStorage、sessionStorage都比较大，可以保存5M的信息
      - sessionStorage不可以跨标签页，cookie和localStorage可以跨页同源共享。
      - sessionStorage页面会话关闭及失效，cookie过了设置时间后失效，localStorage需要手动清除
  - DOM
    - 事件委托
    - 回流、重绘
  - 从输入URL到渲染页面的过程 **
  - 安全防范
    - xss
    - CSRF
    - 点击劫持
    - 中间人攻击

- http

  - 常见状态码

  - 缓存

  - 请求方式及区别 **

    - 副作用

      副作用是指对服务器上的资源做改变，搜索是无副作用的，注册是有副作用的

    - 幂等性

      对同一操作发起的一次请求或多次请求结果是一致的，不会因为多次操作产生副作用。

    - get和post区别

      - 本质上get和post只是报文格式的不同，只是HTTP协议中的两种请求方式。

      - get多用于无副作用，幂等的场景；post多于副作用，不幂等的场景。

      - 根据浏览器，通常有

        - get请求可以被缓存，post不能（通过设置可以）

        - 编码类型不同

        - get根据浏览器不同参数有长度限制，post没有参数长度限制

        - get请求的参数在请求行可见，post的在body中（通常

          技术上来讲，get和post都可以添加body，不过不同浏览器会有不同的限制

  - 三次握手四次挥手及原因

    - 三次握手

      1. 客户端给服务端发送一个SYN报文，并指明客户端的初始序列号，此时客户端处于SYN_SEND 状态。

         第一次发送不能携带数据。**此时可以知道客户端的发送能力、服务端的接收能力没问题**

      2. 服务端收到客户端的SYN报文，会发送自己的SYN报文，指定自己的初始化序列号ISN，把客户端的ISN + 1作为ACK，此时服务端处于SYN_RCVD状态，

         **此时可以知道服务端的发送能力没问题**

         服务端发送SYN报文之后，就处于SYN_RCVD状态，双方还没有建立连接，服务器会把此中状态下的请求连接放在一个队列中，这个队列就是**半连接队列**，建立连接后的队列即为**全连接队列**。队列满了会发生丢包

         **SYN-ACK重传**：服务端发送完SYN-ACK包后，如果未收到客户端确认包，服务器会进行重传，重传间隔渐进

      3. 客户端收到服务端的SYN报文，会发送一个ACK报文，客户端进入ESTABLISHED状态，服务端收到报文后也会进入ESTABLISHED状态

         **此时可以知道客户端的接收能力没问题**

      - 为什么是三次握手：要确认双方的接收和发送能力都没问题。
      - 三次握手可以携带数据吗：第一二次不能携带数据，意在减少服务器收到攻击的可能，第三次已经建立连接，可以携带数据。
      - SYN攻击：**服务端资源分配是在第二次握手，客户端资源分配是在第三次建立连接后**，当大量伪造的SYN报文发送给服务端时，服务端给这些分配资源但是又得不到客户端的回应，就会造成这些伪造的连接请求占用半连接队列，正常的SYN报文因为半连接队列满而丢弃，从而引起网络拥堵甚至瘫痪。SYN攻击时一种典型的DoS/DDoS攻击

    - 四次挥手

      - 半连接：TCP连接提供了连接的一端在结束它的发送后还能接受来自另一端数据的能力
      - 由于**半连接**的缘故，TCP关闭连接需要发送四次包。而客户端和服务端均可以主动发起挥手动作。

      以客户端开始

      1. 客户端发送**连接释放报文**（FIN报文，包含一个序列号），进入FIN_WAIT1状态，等待服务端确认。
      2. 服务端收到释放报文后发送**确认报文**（ACK，客户端序列号+1的ACK），进入CLOSE_WAIT。此时TCP进入**半连接状态**
      3. 服务端所有数据发送完毕，发送**连接释放报文**（FIN报文），进入LAST_ACK状态，等待客户端确认
      4. 客户端收到连接释放报文后，发送**确认报文**（ACK），客户端进入TIME_WAIT状态。此时TCP未释放，在2MSL后客户端进入CLOSED状态

      如果是服务端主动挥手，则服务端需要进入进入TIME_WAIT状态。通常情况是客户端发起挥手，进入TIME_WAIT状态

      - 为什么挥手需要四次：当服务端收到FIN报文后，可能还需要传输数据不能立即关闭，此时需要先回复确认报文（ACK），等发送完毕才能发送FIN报文，故多了一次，需要四次挥手
      - MSL时间：Maximum Segment Lifetime，最大报文生存时间。
      - 2MSL等待的意义：
        - 保证客户端最后一个ACK报文能够到达服务端。当最后一个ACK报文丢失时，服务端会重传一个FIN+ACK报文，客户端重传一个ACK报文进入2MSL的等待状态。
        - 防止“已失效的连接请求报文段”出现在本连接中。客户端在2MSL时间段，可使本连接持续时间内产生的所有报文段从网络中消失，下一个新的连接中不会出现这种旧的连接请求报文段。

  - HTTP内容
    
    - **HTTP请求报文整体内容包括**
    
      - HTTP报文首部
        - 请求的报文首部
          - 请求行
          - 请求首部字段
          - 通用首部字段
          - 实体首部字段
          - 其他
        - 响应报文首部
          - 状态行
          - 响应首部字段
          - 通用首部字段
          - 实体首部字段
          - 其他
      - HTTP报文主体
    
    - 请求行/状态行
    
      - 可以区分请求方式
      - 状态
        - 常用状态码
          - 2XX
            - 200：成功
            - 204：请求成功，但响应报文没有实体主体部分
            - 206：进行范围请求
          - 3XX
            - 301：永久重定向
            - 302：临时重定向
            - 303：资源在另一个URL，应该用get请求
            - 304：允许访问，但请求未满足。如客户端发送请求被允许，但是请求内容没有改变，服务器返回304，从缓存中取出内容
          - 4XX
            - 400：请求报文语法错误
            - 401：发送的请求需要有通过HTTP验证的验证
            - 403：资源的访问被服务器拒绝
            - 404：没有找到资源
          - 5XX
            - 500：服务器执行请求时发生错误
            - 501：服务器不支持当前请求的某些功能
            - 503：服务器暂时处于超负载或正在停机维护
    
    - 首部：分请求和相应，他们两个有一些共同的首部字段
    
      - 通用字段
    
        - Cache-Control：缓存行为
    
          - 强缓存：控制字段为Cache-Control和Expires，Cache-Control优先级最高。Cache-Control设置max-age（Expires设置GMT时间格式，在时间内），如果在声明周期时间内命中缓存，返回200，
    
          - 协商缓存
    
            利用Last-Modified , If-Modified-Since 和 ETag , If-None-Match来实现，命中缓存返回304
    
        - Connection：浏览器想要优先使用的链接类型，如keep-alive
    
        - Date：报文创建时间
    
        - Pragma：报文指令
    
        - Via：代理服务器相关信息
    
        - Transfer-Encoding：传输编码方式
    
        - Upgrade：要求客户端升级协议
    
        - Warning：警告
    
      - 请求首部：只列了一部分
    
        - Accept：能正确接收的媒体内容
        - Accept-Charset：能正确接收的字符集
        - User-Agent：客户端信息
        - Range：请求某个内容的一部分
        - Referer：浏览器所访问的前一个页面
    
      - 相应首部
    
        - Accept-Ranges：是否支持某些种类的范围
        - Age：资源在代理缓存中存在的时间
        - ETag：资源标识符
        - Server：服务器名
        - 
    
    - 实体
    
      - 请求实体
        - 
      - 相应实体
    
  - 跨域

    - 协议域名端口不相同

    - 跨域解决方法

      - 代理

      - jsonp

        - 原理/执行过程

          - 前端定义解析函数

          - 通过 query string 的方式，包装到 script 标签的 src 属性上

          - 后端获取到参数，以执行函数的形式返回给前端

          - 前端得到返回后，由于是script，会执行解析函数

            ```html jsonp前端
            <script type='text/javascript'>
                window.jsonpCallback = function (res) {
                    console.log(res)
                }
            </script>
            <script src='http://localhost:8080/api/jsonp?id=1&cb=jsonpCallback' type='text/javascript'></script>
            ```

            ```javascript node后端
            const Koa = require('koa');
            const app = new Koa();
            const items = [{ id: 1, title: 'title1' }, { id: 2, title: 'title2' }]
            
            app.use(async (ctx, next) => {
              if (ctx.path === '/api/jsonp') {
                const { cb, id } = ctx.query;
                const title = items.find(item => item.id == id)['title']
                ctx.body = `${cb}(${JSON.stringify({title})})`;
                return;
              }
            })
            console.log('listen 8080...')
            app.listen(8080);
            ```

            

  - 七层结构

    - 

  - tcp/udp及区别

    - tcp
      - 需要建立连接：建立连接需要三次握手四次挥手
      - 可靠、有序：有解决数据丢包、顺序不对和流量控制的机制
      - 效率较低：tcp首部开销较大
      - 只能一对一
    - udp：
      - 面向无连接：不需要建立连接即可发送数据，也不会对数据做处理
      - 不可靠：没有阻塞控制，以恒定的速率发送数据，网络不好会发生丢包
      - 高效：udp的头部开销小
      - 传输方式：一对一，一对多，多对多，多对一，即单播，多播，广播的功能
      - 应用场景：直播，游戏

  - HTTP1/HTTP2
    - [关于网络相关](https://juejin.cn/post/6956046759428636708#heading-2)

    - http1.1和http2.0的主要区别

      - http1.1

        - 相较1.0版本，优化了长连接，并且默认使用长连接；强制客户端提供 Host 首部管线化；`Cache-Control`、`ETag`等缓存的相关扩展

        - 问题：

          - 线头阻塞：TCP 连接上只能发送一个请求，前面的请求未完成，后面的请求排队等待

          - 多个 TCP 连接

            http1.1 的管线化支持请求并发，但难实现，所以 http1.1 请求并发依赖于多个 TCP 连接，建立 TCP 连接成本相对较高，还存在慢启动。

          - 头部冗余

            每次请求都会带上cookie、user-agent等相同的首部信息

          - 采用文本可是

            内容传输采用文本格式，首部未压缩

      - http2.0

        - 二进制分层

          对传输数据进行二进制编码

          - 帧

            通信的基本单位。http2.0将一个通信分成了 HEADERS frame 和 DATA frame。

          - 流

            建立在 TCP 连接上的双向字节流，即多个帧组成一个流

            特定请求的帧只能在同一个流上，即一个流即一个请求

        - 多路复用

          所有连接通信（流）都在同一个 TCP 连接上，从而实现真正的并发，避免线头阻塞。

        - 头部压缩

          使用 HPACK 压缩格式对传输的 header 进行编码，在客户端和服务端保存维护同一个索引表，第一次需要传输完整的内容，后续只需要传输索引即可。

        - 服务端推送

          服务端预测客户端需要的资源，主动推送到客户端。（chrome 客户端废弃）

  - 从输入URL到渲染过程

    - 

- react

  - react

    - class 组件更新流程：

      组件更新流程主要分为两个阶段

      1. 调和阶段，主要体现在虚拟 DOM 的 diff 算法上
      2. 提交阶段，将 diff 阶段产生的结果应用到真实 DOM 上

      在调和阶段：

      1. state 或 props 改变，触发更新流程

      2. 执行生命周期的 `componentWillReceiveProps`

         这个生命周期函数的执行的先觉条件是

         1. props 前后有差别
         2. 没有使用 `getDerivedStateFromProps`和`getSnapshotBeforeUpdate`

         > 现版本中，`componentWillReceiveProps`官方已不推荐使用，因为在调和阶段可能会被打断，该函数会重新执行

      3. 执行`getDerivedStateFromProps`获取最新的 state

      4. 判断是否更新组件

         1. 是否使用了 `shouldComponentUpdate`函数，存在则调用
         2. 不存在则判断组件是否继承自 PureComponent，是则浅层比较前后 props 和 state 得出结果。

      5. 得出结果需要更新组件的话，调用 `componentWillUpdate`，然后处理`componentDidUpdate`及`getSnapshotBeforeUpdate`函数。

      6. 调用`render`函数获取到最新的 `child`，进行 diff 决定 `child`是否需要更新。

    - diff 过程

      diff 只会在相同的层级进行比较，新的 dom tree 对应层级不相同的话直接进行删除创建。在一次循环

      相同层级的比较

      ​	如果是 component 的话进行 dom tree 的比较，重复以上操作

      ​	如果不是形同的组件则直接销毁重新创建新组件。

  - redux

    - 核心

    - 三大原则：

      - 单一数据源：只存在唯一一个store

      - state是只读的：唯一改变state的方法是触发action

      - 使用纯函数来执行修改：为了描述action如何修改state，需要编写 reducer

        reducer接收state和action，返回新的state

    - 编写redux

      - 设计state结构

      - action

        - action约定有一个 type 属性表示执行的操作以及一个有效荷载。

      - action处理（reducer）

        - 开发 reducer：reducer作为纯函数，需要遵循一定的规则
          - 不能修改传入的参数
          - 不能执行有副作用的操作，入网络请求和路由跳转
          - 调用非纯函数，入 Date.now 或 Math.random

        ```javascript action
        import { createStore } from 'redux'
        
        const DEFAULT_STATE = {
          todoList: [
            {
              title: 'q2',
              id: '1'
            }
          ]
        }
        
        function addTodo(prevState) {
          return {
            ...prevState
            todoList: prevState.todoList.concate({title: '123e', id: '2'})
          }
        }
        
        const actions = {
          'addTodo': addTodo
        }
        function act(prevState, action) {
          let result = actions[action.type]?.(prevState) || {...prevState}
          
          return result
        }
        
        function reducer(prevState, action) {
          return act(prevState, action)
        }
        
        const store = createStore(reducer, DEFAULT_STATE)
        ```

      - `createStore(reducer, [preloadState], [enhancer])`：

        - reducer
        - preloadState：默认的state，redux在初始化过程中会进行一次dispatch，将reducer中的state进行关联，取得默认值，覆盖掉参数默认值。如果省略了 preloadState，直接添加 enhance，redux 内部会自动识别。
        - Enhancer：增强，可以增强redux的功能。
          - enhancer 需要返回一个 返回函数的 函数，enhancer 的执行决定 `enhancer(createStore)(reducer, preloadedState)`

      - `combineReducers`：多个 reducer 拼装。

        - 使用combineReducers之后，reducer必须返回一个新值，reducer的返回值必须是一个非 undefined 的值。（源码中初次调用 reducer 时传入了undefined）。

          > combineRedcers 函数内部有undefined和未匹配action的检测。

      - applyMiddleware(...middlewares)

        - redux提供的将传入的中间件按照顺序注册的原生函数，注册的中间件将会按照顺序执行

          applyMiddleware 执行后会形成一个洋葱模型，第一个 middleware 在最外层。

          源码位置👉`funcs.reduce((a, b) => (...args) => a(b(...args)))`

          <img src="https://tva1.sinaimg.cn/large/008i3skNly1grlf3u5myaj30d20chwer.jpg" style="zoom:50%;" />

          每次执行 action 时，都会从第一个/最外层 执行。每一层都会接受下一层的返回，最后一层则会接收 store.dispatch

        - middleware：通过 `applyMiddleware` 注册的中间件都会接收一个包含 `getState`和`dispatch`的参数，返回值是一个函数，这个函数接收一个 `next`的参数，next 指向下一个中间件的 `dispatch`，最后一个中间件则是 `store.dispatch`，这个函数需要返回

      - store

        - `getState`：获取最新的 State
        - `dispatch`：分发一个action，返回值为action
        - `subscribe`：注册监听器
          - subscribe返回一个函数注销监听器
        - `replaceReducer`：使用新的 reducer 取代原来 reducer

        ```jsx store
        import React, {useState, useEffect} from 'react'
        import store from './store'
        
        export default function Index() {
          const [todoList, setTodoList] = useState(store.getState().todoList)
          
          useEffect(() => {
            const unsubscribe = store.subscribe(() => {
              setTodoList(store.getState().todoList)
            })
            return () => {
              unsubscribe()
            }
          }, [])
          const addTodo = () => {
            store.dispatch({
              type: 'addTodo',
              payload: ''
            })
          }
          return <div>
            {todoList.map(item => <span></span>)}
          </div>
          <button onClick={addTodo}>add</button>
        }
        ```
        
      - 异步action：middleware接管

        我们可以通过包装dispatch，达到异步效果。

        通过包装 dispatch 的方法就是 middleware 的内容。

        [middleware实现](https://www.cntofu.com/book/4/docs/advanced/Middleware.md)

        👆middleware 的模拟实现过程

        

        middleware的作用就是**接管从dispatch一个action到执行reducer之间的过程**，期间可以进行有副作用的操作。

        

        - 使用 `redux-thunk`执行异步action：注册 `redux-thunk`中间件后，可以执行 function 类型的action，thunk没有做其他额外操作

          使用 thunk 后，如果 action 是 function 执行 function，如果是一个对象，使用 `store.dispatch`分发这个对象。

        ```javascript 异步action
        // createStore
        import { createStore, applyMiddleware } from 'redux'
        import thunk form 'redux-thunk'
        
        const store = createStore(reducer, DEFAULT_STATE, applyMiddleware(thunk))
        
        // action 改造actions
        export function actionCreator(action) {
          const actions = {
            'addTodo': (payload) => (dispatch, getState) => {
              dispatch({
                type: 'addTodo',
                payload: ''
              })
            }
          }
          
          return actions[action.type](action.payload)
        }
        
        // 组件 修改 addTodo 函数
        import { actionCreator } from 'action'
        const addTodo = () => {
          dispatch({
            type: 'addTodo',
            payload: ''
          })
        }
        ```

        - `redux-saga`：用于管理 redux 的一步操作的中间件，redux-saga 通过创建 sagas 将所有的一步逻辑收集在一个地方，集中处理

          - 相比 redux-thunk 的在 action 创建时调用，saga 在应用启动时调用，后监听发起的 action，相当于应用启动了一个后台线程，当匹配到有 action 时，执行相应的操作。

            ```javascript saga.js
            import { takeEvery, select, all, delay, put} from 'redux-saga/effects'
            function* helloSaga() {
              console.log('Hello saga')
            }
            function* increseAsync() {
              yield takeEvery('INCRESE_ASYNC', function*() {
                yield delay(1000)
                const data = yield select(state => state)
                yield put({
                  type: 'update',
                  payload: data + 1
                })
              }
            }
            
            export default function* rootSaga() {
              yield all([
                helloSaga(),
                increseAsync()
              ])
            }
            ```

            ```javascript createStore.js
            import { createStore, applyMiddleware } from 'redux'
            import createSagaMiddleware from 'redux-saga'
            import reducer from './reducer'
            import rootSaga from './saga'
            
            const sagaMiddleware = createSagaMiddleware();
            const store = createStore(reducer, applyMiddleware(sagaMiddleware));
            sagaMiddleware.run(rootSaga)
            
            ```

            ```javascript 使用
            // 组件内
            handler = () => {
              dispatch({
                type: 'INCRESE_ASYNC'
              })
            }
            
            // reducer 的actions
            export default funciton(action) {
            	switch(action.type) {
                case 'update':
                  return action.payload
                default:
                  return 0
              }
            }
            
            // 组件内 dispatch 一个 action 后，saga 匹配到此 action 并经过处理后发出 reducer 的action 修改 state
            ```

            

    - 结合 react-redux

      - react-redux 是 redux 作者编写的适用于 react 的库。

      - react-redux 的规范，就是应用分为容器组件和UI组件，容器组件负责数据和业务逻辑，不负责 UI 呈现，且内部有状态（redux 的 state），可以使用 redux 的api；容器组件负责 UI 的呈现，所有数据由外部提供，不使用 redux 的 API。

      - API

        - connect：高阶组件

          - 通过 connect 包裹的组件，会生成一个容器组件，connect 的意思就是把容器组件和 UI 组件连接起来。
          - mapStateToProps：connect 接收的第一个参数，此函数接收 store 的 state 和 组件的 props，需要返回一个对象，映射到 UI 组件的 props 上
          - mapDispatchToProps：connect 接收的第二个参数，如果是参数，此函数接收一个 store.dispatch 和组件的 props，返回一个方法组成的对象映射到组件的 props 上；如果此参数是对象，则对象的值必须是一个 actionCreator 的函数`(...args) => ({type: ''})`

        - Provider

          通过 Provider 包裹的组件内部会得到 store。

  - mobx

    

  - typescript

    - 范型：在定义的时候不制定特定类型，而在使用的时候再制定类型。通过使用**类型变量**，达到输入与输出同类型的情况

      - 为什么要使用范型：

    - void和undefined、null的：

      函数没有返回值时可以用void，undefined时变量的类型，不能是函数的返回值。

      undefined时所有类型的子集，而void不是。

  - setState的同步异步

    - 合成事件和钩子函数中是“异步”，原生事件和setTimeout中是“同步”
    - “异步”并不是内部用异步来实现，而是合成事件和钩子函数的调用顺序在更新之前，导致合成事件和钩子函数拿不到最新的state值
    - setState的批量更新优化建立在“异步”（合成事件和钩子函数）中，在原生事件和setTimeout中不会批量更新。批量更新策略中若对同一个值进行多次setState会进行覆盖，取最后一次执行，若进行多次不同值的setState则会合并。

  - HOC高阶组件

    - 包装组件的高阶组件

      ```jsx
      class Index extends React.Component {
        render() {
          return <div>hello, world</div>
        }
      }
      
      function HOC(Component) {
        return class WrapComponent extends React.Component {
          state = {}
          render() {
            return <Component {...props} {...this.state}/>
          }
        }
      }
      ```

    - 继承组件的高阶组件

      ```jsx
      class Index extends React.Component {
        render() {
          return <div>hello, world</div>
        }
      }
      
      function HOC(Component) {
        return class WrapComponent extends Component {
         
        }
      }
      ```

      

- webpack

  - webpack作用

    分析项目结构，处理模块依赖进行模块打包，转换成浏览器可运行的代码。

    - 代码转换：typescript转为JavaScript，less、scss转css
    - 文件优化：压缩js、html、css代码
    - 代码分割
    - 模块合并
    - 自动刷新

  - loader和plugin

    - loader用于编译、处理文件，loader的使用配置在modules中，可以有多个loader
    - plugin扩展webpack的功能，针对的是loader处理后的webpack整个处理过程。plugin并不知节操作文件，而基于事件机制，监听webpack打包过程中某些节点执行任务。plugin配置在plugin中。plugin一般来说是一个构造器，放入构造的实例即可

    **loader是文件转换器，plugin是扩展器**。

  - loader执行顺序

    loader放在数组中时，从有到左执行

  - 编写一个loader和plugin

    - loader模块需要导出为一个模块，函数接收上一个处理结果或资源文件（source file），然后需要返回一个处理结果

      接收的唯一一个参数为资源文件。

      loader模块函数可以分为同步和异步。

      ```javascript 一个最简单的loader
      module.exports = function(source) {
        return source.replace('aaa', this.query.name)
      }
      ```

      

    - plugin

      具有`apply`方法的原型的的构造函数，基本结构是

      - 一个构造函数
      - 原型上定义apply方法
      - 绑定到webpack自身的钩子函数中
      - 处理webpack内部实例的特定数据
      - 完成后调用webpack提供的回调

      ```javascript plugin模式
      // 一个 JavaScript 命名函数。
      function MyExampleWebpackPlugin() {};
      
      // 在插件函数的 prototype 上定义一个 `apply` 方法。
      MyExampleWebpackPlugin.prototype.apply = function(compiler) {
        // 指定一个挂载到 webpack 自身的事件钩子。
        compiler.plugin('webpacksEventHook', function(compilation /* 处理 webpack 内部实例的特定数据。*/, callback) {
          console.log("This is an example plugin!!!");
      
          // 功能完成后调用 webpack 提供的回调。
          callback();
        });
      };
      ```

      

  - webpack分包加载

    

  - tree shaking：剔除未被引用代码

    tree shaking基于ES6的import实现，依赖于ES6的模块特性

    - ES6 module特性：

      - 只能作为顶层语句出现
      - import 的模块名只能是字符串常量
      - import binding 是不变的

      > ES6 的模块依赖关系是确定的，和运行时状态无关，可以进行可靠的静态分析，这就是 tree shaking 的基础。

    - tree shaking需要注意的地方：

      - tree shaking不会清除IIFE（立即调用函数）

        IIFE在解析时才会执行，webpack不会进行程序流分析，不知道IIFE内部执行什么操作，故不会清除IIFE。如果IIFE执行得到的结果没有被引用，依然会被清除。

      - webpack的 production 模式下自动开启 tree shaking

      - babel的问题：babel会对ES6模块进行转译，将 `export`结合`require`的形式，致使 tree shaking失效，我们需要对babel处理，不对模块进行进行处理

        ```javascript
        // babel.rc
        presets: [[
          "env": {module: fasle}
        ]]
        ```

        

      - webpack tree shaking对第三方的使用

        - lodash

          ```javascript
          import _ from 'lodash'
          
          import { map } from 'lodash' // <-这种引入方式会全量打包
          
          import map from 'lodash/map' // <- 这种引入方式按需打包
          ```

    - css tree shaking

    - js tree shaking

  - 多入口/出口

    ```javascript
    entry: {
      entry1: '../src/entry1.js',
      entry2: '../src/entry2.js'
    }
    
    output: {
      
    }
    ```

    

  - hmr

  - dev server

  - 优化
    - 打包速度：
      - DllPlugin：将特定的类库提前打包后引入，减少类库打包次数，只有类库版本更新后才需要重新打包，并且实现将公共代码抽离的目的
      - 优化loader：`exclude`和`include`限定，优化搜索范围
      - HappPack：采用多线程打包

    - 打包体积（加快下载速度
      - 按需加载：
      - spa项目实现按需加载，大型类库的按需加载（antd、lodash）
      - Tree shaking：删除代码中未被引用的代码
      - 代码压缩：`UglifyJS`
    
    > 但是，webpack4开始，很多优化就已经默认开启，不需要去特定配置。

- project

- 虚拟列表实现（长数据列表的渲染优化）

