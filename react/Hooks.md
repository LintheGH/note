---
title: react Hooks
tags: react, Hooks
notebook: framework
---

### react Hooks
---
#### React Hooks
```javascript
import { useState, useEffect } from 'react';

function Example() {
    const [count, setCount] = useState(0);

    useEffect(() => {
            // 更新文档的标题
            document.title = `You clicked ${count} times`;
        });

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
            Click me
            </button>
        </div>
    );
}
```

- `useState`:是react自带的一个Hooks函数，作用是声明和改变组件状态。

    ```javascript
    const [count, setCount] = useState(0);
    ```
    - 参数： 函数接收的参数是一个初始值，初始值的类型不限，可以是`array`,`object`...
    - 返回： 函数返回一个长度为2的数组，
        - 第一个值`useState(0)[0]`是组件的初始state，在这里即是`0`
            > react 会在每次组件渲染后保存这个状态，也就是说`useState`每次只会在组件首次渲染时执行(组件卸载后再加载初始赋值)
        - 第二个值`useState(0)[1]`是改变状态state的方法
            - `setCount`是改变组件状态的方法
                - 参数：接收的参数即是改变后的`状态`，接收后react会直接覆盖上一次的state
                - 返回：viod
        - 可以多次使用`useState`
            ```javascript
            function Example() {
                const [count, setCount] = useState(0);
                const [fruit, setFruit] =  useState('banana)
                const [todos, setTodo] = useState([{text: 'do someting'}])
            }
            ```
- `useEffect` 副作用钩子
    ```javascript
    import { useState, useEffect } from 'react';

    function Example() {
        const [count, setCount] = useState(0);

        // 类似于componentDidMount 和 componentDidUpdate:
        useEffect(() => {
            // 更新文档的标题
            document.title = `You clicked ${count} times`;
        });

        return (
            <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
            </div>
        );
    }
    ```
    - `useEffect`副作用钩子会在每次组件更新之后执行（包括第一次）

    - `useEffect`中解绑一些副作用（如事件监听）：`useEffect`通过返回一个函数来解绑副作用
        ```javascript
        import { useState, useEffect } from 'react';

        function FriendStatus(props) {
            const [isOnline, setIsOnline] = useState(null);

            function handleStatusChange(status) {
                setIsOnline(status.isOnline);
            }

            useEffect(() => {
                ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
                // 一定注意下这个顺序：告诉react在下次重新渲染组件之后，同时是下次调用ChatAPI.subscribeToFriendStatus之前执行cleanup
                return function cleanup() {
                    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
                };
            });

            if (isOnline === null) {
                return 'Loading...';
            }
            return isOnline ? 'Online' : 'Offline';
        }
        ```
        > `useEffect` 中的解绑会在每次组件更新/卸载后，在`useEffect`中的操作执行前执行，组件卸载只会执行副作用的解绑函数，可以做一些事件的取消监听

        > `useEffect` 是一个异步的函数，不会阻塞页面更新

        > `useLayoutEffect` 是一个`useEffect`的同步版本函数，其使用方法和`useEffect`一样

    - 跳过一些不必要的副作用
        通过给 `useEffect`传入第二个参数，当第二个参数改变时才执行副作用
        ```javascript
        useEffect(() => {
            document.title = `You clicked ${count} times`;
        }, [count]); // 只有当count的值发生变化时，才会重新执行`document.title`这一句
        ```
    - Hooks 使用的一些规则
        1.  只在函数组件的最上层使用 `Hooks`,不得在循环、判断、函数中使用Hooks,让多次调用的`useState``useEffect`有一个确定的顺序
        2.  只在函数组件中使用`Hooks`
