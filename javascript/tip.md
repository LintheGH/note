---
title: 常用技巧
tags: tips, javascript
notebook: JavaScript
---


### JavaScript 常用技巧

- `,` 逗号运算符：分隔表达式，返回链最后的表达式
  ```javascript
    const lb = (a, b, arr) => (arr.push(a*b), a*b) 
    lb(3,3, []) // 返回9， arr推进了一个9
  ```

