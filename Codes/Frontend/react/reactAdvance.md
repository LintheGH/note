---
title: React 进阶
date: 2021/11/30 15:14
categories: 
- Code
- React
tags: 
- React
notebook: React
---


React 进阶
<!-- more -->

## JSX

React 的开始是从jsx开始的，jsx最终通过babel编译成一个个`React.createElement()`的函数

```jsx
<div>
	<TextComponent />
  <div>Hello, world</div>
  let us learn React
</div>

// 编译后
React.createElement('div', null, [
  React.createElement(TextComponent, null),
  React.createElement('div', null, 'Hello world'),
  'let us learn React'
])
```

> 为什么老版本在写jsx的时候需要引入 react？正因为jsx经过babel编译后，变成了React.createElement 函数，文件引入react防止React的引入报错



## 组件

- class 类组件继承`super`的问题

  ```jsx
  class Foo extends React.Component {
    constructor(props) {
  		super(props)
    }
  }
  
  /** 
  	在React.Component 组件中，会挂载props和context，以及在实例化后挂载 setState 和 forceUpdate 到原型链上
  */
  function Component(props, context, updater) {
    this.props = props;      //绑定props
    this.context = context;  //绑定context
    this.refs = emptyObject; //绑定ref
    this.updater = updater || ReactNoopUpdateQueue; //上面所属的updater 对象
  }
  /* 绑定setState 方法 */
  Component.prototype.setState = function(partialState, callback) {
    this.updater.enqueueSetState(this, partialState, callback, 'setState');
  }
  /* 绑定forceupdate 方法 */
  Component.prototype.forceUpdate = function(callback) {
    this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
  }
  ```

  > 当super没有传递 props 时，父组件中不会存在props。原因就是没有传递props给父组件，super即是父类

  ```jsx
  class Foo extends React.Component {
    constructor(props) {
  		super()
      console.log(this.props) // undefinded
    }
  }
  ```

  > 为什么 super 没有传递 props 也能够使用 props 呢？因为在组件实例化后，react 把 props 挂载到实例上去了，故还是可以使用 props 的。同样挂载到实例上的还有 state 和一个空的 ref

  ```jsx
  class Foo extends React.Component {
    constructor(props) {
  		super(props)
    }
    
    render() {
      console.log(this.props)
      return null
    }
  }
  
  Foo.props = props // 挂载到实例上
  ```

- 组件强化

  - 继承

    组件可以继承其他组件

    ```jsx
    /* 人类 */
    class Person extends React.Component{
        constructor(props){
            super(props)
            console.log('hello , i am person')
        }
        componentDidMount(){ console.log(1111)  }
        eat(){    /* 吃饭 */ }
        sleep(){  /* 睡觉 */  }
        ddd(){   console.log('打豆豆')  /* 打豆豆 */ }
        render(){
            return <div>
                大家好，我是一个person
            </div>
        }
    }
    /* 程序员 */
    class Programmer extends Person{
        constructor(props){
            super(props)
            console.log('hello , i am Programmer too')
        }
        componentDidMount(){  console.log(this)  }
        code(){ /* 敲代码 */ }
        render(){
            return <div style={ { marginTop:'50px' } } >
                { super.render() } { /* 让 Person 中的 render 执行 */ }
                我还是一个程序员！    { /* 添加自己的内容 */ }
            </div>
        }
    }
    export default Programmer
    ```

    > 其优点是继承共享父组件的属性和方法，还可以扩展自身属性；缺点是子组件会修改父类的属性和方法，子类中的生命周期会覆盖掉父类生命周期

  - HOOKS

  - HOC

## state

- 同步异步更新

  关键在于是否开启同步更新。

  ```jsx
  ```

- 类组件 state 更新

- 函数组件更新