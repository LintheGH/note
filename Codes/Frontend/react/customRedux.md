---
title: 利用hooks实现简易redux
date: 2021/5/06 12:27
categories: 
- Code
- React
tags: 
- React
notebook: React
---

react 16.8新增了hooks，使得函数组件能够拥有自己的state，其中`useReducer`结合`createContext`可以实现一个简易的redux。基本思路是使用`useReducer`管理state，利用context的`Provider`组件透传state，从而实现跨组件管理state

<!--more-->

- 编写组件使用`useReducer`管理状态

  ```tsx reducer.tsx
  import React, {useReducer} from 'react'

  interface providerProps {}
  interface reducerState {count: number}
  interface reducerAction {
    type: string,
    payload: {[name: string]: any}
  }
  interface Actions {
    [name: string]: Reducer
  }
  type Reducer = (prevState: reducerState, action: reducerAction) => reducerState
  type stateInit = (state: reducerState) => reducerState

  const actions: Actions = {
    'INCREASE': (prevState, action) => ({...prevState, count: prevState.count + 1})
  }
  const reducer: Reducer = (prevState, action) => {
    const result = actions[action.type]&&actions[action.type](prevState, action) || prevState
    return result
  }
  const initialState: reducerState = {
    count: 0
  }
  const init: stateInit = (state) => {
    return state
  }
  const Provider: React.FC<providerProps> = () => {
    const [state, dispatch] = useReducer(reducer, initialState, init)
    return null
  }

  ```

- 通过`createContext`创建context，Provider，透传 reducerState给订阅组件

  ```tsx reducer.tsx
  import React, {useReducer} from 'react'
  ...
  const context = React.createContext<{state: reducerState, dispatch: (dispatcher: reducerAction) => void}>({state: initialState, dispatch: () => {}})
  const Provider: React.FC<providerProps> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState, init)
    return <context.Provider value={state, dispatch}>{children}</context.Provider>
  }
  
  export {
  	Provider,
    context,
  } // 导出Provider和context
  
  ```

- 使用

  ```tsx ComponentA.tsx
  import React, {useContext} from 'react'
  import {context} from './reducer.tsx'
  
  export default function Index() {
    const {state, dispatch} = useContext(context)
    return <div>{state.count}</div>
  }
  ```

  ```tsx ComponentB.tsx
  import React, {useContext} from 'react'
  import {context} from './reducer.tsx'
  
  export default function Index() {
    const {state, dispatch} = useContext(context)
    const handleClick = () => {
      dispatch({
        type: 'INCREASE',
        payload: {}
      }) // 分发一个action改变state，即可改变ComponentA
    }
    return <button onClick={handleClick}>change state</button>
  }
  ```

  ```tsx Index.tsx
  import React, {useReducer} from 'react'
  import {Provider} from './reducer.tsx
  import ComponentA from './ComponentA'
  import ComponentB from './ComponentB'
  
  export default const Index = () => {
    return <Provider>
    	<ComponentA />
      <ComponentB />
    </Provider>
  }
  ```

- 问题

  - 由于`context.Provider`的特点，当provider的value改变时，Provider下的所有组件都会重新渲染，带来性能问题
  - 异步action的问题，当action的payload为异步操作时，reducer没有实现异步操作完成时的数据处理。
  
  



