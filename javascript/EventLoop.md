---
title: JavaScript的EventLoop
tags: JavaScript, EventLoop
notebook: JavaScript
---

### JavaScript 的 `Task`和`MicroTask`

  在JavaScript中任务分 宏任务（MacroTask）也叫 Task ，和微任务（MicroTask）

  - Task:
    - JavaScript的所有代码
    - setTimeout
    - setInterval
    - I/O
    - UI Rendering
  
  - MicroTask
    - Process.nextTick（Node独有）
    - Promise
    - MutationObserver[查看](https://javascript.ruanyifeng.com/dom/mutationobserver.html)
    - Object.observe(废弃)

  > 宿主环境提供的为宏任务，如setTimeout;语言标准提供的为微任务，如Promise；以此为记忆标准

### 浏览器中的 Event Loop

  JavaScript 中有 `main thread`（主线程） 和 `call-stack`（调用栈）， 所有的任务都会被放入调用栈等待调用

  #### `thread`线程

  - cpu、进程、线程

    进程就好比工厂的车间，它代表CPU所能处理的单个任务。 进程之间相互独立，任一时刻，CPU总是运行一个进程，其他进程处于非运行状态。 CPU使用时间片轮转进度算法来实现同时运行多个进程。

    线程就好比车间里的工人，一个进程可以包括多个线程，多个线程共享进程资源。

    > `进程`是cpu资源分配的最小单位

    > `线程`是cpu调度的最小单位

    > 不同线程可通信（代价较大

    > `单线程`和`多线程`，是指在一个进程中的线程数
    
  - javascript是单线程的，通过异步避免阻塞

  #### JavaScript 调用栈

  调用栈采用的是后进先出`LIFO`(Last In Last Out)的规则， 当函数执行的时候，会创建一个执行上下文添加到栈的最顶端，当执行栈执行完后从栈移出，直到整个栈被清空

  > 调用栈空间是有限的，当调用栈中存有过多的函数而且没有释放时，就会出现爆栈`Maximum call stack size exceeded`的报错

  ```JavaScript
  let a = 'hello world'
  function first(params) {
    console.log('run first function');
    second()
    console.log('run first function again');
  }
  function second(params) {
    console.log('run second function');
    
  }
  first() 
  console.log('global');
  ```
  整个输出的结果为
  ```
  hello world
  run first function
  run second function
  run first function again
  global
  ```

  #### 同步任务和异步任务

  JavaScript的单线程任务分为同步任务和异步任务，同步任务会在调用栈中按照顺序等待主线程**依次执行**，异步任务会在异步任务有了结果后，将注册的回调函数放入任务队列中等待**主线程空闲的时候（调用栈被清空）**，被读取到栈内等待主线程执行。

  #### 例子

  ```javascript
  console.log('script start');

  setTimeout(function() {
    console.log('setTimeout');
  }, 0);

  Promise.resolve().then(function() {
    console.log('promise1');
  }).then(function() {
    console.log('promise2');
  });
  console.log('script end');
  ```
  执行输出：
  ```
  script start
  script end
  promise1
  promise2
  setTimeout
  ```
  ![event-loop](https://github.com/LintheGH/images/blob/master/note/event-loop1.gif)

  ##### 进阶

  ```HTML
    <div class="outer">
      <div class="inner"></div>
    </div>
  ```

  当点击 `inner` 时，会发生什么

  ```javascript
  var outer = document.querySelector('.outer')
  var inner = document.querySelector('.inner')

  new MutationObserver(function() {
    console.log('mutate')
  }).observe(outer, {
    attributes: true
  })

  function onClick() {
    console.log('click')

    setTimeout(() => {
      console.log('timeout')
    }, 0);

    Promise.resolve().then(function() {
      console.log('promise')
    })

    outer.setAttribute('data-random', Math.random())
  }

  outer.addEventListener('click', onClick)
  inner.addEventListener('click', onClick)
  ```

  输出

  ```
  click
  promise
  mutate
  click
  promise
  mutate
  timeout
  timeout
  ```

  ![event-loop](https://github.com/LintheGH/images/blob/master/note/event-loop2.gif)

  > 这里冒泡阶段还是属于 inner 的 click 的处理，虽然调用栈 Stack 清空，这个 Task 并没有完成


  ##### 进阶2

  当执行 `inner.click()` 会发生什么

  输出

  ```
  click
  click
  promise
  mutate
  promise
  timeout
  timeout
  ```

  ![event-loop](https://github.com/LintheGH/images/blob/master/note/event-loop3.gif)

  > 当第一次 `click` 执行完后，调用栈 `Stack `并没有清除，此时不能执行微任务 `MicroTask`

  > `MutationObserver` 并没有执行两此，因为上次的执行还在 `pendding` 状态中

  #### `async await`和`event-loop`

  首先简单了解`async await`到底干了什么

  - `async`

    **一句话概括： 带 async 关键字的函数，它使得你的函数的返回值必定是 promise 对象**

    - 如果 `async` 关键不是返回`primise`，会自动用`Promise.resolve()`包裹
    - 如果`async`关键字函数显示地返回`promise`，就以函数返回的`promise`为准
    
    ```javascript
    async function fn1() {
      return 123
    }
    async function fn2() {
      return new Promise(function(){})
    }
    console.log(fn1()) // Promise {<resolved>: 123}
    console.log(fn2()) // Promise {<pending>}
    ```
    
  - `await`

    **一句话概括： await等的是右侧「表达式」的结果**

    - 如果右侧是函数，那么函数的`return`值就是整个`await`表达式的结果
    - 如果右侧是表达式，那么整个`await`就是这个表达式的结果

    ```javascript
    async function fn1() {
      let result = await 'hello'
      console.log(result) // hello
    }
    
    // 
    function fn2() {
      return Promise.resolve(123)
    }
    async function async1() {
      let result = await fn2()
      console.log(result) // 123
    }
    ```

    - 这里`await`等待的结果，会根据是否是`promise`对象而有不同的处理

      - `promise`对象
    
        阻塞后面的代码，跳出`async`中的代码，执行外面的同步代码。完成后回到`async`内部，再把这个结果，作为`await`表达式的结果
      
      - 非`promise`对象
      
        阻塞后面的代码，跳出`async`中的代码，执行外面的同步代码。完成后回到`async`内部，等待`promise`对象`fulfilled`,然后把`resolve`的结果最为`await`表达式的 结果
      
        > 从这部分说， `await`达式的运行，是从右边到左，先执行`await`后面的表达式，而并非直接跳出`async`函数






