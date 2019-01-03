---
title: 记事
tags: tag
notebook: other
---
- put
- delete
- autocomplete

- REACT review
    - react 生命周期及钩子函数
        1. componentsWillMount()
        > 之后执行 render()
        2. componentDidMount()
        > 之后进入运行阶段
        3. 运行阶段
            1. componentWillReceiveProps()
            2. shouldComponentUpdate()
            > 函数返回true，继续下面的流程，组件更新；函数返回false，组件不更新
            3. componentWillUpdate()
            4. render()组件重新render
            5. componentDidUpdate() 组件更新完成
        4. 组件卸载，componentWillUnmount()