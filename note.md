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
            2. shouldComponentUpdate(nextProps, nextState)
            > 函数返回true，继续下面的流程，组件更新；函数返回false，组件不更新
            3. componentWillUpdate()
            4. render()组件重新render
            5. componentDidUpdate() 组件更新完成
        4. 组件卸载，componentWillUnmount()


- DVA 
    - 项目中数据处理顺序
        1. 在组件中通过this.props.dispatch函数分发一个action
            action的形状如:{
                type: 'indexModels/test', // page页面的models中的indexModels中的test方法
                payload: {} // 需要传递过去的荷载
            }
            
        2. 在models中的effects（dva中的异步处理方法的对象）中定义有test的generator函数（基于redux-saga），所有定义在effects中的函数会接受到两参数，第一个为一个action（即组件中dispatch过来的action），第二个为dva提供的effect函数内部的处理函数的对象，通常使用call（执行异步处理,传入两个参数，第一个为执行的函数，第二个为传入执行函数的参数），put（发出一个action，类似于dispatch）,select（获取全局state，传入一个函数，函数接受全局state，可以state.modelName获取到其他page中的models中的数据）

        3. effects中函数的put方法dispatch一个action，调用models中的reducers，action依然是类似的形状{type: 'test', payload: payload}

        4. dva 通过models中对应的reducers去改变state

        5. 在组件中通过mapStateToProps()函数映射models中的state到组件中的props中即可，通过dispatch一个action去改变models的state，即可改变组件view

    - API
        1. 

- umi： roadho + 路由
    - pages目录下文件即为路由
    - 通过注释配置路由（在约定是路由中有效）
        ```javascript
            /**
             * title: index page
             * Routes: 
             * - ./src/index/a.js
             * - ./src/index/b.js
            **/
           // 生成：
           [
                { path: '/', component: './index.js',
                    title: 'Index Page',
                    Routes: [ './src/a.js', './src/b.js' ],
                },
            ]
        ```
