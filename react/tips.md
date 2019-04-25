---
title: react 小tips
tags: react, framework
notebook: framework
---
### 开发中发现的小技巧/注意事项
---
- `getDerivedStateFromProps` 钩子函数

    `getDerivedStateFromProps` 钩子函数存在时，不会执行 `componentWillMount` 钩子函数， 这个钩子函数在每次 `render` 执行前都会执行，因此通过`getDerivedStateFromProps`更新的state中的属性不会在接收属性的组件中通过自身的`setState`更新，state 中的属性值跟传递过来的属性值保持一致