---
title: react hooks原理解析（笔记）
date: 2021/5/10 10:32
categories: 
- Code
- React
tags: 
- React
notebook: React
---

react hooks 原理解析

<!--more-->

- 模拟实现单个`useState`

  ```javascript utils.js
  import ReactDOM form 'react-dom'
  
  function render() {
    ReactDOM.render(<App  />, document.getElementById('root'))
  }
  let state; // 外部存储state，当更新时可以以上次的state更新
  function useState(initialState) {
    state = state === state || initialState
    function setState(newState) {
      state = newState;
      render(); // 模拟更新dom
    }
  }
  
  export {
  	useState
  }
  ```

- 模拟实现单个`useEffect`

  ```javascript utls.js
  ...
  let deps; // 外部存储deps，对比
  function useEffect(action, deps_) {
    const hasNoDeps = !deps
    const hasChangeDeps = deps_? deps_.some((dep, index) => deps[index] !==dep) : true
    
    if(hasNoDeps || hasChangeDeps) {
      action()
      deps = deps_
    }
  }
  ```
  
- 模拟实现多个`useState`和 多个`useEffect`

  ```javascript
  import ReactDOM from 'react-dom'
  
  let indicator = 0;
  let memoizedState = []
  
  function useState(initialState) {
    memoizedState[indicator] = memoizedState[indicator] || initialState;
    const currentIndicator = indicator;
    
    function setState(newState) {
      memoizedState[currentIndicator] = newState
      render();
    }
    
    return [memoizedState[indicator++], setState]
  }
  
  function useEffect(action, deps) {
    const hasNoDeps = !deps
    const hasChangeDeps = deps? memoizedState[indicator].some((dep, index) => dep !== deps[index]) : true
    if(hasNoDeps || hasChangeDeps) {
      action()
      memoizedState[indicator++] = deps
    }
  }
  
  function render() {
    indicator = 0;
    ReactDOM.render(<App />, document.getElementById('root'))
  }
  ```



### hooks 原理

[一文吃透react-hooks原理](https://juejin.cn/post/6944863057000529933)

#### hooks 的调用

```javascript ReactHooks.js
export function useState(initialState) {
  const dispatch = resolveDispatch();
  return dispatch.useState(initial);
}

function resolveDispatch() {
  const dispatcher = ReactCurrentDispatch.current;
  return dispatcher
}
```

```javascript ReactCurrentDispatcher.js
const ReactCurrentDispatcher = {
  current: null,
}
```

所以，useState的调用上会归到ReactCurrentDispatch的current上。需要从函数组件调用上查看具体对ReactCurrentDispatcher做了什么。

#### renderWithHooks

renderWithHooks函数的调用函数组件的主要函数

概念

- `current fiber树`：当完成一次渲染后，会产生一个`current fiber树`，在`commit`阶段换成真实的`DOM`树
- `workInProgress fiber树`：即将调和渲染的fiber树。在一次新的组件更新过程中，会从current复制一份作为workInProgress，更新完毕后再将workInProgress赋值给current
- `workInProgress.memoizedState`：class组件中保存state信息，在函数组件中，以**链表形式**保存hooks信息
- `workInProgress.expirationTime`：react用不同的expirationTime表示优先级。
- `currentHook`：可以理解为current树上的指向当前调度的hook节点。
- `workInProgress`：可以理解为workInProgress树上指向当前调度的hook节点。

```javascript react-reconciler/src/ReactFiberHooks.js
export function renderWithHooks(
  current,
  workInProgress,
  Component,
  props,
  secondArg,
  nextRenderExpirationTime,
) {
  renderExpirationTime = nextRenderExpirationTime;
  currentlyRenderingFiber = workInProgress;

  // 清空信息
  workInProgress.memoizedState = null;
  workInProgress.updateQueue = null;
  workInProgress.expirationTime = NoWork;

  // 判断当前是否是第一次渲染hook，挂载两套不同的处理函数给ReactCurrentDispatcher
  ReactCurrentDispatcher.current =
      current === null || current.memoizedState === null
        ? HooksDispatcherOnMount
        : HooksDispatcherOnUpdate;

  // 执行函数组件
  let children = Component(props, secondArg);

  if (workInProgress.expirationTime === renderExpirationTime) { 
       // ....这里的逻辑我们先放一放
  }

  // 重新赋值ReactCurrentDispatcher
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;

  renderExpirationTime = NoWork;
  currentlyRenderingFiber = null;

  currentHook = null
  workInProgressHook = null;

  didScheduleRenderPhaseUpdate = false;

  return children;
}

// ContextOnlyDispatcher中的useState是一个抛出异常的函数
const ContextOnlyDispatcher = {
    useState:throwInvalidHookError
}
function throwInvalidHookError() {
  invariant(
    false,
    'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' +
      ' one of the following reasons:\n' +
      '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' +
      '2. You might be breaking the Rules of Hooks\n' +
      '3. You might have more than one copy of React in the same app\n' +
      'See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.',
  );
}

```

执行流程图

<img src="https://tva1.sinaimg.cn/large/008i3skNly1gr56ii9zdpj30u01520uo.jpg" style="zoom:50%;" />

#### mountWorkInProgressHook

每次初始化，执行useState、useRef等都会调用`mountWorkInProgressHook`  

```javascript ReactFiberHooks.js
function mountWorkInProgressHook() {
  const hook: Hook = {
    memoizedState: null,  // useState中 保存 state信息 ｜ useEffect 中 保存着 effect 对象 ｜ useMemo 中 保存的是缓存的值和deps ｜ useRef中保存的是ref 对象
    baseState: null,// useState和useReducer一次更新中，保存到最新的state值
    baseQueue: null,// useState和useReducer中保存的最新的更新队列
    queue: null,// 保存待更新队列pendingQueue，更新函数dispatch等信息
    next: null, // 指向下一个hooks对象
  };
  if (workInProgressHook === null) { // 例子中的第一个`hooks`-> useState(0) 走的就是这样。
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}

```



  初始化后形成的结构：

![mountWorkInProgressHook](https://tva1.sinaimg.cn/large/008i3skNgy1gqi1uummwtj317z0u0770.jpg)

由于hooks存储的链表形式，不能在条件或循环中使用hooks

![if hook](https://tva1.sinaimg.cn/large/008i3skNgy1gqgztbfbxjj31bv0u0788.jpg)

**一旦在条件语句中声明`hooks`，在下一次函数组件更新，`hooks`链表结构，将会被破坏，`current`树的`memoizedState`缓存`hooks`信息，和当前`workInProgress`不一致，如果涉及到读取`state`等操作，就会发生异常。**

#### mountState

```javascript
function mountState(
  initialState
){
  const hook = mountWorkInProgressHook();
  if (typeof initialState === 'function') {
    // 如果 useState 第一个参数为函数，执行函数得到state
    initialState = initialState();
  }
  hook.memoizedState = hook.baseState = initialState;
  const queue = (hook.queue = {
    pending: null,  // 带更新的
    dispatch: null, // 负责更新函数
    lastRenderedReducer: basicStateReducer, //用于得到最新的 state ,
    lastRenderedState: initialState, // 最后一次得到的 state
  });

  const dispatch = (queue.dispatch = (dispatchAction.bind( // 负责更新的函数
    null,
    currentlyRenderingFiber,
    queue,
  )))
  return [hook.memoizedState, dispatch];
}

```

useState返回了hook对象的memoizedState和经过处理的dispatch，这里dispatchAction绑定了两个参数，我们使用时候传入的是第三个

#### dispatchAction

```javascript
function dispatchAction(fiber, queue, action) {

  // 计算 expirationTime 过程略过。
  /* 创建一个update */
  const update= {
    expirationTime,
    suspenseConfig,
    action,
    eagerReducer: null,
    eagerState: null,
    next: null,
  }
  /* 把创建的update */
  const pending = queue.pending;
  if (pending === null) {  // 证明第一次更新
    update.next = update;
  } else { // 不是第一次更新
    update.next = pending.next;
    pending.next = update;
  }
  
  queue.pending = update;
  const alternate = fiber.alternate;
  /* 判断当前是否在渲染阶段 */
  if ( fiber === currentlyRenderingFiber || (alternate !== null && alternate === currentlyRenderingFiber)) {
    didScheduleRenderPhaseUpdate = true;
    update.expirationTime = renderExpirationTime;
    currentlyRenderingFiber.expirationTime = renderExpirationTime;
  } else { /* 当前函数组件对应fiber没有处于调和渲染阶段 ，那么获取最新state , 执行更新 */
    if (fiber.expirationTime === NoWork && (alternate === null || alternate.expirationTime === NoWork)) {
      const lastRenderedReducer = queue.lastRenderedReducer;
      if (lastRenderedReducer !== null) {
        let prevDispatcher;
        try {
          const currentState = queue.lastRenderedState; /* 上一次的state */
          const eagerState = lastRenderedReducer(currentState, action); /**/
          update.eagerReducer = lastRenderedReducer;
          update.eagerState = eagerState;
          if (is(eagerState, currentState)) { 
            return
          }
        } 
      }
    }
    scheduleUpdateOnFiber(fiber, expirationTime);
  }
}

```

无论是类组件调用`setState`,还是函数组件的`dispatchAction` ，都会产生一个 `update`对象，里面记录了此次更新的信息，然后将此`update`放入待更新的`pending`队列中，`dispatchAction`第二步就是判断当前函数组件的`fiber`对象是否处于渲染阶段，如果处于渲染阶段，那么不需要我们在更新当前函数组件，只需要更新一下当前`update`的`expirationTime`即可。

如果当前`fiber`没有处于更新阶段。那么通过调用`lastRenderedReducer`获取最新的`state`,和上一次的`currentState`，进行浅比较，**如果相等，那么就退出**，这就证实了为什么`useState`，两次值相等的时候，组件不渲染的原因了，这个机制和`Component`模式下的`setState`有一定的区别。

如果两次`state`不相等，那么调用`scheduleUpdateOnFiber`调度渲染当前`fiber`，`scheduleUpdateOnFiber`是`react`渲染更新的主要函数。

（没懂，再研究）



