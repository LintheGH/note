---
title: ES6
tags: ES6, javascript
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
### `...`运算符
- `...option` 作为函数中的形参时，option 是一个数组，接收多个参数
    ```javascript
    // 定义
    let fn = function (param, ...option) {
        return option
    }
    // 调用
    fn('a', 'b', 'c')// 结果为 ['b', 'c']
    ```

### `::`运算符
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