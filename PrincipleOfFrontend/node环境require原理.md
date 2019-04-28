---
title: require的实现原理
tags: node, require
notebook: other
---

### required实现原理
> node 的模块绝大部分使用 `CommonJS` 标准的格式

[参考](http://www.ruanyifeng.com/blog/2015/05/require.html)
[源码](https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js)
- Module 构造函数
    ```javascript
    function Module(id, parent) {
        this.id = id;
        this.exports = {};
        this.parent = parent;
        this.filename = null;
        this.loaded = false;
        this.children = [];
    }

    module.exports = Module;

    var module = new Module(filename, parent);
    ```
    每个模块实际上是一个实例，而`require`方法实际上是实例的一个原型方法

- require 实例方法
    ```javascript
    Module.prototype.require = function(path) {
        return Module._load(path, this);
    };
    ```
    从此可以看出, require 方法是实例的一个方法，执行此方法要在模块中

    - `Module._load` 方法
        ```javascript
        Module._load = function(request, parent, isMain) {

            //  计算绝对路径
            var filename = Module._resolveFilename(request, parent);

            //  第一步：如果有缓存，取出缓存
            var cachedModule = Module._cache[filename];
            if (cachedModule) {
                return cachedModule.exports;

            // 第二步：是否为内置模块
            if (NativeModule.exists(filename)) {
                return NativeModule.require(filename);
            }

            // 第三步：生成模块实例，存入缓存
            var module = new Module(filename, parent);
            Module._cache[filename] = module;

            // 第四步：加载模块
            try {
                module.load(filename);
                hadException = false;
            } finally {
                if (hadException) {
                delete Module._cache[filename];
                }
            }

            // 第五步：输出模块的exports属性
            return module.exports;
        };
        ```