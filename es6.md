## ES6 model 模块语法
---
[TOC]
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
