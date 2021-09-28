---
title: redux
date: 2021/6/28 10:24
categories: 
- Code
- React
tags: 
- React
notebook: React
---


<!--more-->

- redux

    - 核心

    - 三大原则：

      - 单一数据源：只存在唯一一个store

      - state是只读的：唯一改变state的方法是触发action

      - 使用纯函数来执行修改：为了描述action如何修改state，需要编写 reducer

        reducer接收state和action，返回新的state

    - 编写redux

      - 设计state结构

      - action

        - action约定有一个 type 属性表示执行的操作以及一个有效荷载。

      - action处理（reducer）

        - 开发 reducer：reducer作为纯函数，需要遵循一定的规则
          - 不能修改传入的参数
          - 不能执行有副作用的操作，入网络请求和路由跳转
          - 调用非纯函数，入 Date.now 或 Math.random

        ```javascript action
        import { createStore } from 'redux'
        
        const DEFAULT_STATE = {
          todoList: [
            {
              title: 'q2',
              id: '1'
            }
          ]
        }
        
        function addTodo(prevState) {
          return {
            ...prevState
            todoList: prevState.todoList.concate({title: '123e', id: '2'})
          }
        }
        
        const actions = {
          'addTodo': addTodo
        }
        function act(prevState, action) {
          let result = actions[action.type]?.(prevState) || {...prevState}
          
          return result
        }
        
        function reducer(prevState, action) {
          return act(prevState, action)
        }
        
        const store = createStore(reducer, DEFAULT_STATE)
        ```

      - `createStore(reducer, [preloadState], [enhancer])`：

        - reducer
        - preloadState：默认的state，redux在初始化过程中会进行一次dispatch，将reducer中的state进行关联，取得默认值，覆盖掉参数默认值。如果省略了 preloadState，直接添加 enhance，redux 内部会自动识别。
        - Enhancer：增强，可以增强redux的功能。
          - enhancer 需要返回一个 返回函数的 函数，enhancer 的执行决定 `enhancer(createStore)(reducer, preloadedState)`

      - `combineReducers`：多个 reducer 拼装。

        - 使用combineReducers之后，reducer必须返回一个新值，reducer的返回值必须是一个非 undefined 的值。（源码中初次调用 reducer 时传入了undefined）。

          > combineRedcers 函数内部有undefined和未匹配action的检测。

      - applyMiddleware(...middlewares)

        - redux提供的将传入的中间件按照顺序注册的原生函数，注册的中间件将会按照顺序执行

          applyMiddleware 执行后会形成一个洋葱模型，第一个 middleware 在最外层。

          源码位置👉`funcs.reduce((a, b) => (...args) => a(b(...args)))`

          <img src="https://tva1.sinaimg.cn/large/008i3skNly1grlf3u5myaj30d20chwer.jpg" style="zoom:50%;" />

          每次执行 action 时，都会从第一个/最外层 执行。每一层都会接受下一层的返回，最后一层则会接收 store.dispatch

        - middleware：通过 `applyMiddleware` 注册的中间件都会接收一个包含 `getState`和`dispatch`的参数，返回值是一个函数，这个函数接收一个 `next`的参数，next 指向下一个中间件的 `dispatch`，最后一个中间件则是 `store.dispatch`，这个函数需要返回

      - store

        - `getState`：获取最新的 State
        - `dispatch`：分发一个action，返回值为action
        - `subscribe`：注册监听器
          - subscribe返回一个函数注销监听器
        - `replaceReducer`：使用新的 reducer 取代原来 reducer

        ```jsx store
        import React, {useState, useEffect} from 'react'
        import store from './store'
        
        export default function Index() {
          const [todoList, setTodoList] = useState(store.getState().todoList)
          
          useEffect(() => {
            const unsubscribe = store.subscribe(() => {
              setTodoList(store.getState().todoList)
            })
            return () => {
              unsubscribe()
            }
          }, [])
          const addTodo = () => {
            store.dispatch({
              type: 'addTodo',
              payload: ''
            })
          }
          return <div>
            {todoList.map(item => <span></span>)}
          </div>
          <button onClick={addTodo}>add</button>
        }
        ```
        
      - 异步action：middleware接管

        我们可以通过包装dispatch，达到异步效果。

        通过包装 dispatch 的方法就是 middleware 的内容。

        [middleware实现](https://www.cntofu.com/book/4/docs/advanced/Middleware.md)

        👆middleware 的模拟实现过程

        

        middleware的作用就是**接管从dispatch一个action到执行reducer之间的过程**，期间可以进行有副作用的操作。

        

        - 使用 `redux-thunk`执行异步action：注册 `redux-thunk`中间件后，可以执行 function 类型的action，thunk没有做其他额外操作

          使用 thunk 后，如果 action 是 function 执行 function，如果是一个对象，使用 `store.dispatch`分发这个对象。

        ```javascript 异步action
        // createStore
        import { createStore, applyMiddleware } from 'redux'
        import thunk form 'redux-thunk'
        
        const store = createStore(reducer, DEFAULT_STATE, applyMiddleware(thunk))
        
        // action 改造actions
        export function actionCreator(action) {
          const actions = {
            'addTodo': (payload) => (dispatch, getState) => {
              dispatch({
                type: 'addTodo',
                payload: ''
              })
            }
          }
          
          return actions[action.type](action.payload)
        }
        
        // 组件 修改 addTodo 函数
        import { actionCreator } from 'action'
        const addTodo = () => {
          dispatch({
            type: 'addTodo',
            payload: ''
          })
        }
        ```

        - `redux-saga`：用于管理 redux 的一步操作的中间件，redux-saga 通过创建 sagas 将所有的一步逻辑收集在一个地方，集中处理

          - 相比 redux-thunk 的在 action 创建时调用，saga 在应用启动时调用，后监听发起的 action，相当于应用启动了一个后台线程，当匹配到有 action 时，执行相应的操作。

            ```javascript saga.js
            import { takeEvery, select, all, delay, put} from 'redux-saga/effects'
            function* helloSaga() {
              console.log('Hello saga')
            }
            function* increseAsync() {
              yield takeEvery('INCRESE_ASYNC', function*() {
                yield delay(1000)
                const data = yield select(state => state)
                yield put({
                  type: 'update',
                  payload: data + 1
                })
              }
            }
            
            export default function* rootSaga() {
              yield all([
                helloSaga(),
                increseAsync()
              ])
            }
            ```

            ```javascript createStore.js
            import { createStore, applyMiddleware } from 'redux'
            import createSagaMiddleware from 'redux-saga'
            import reducer from './reducer'
            import rootSaga from './saga'
            
            const sagaMiddleware = createSagaMiddleware();
            const store = createStore(reducer, applyMiddleware(sagaMiddleware));
            sagaMiddleware.run(rootSaga)
            
            ```

            ```javascript 使用
            // 组件内
            handler = () => {
              dispatch({
                type: 'INCRESE_ASYNC'
              })
            }
            
            // reducer 的actions
            export default funciton(action) {
            	switch(action.type) {
                case 'update':
                  return action.payload
                default:
                  return 0
              }
            }
            
            // 组件内 dispatch 一个 action 后，saga 匹配到此 action 并经过处理后发出 reducer 的action 修改 state
            ```

            

    - 结合 react-redux

      - react-redux 是 redux 作者编写的适用于 react 的库。

      - react-redux 的规范，就是应用分为容器组件和UI组件，容器组件负责数据和业务逻辑，不负责 UI 呈现，且内部有状态（redux 的 state），可以使用 redux 的api；容器组件负责 UI 的呈现，所有数据由外部提供，不使用 redux 的 API。

      - API

        - connect：高阶组件

          - 通过 connect 包裹的组件，会生成一个容器组件，connect 的意思就是把容器组件和 UI 组件连接起来。
          - mapStateToProps：connect 接收的第一个参数，此函数接收 store 的 state 和 组件的 props，需要返回一个对象，映射到 UI 组件的 props 上
          - mapDispatchToProps：connect 接收的第二个参数，如果是参数，此函数接收一个 store.dispatch 和组件的 props，返回一个方法组成的对象映射到组件的 props 上；如果此参数是对象，则对象的值必须是一个 actionCreator 的函数`(...args) => ({type: ''})`

        - Provider

          通过 Provider 包裹的组件内部会得到 store。