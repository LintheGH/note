---
title: react 小tips
tags: react, framework
notebook: framework
---
### 开发中发现的小技巧/注意事项
---
- `getDerivedStateFromProps` 钩子函数

    `getDerivedStateFromProps` 钩子函数存在时，不会执行 `componentWillMount` 钩子函数， 这个钩子函数在每次 `render` 执行前都会执行，因此通过`getDerivedStateFromProps`更新的state中的属性不会在接收属性的组件中通过自身的`setState`更新，state 中的属性值跟传递过来的属性值保持一致
    `getDerivedStateFromProps`函数接收参数`preProps``preState`，函数内部不能获取到组件实例本身，故无法获取`this`

- `props`的传递

    当我们把父组件的数据传递到子组件时，通常子组件会`this.props.xxxx`接收
    ```javascript
    import React from 'react'
    class Son extends React.Component {
        render() {
            return <div>id is:{this.props.data.attr.id}</div>
        }
    }
    class Father extends React.Component {
        state = {
            sonData: {
                attr: {
                    id: '1',
                    name: 'tom'
                }
            }
        }
        render() {
            return <Son data={this.state.sonData}/>
        }
    }
    ```
    这时`id`的值时同步传过来到，子组件在渲染时可以第一时间获取到传过来到值

    但是当传递当值时父组件通过异步获取到时，子组件在初次渲染时就会获取不到值，从而时页面崩溃
    这时需要加上判断
    ```javascript
    import React from 'react'
    class Son extends React.Component {
        render() {
            return <div>id is:{!!this.props.data.attr?this.props.data.attr.id}</div>
        }
    }
    class Father extends React.Component {
        state = {
            sonData: {
                
            }
        }
        componentDidMount() {
            setTimeout(() => {
                this.setState({
                    sonData: {
                        attr: {
                            id: '1',
                            name: 'tom'
                        }
                    }
                })
            }, 4000);
        }
        render() {
            return <Son data={this.state.sonData}/>
        }
    }
    ```
    在一些需要用到父组件数据来是请求数据时，可以在`componentUpdate`、`componentWillReceiveProps`(将被删除，不推荐)、`getDerivedStateFromProps`钩子函数中判断数据是否存在来做进一步操作
    ```javascript
    class Son extends React.Component {
        componentDidUpdate(preProps, preState) {
            if(!!this.props.attr.id) {
                axios.get(...).then(res => {
                    this.setState({
                        age: res.data.age
                    })
                })
            }
        } 
        render() {
            const {age} = this.state
            return <div>
                {age}
            </div>
        }
    }
    ```
- `key`：react中的key是组件的身份标识，每个key对应一个组件，相同key的组件被认为是同一个组件，后续组件不会被创建，如下
    ```javascript
    //this.state.users内容
    this.state = {
        users: [{id:1,name: '张三'}, {id:2, name: '李四'}, {id: 2, name: "王五"}],
        ....//省略
    }
    render() {
        return(
            <div>
                <h3>用户列表</h3>
                {this.state.users.map(u => <div key={u.id}>{u.id}:{u.name}</div>)}
            </div>
        )
    }
    ```
    上述组件中的渲染后，用户列表只有`章三`和`李四`两个用户，李四和王五的可以相同，被认为是同一个组件

    react对拥有key属性的组件的处理
    
    - **key相同**： 若组件属性有变化，react只更新组件对应的属性，没有变化则不更新
    - **key不相同**：组件销毁，然后再重新创建一个组件，此时组件的生命周期会重新执行