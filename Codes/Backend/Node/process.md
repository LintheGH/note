---
title: node的process进程对象
categories: 
- Code
- Node
tags: 
- node process
---

### `process`是node的一个全局对象，它提供当前node.js进程的信息并对其进行控制。

  > 它始终存在，无需`require()`，但也可以显式配置`const process = require('process')`

  #### 相关的属性和方法

  - `argv`: 一个数组。其中包含当启动 Node.js 进程时传入的命令行参数。 第一个元素是 process.execPath。 如果需要访问 argv[0] 的原始值，参阅 process.argv0。 第二个元素将是正在执行的 JavaScript 文件的路径。 其余元素将是任何其他命令行参数。

    > 第一个参数其实就是系统中node执行文件的路径， 第二个就是所执行的文件，其余为执行文件时传入的参数（如--config config/webpack.dev.js)