---
title: 前端模块化
tags: modul, AMD, CommonJS
notebook: other
---

### `Modular design` (模块化设计)
[原文](https://juejin.im/post/5cb9e563f265da03712999e8?utm_source=gold_browser_extension)
---
#### `IIFE`:
> IIFE: 即`Immediately Invoked Function Expression`，立即执行匿名函数
- 通过立即执行匿名函数，防止全局变量污染，达到最基本的模块化编程（文件的引入）

#### `CommonJS`
> 在浏览器之外，为 `JavaScript` 建立模块生态系统的一套通用规范，规定一个普遍接受的 JavaScript 模块单元形式
> 与之对应的，有不同的实现：其中就包括 `Node.js`
![CommonJS实现](https://user-gold-cdn.xitu.io/2019/4/20/16a3b3beb0c6d07a?imageslim)
- `CommonJS` 的实现简单原理
    - `CommonJS` 实现的简单示例：
        ```JavaScript
        var module = {
            exports: {}
        };

        (function(module, exports) {
            exports.multiply = function (n) { return n * 1000 };
        }(module, module.exports))

        var f = module.exports.multiply;
        f(5) // 5000 
        ```
    - node.js Modules 中的 `require` 实现简单原理
        ```JavaScript
        function require(/* ... */) {
            const module = { exports: {} };
            ((module, exports) => {
                // Module code here. In this example, define a function.
                // 模块代码在这里，在这个例子中，我们定义了一个函数
                function someFunc() {}
                exports = someFunc;
                // At this point, exports is no longer a shortcut to module.exports, and
                // this module will still export an empty default object.
                // 当代码运行到这里时，exports 不再是 module.exports 的引用，并且当前的
                // module 仍旧会导出一个空对象(就像上面声明的默认对象那样)
                module.exports = someFunc;
                // At this point, the module will now export someFunc, instead of the
                // default object.
                // 当代码运行到这时，当前 module 会导出 someFunc 而不是默认的对象
            })(module, module.exports);
            return module.exports;
        }
        ```
        
        
