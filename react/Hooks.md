---
title: react Hooks
tags: react, Hooks
notebook: framework
---

### react Hooks
---
#### React Hooks

- `useState`
- `useEffect`
- `useLayoutEffect`
- `useCallBack`
- `useReducer`
- `useRef`
- `useMemo`

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

- `useState`:声明和改变组件状态。返回值是一个包含state和改变该state的函数的数组

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
                    - `function`参数：当传入`useState(0)[0]`的参数是一个函数，**这个函数可以接收一个`previousState`**,返回值作为新的`state`值
                        ```javascript
                        const Demo = (props) => {
                        const [count, setCount] = useState({name: 'zhangsan', age: 24})
                        
                        useEffect(() => {
                            setCount((preState) => {
                                return { // 要达到合并更新的效果，则需要使用...展开运算
                                    ...preState,
                                    age: 30
                                }
                            })
                            return () => {
                                cleanup
                            };
                            }, [input]);
                        }
                        ```
                        > useState和class 的setState 不同，不会自动合并更新，需要手动合并
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
    > `useEffect`在每次执行前，会清除上一次的`useEffect`，以放置内存泄漏

- `useCallBack`：`useCallBack`用于生成一个回调函数，一般用于重复代码抽离
    ```javascript
    const Demo = (props) => {
        const [count, setCount] = useState(0)
        const [count2, setCount2] = useState(0)

        const calcCount = useCallBack(() => {
            return count+count2
        },[count, count2])

        useEffect(() => {
            const sum = calcCount()
            console.log('sum---', sum)
        },[calcCount])

        return <div>
            <div className={'box'}>
            {count}{count2}<Button onClick={setCount(count + 1)}>-</Button><Button onClick={setCount2(count2+1)}>+</Button>
            </div>
        </div>
    }
    ```
    `useCallBack`的使用和`useEffect`相同，不过useCallBack生成一个回调函数。在第二个参数（数组）中的任一值改变时，会重新生成一个回调函数，在`useEffect`中的第二个参数监听这个生成的回调函数即可做进一步的操作

- `useRef`：生成一个可变的ref对象，对象中的`.current`被初始化为传入初始的值，ref对象在整个组件的生命周期中不会自动改变，基于此，ref对象一个强大的作用在于它能够保存某次state, 用于某些操作.

    ```javascript
    const Demo = (props) => {
        const [text, setText] = useState('notChange')
        const [count, setCount] = useState(0)
        const ref = useRef(null) // {current: null}

        useEffect(() => {
            const {current} = ref
            if(current) {
                setText('currentChanged')
            }
            return () => {
                
            };
        },[ref]);

        const add = () => {
            if(ref.current) { // 这里在未改变ref之前，count不会改变
                setCount(count+1)
            }
        }

        return <div>
        {text}{count}<Button onClick={() => {ref.current = true}} >改变ref</Button><Button onClick={add}>+</Button>
        </div>
    }
    ```
    > 当`useRef`用于组件或者DOM时，`ref.current`初始值会被赋予此组件或DOM元素。

    > 改变`useRef`的值不会引起视图更新

    > `useRef`创建的ref对象是不可扩展的
- `useMemo`： 接收两个参数，计算函数和函数所依赖的数据数组，返回一个由计算函数返回的‘memorized’值。`useMemo`用于“缓存”计算函数返回的值（可以是数据或者是组件），当所依赖的数据改变时，才会重新调用计算函数返回新的值。
    > `useMemo`的出现主要是为了性能优化。在函数组件中，当状态放生变化时，函数组件中所有通过计算出来的值/引入的组件和没有设置关联的effect中的副作用都会重新计算/挂载，当一个组件不用频繁更新并且开销很大时，就会造成性能浪费。

    > `useMemo`的作用范畴类似`useEffect`，但是，`useMemo`中的计算都与渲染有关，而`useEffect`中都计算则是各种副作用，在hooks的使用上要各司其职
    
    ```javascript
    const Demo = (props) => {
        const [count, setCount] = useState(0)
        const [count2, setCount2] = useState(0)

        // 这种写法下，每次改变count2也会输出count2的值
        // const count_ = (()=> {
        //   console.log('count_', count2)
        //   return count*2
        // })()

        // 这种写法下，只有当count改变，才会输出count2的值，当计算开销很大时，可以提高性能
        const count_ = useMemo(() => {
            console.log('count_2', count2)
            return count*2
        },[count])

        return <div>
            {count_}-{count}-{count2}-{props.count}
            <Button onClick={() => {setCount(count+1)}}>double+</Button>
            <Button onClick={() => {setCount2(count2 + 1)}}>+</Button>
        </div>
    }

    const Memo = (props) => {
        const [count, setCount] = useState(0)
        const [count2, setCount2] = useState(0)

        // 每次都更新
        // const child = (() => {
        //   console.log('生成child')
        //   return <Demo count={count} />
        // })()

        const child = useMemo(() => {console.log('生成child');return <Demo count={count}/>}, [count])
        
        return <div>
            {child}...{count2}
            <Button onClick={() => {setCount(count +1 )}}>修改child</Button>
            <Button onClick={() => {setCount2(count2 + 1)}}>修改count2</Button>
        </div>
    }
    ```

- Hooks 使用的一些规则
    1.  只在函数组件的最上层使用 `Hooks`,不得在循环、判断、函数中使用Hooks,让多次调用的`useState``useEffect`有一个确定的顺序
    2.  只在函数组件中使用`Hooks`
