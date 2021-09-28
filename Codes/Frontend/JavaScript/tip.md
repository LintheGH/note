---
title: JavaScript 相关注意点⚠️
categories: 
- Code
- JavaScript
tags: 
- tips
notebook: JavaScript
---

- 对象

  - 对象键值

    ```javascript
    const a = {}
    const b = { key: 'b' }
    const c = { key: 'c' }
    
    a[b] = 123
    a[c] = 456
    
    console.log(a[b]) // 456
    ```

    > 在设置对象属性的时候，键必须为一个字符串，而当对象转为字符串时，变成 "[object Object]"故而发生的覆盖，输出456

- `setTimeout`：setTimeout(function[, delay, arg1, arg2...])

  - function：延迟执行的函数
  - delay：延迟毫秒数
  - arg1, arg2...：附加参数，作为参数传给延迟执行的函数



- `void`运算符

  对给定对表达式进行求值，然后返回 undefined

  通常只用于获取 undefined 的原始值，一般为`void(0)`，等同与`void 0`

  - 避免不确定的返回值

    ```javascript
    function foo() {
    	return 123
    }
    function bar() {
    	// const a = foo() // a 期望为一个undefined值
      const a = void foo() // 使用void运算符来避免foo的副作用
    }
    ```

    