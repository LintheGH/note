# react:轻量级视图层框架

#### react 高性能的体现：虚拟 DOM 
  React高性能的原理：

在Web开发中我们总需要将变化的数据实时反应到UI上，这时就需要对DOM进行操作。而复杂或频繁的DOM操作通常是性能瓶颈产生的原因（如何进行高性能的复杂DOM操作通常是衡量一个前端开发人员技能的重要指标）。

React为此引入了虚拟DOM（Virtual DOM）的机制：在浏览器端用Javascript实现了一套DOM API。基于React进行开发时所有的DOM构造都是通过虚拟DOM进行，每当数据变化时，React都会重新构建整个DOM树，然后React将当前整个DOM树和上一次的DOM树进行对比，得到DOM结构的区别，然后仅仅将需要变化的部分进行实际的浏览器DOM更新。而且React能够批处理虚拟DOM的刷新，在一个事件循环（Event Loop）内的两次数据变化会被合并，例如你连续的先将节点内容从A-B,B-A，React会认为A变成B，然后又从B变成A  UI不发生任何变化，而如果通过手动控制，这种逻辑通常是极其复杂的。

尽管每一次都需要构造完整的虚拟DOM树，但是因为虚拟DOM是内存数据，性能是极高的，部而对实际DOM进行操作的仅仅是Diff分，因而能达到提高性能的目的。这样，在保证性能的同时，开发者将不再需要关注某个数据的变化如何更新到一个或多个具体的DOM元素，而只需要关心在任意一个数据状态下，整个界面是如何Render的。数据驱动，声明式

#### React的特点和优势

- 虚拟DOM

  我们以前操作dom的方式是通过document.getElementById()的方式，这样的过程实际上是先去读取html的dom结构，将结构转换成变量，再进行操作

  而reactjs定义了一套变量形式的dom模型，一切操作和换算直接在变量中，这样减少了操作真实dom，性能真实相当的高，和主流MVC框架有本质的区别，并不和dom打交道

- 组件系统

  react最核心的思想是将页面中任何一个区域或者元素都可以看做一个组件 component

  那么什么是组件呢？

  组件指的就是同时包含了html、css、js、image元素的聚合体

  使用react开发的核心就是将页面拆分成若干个组件，并且react一个组件中同时耦合了css、js、image，这种模式整个颠覆了过去的传统的方式

- 单向数据流

  其实reactjs的核心内容就是数据绑定，所谓数据绑定指的是只要将一些服务端的数据和前端页面绑定好，开发者只关注实现业务就行了

- 语法

  在vue中，我们使用render函数来构建组件的dom结构性能较高，因为省去了查找和编译模板的过程，但是在render中利用createElement创建结构的时候代码可读性较低，较为复杂，此时可以利用jsx语法来在render中创建dom，解决这个问题，但是前提是需要使用工具来编译jsx
  ```
  // React.createElement 函数创建 DOM 结构
  React.createElement('div', null,
    React.createElement('h1', null, 'Hello World')
  )
  ```
#### 依赖文件
- react.js
  React 对象，有创建组件等功能
- react-dom 
  ReactDOM 对象，渲染组件的虚拟 DOM 为真实 DOM 的爆发功能
- 编译 JSX 代码
  - 浏览器端编译，需要引入 browser 文件
  - 利用 webpack 等开发环境编译

#### JSX （javascript xml）
JSX 借鉴了 xml 的语法，但是因为是 javascript 语法，所以应遵循 js 语法规则（关键字等）

#### react 组件
- 在react里表达式的符号是 "{  }",作用和vue的表达式作用是一样的
- 为组件添加类名，class需要写成className（因为毕竟是在写类js代码，会收到js规则的现在，而class是关键字）
- 为组件绑定事件：事件名字需要写成小驼峰的方式，值利用表达式传入一个函数即可 
- defaultValue
- defaultChecked
- dangerouslySetInnerHtml
  让标签编译 html 代码，容易受到 XSS 攻击
  ```
    function handleClick (){operation}
    render () {
      return (
        <div>
          <button onClick= {this.handleClick}/>
        </div>
      )
    }
  ```
```
// 创建组件 组件渲染到 APP 节点时会覆盖里面的内容
<body>
  <div id="app">aaa</div>
</body>
</html>
<script type="text/babel">// 设定为 babel 让 browser 编译
  var Hello = React.createClass({// 组件名开头必须大写
    render () {
      return (
        <div>
          <div>
          {/* JSX 里面的注释必须写成这种格式，否则会被编译*/}
            <h1>Hello World</h1>
          </div>
        </div>
      )
    }
  })
  // ReactDOM.render 函数渲染 DOM 的到页面
  ReactDOM.render(<Hello></Hello>,app)
```
- ref 为组件标记
  ```javascript
  var Hello = React.createClass({
    render () {
      return (
        <div>
          <p ref = "p"> Hello World </p>
          <p ref = { (el) => { this.pp = el } }> Hello World </p> // ref 内的函数接收到当前标记的 NODE 返回 this.pp = el，即把当前 NODE 挂载到组件中
          <button onClick = {this.changeWorldColor}> change </button>
          <World ref = {world => this.world = world}/>
        </div>
      )
    },
    componentDidMount () { //ref的标记官方推荐使用函数的方式，接收到要做标记的元素或者子组件，将其挂载this上
      this.refs.p.style.color = 'red'
      this.pp.style.color = 'pink'
    }
  })
  ```
- map
  - 在react中使用map方法来将数据数组转换成盛放虚拟dom结构的数组，利用表达式放入到组件的虚拟dom结构中，在 `{}` 内的数组会被动态解析
    ```javascript
    var Hello = React.createClass({
      getInitailState () {
        return {
          fruit: [
            'apple', 'banana', 'orange', 'watermelon'
          ]
        }
      },
      renderFruit () {
        return this.state.fruit.map((item, i) => (<li key = i> { item } ))// 可以根据需要循环出需要的数据
      },
      render () {
        return (
          <div>
            <ul>
              { this.renderFruit() }
            </ul>
          </div>
        )
      }
    })
    ReactDOM.render(<Hello/>, app)
    ```
#### Props 和 State
- 属性（Props）：在组件外部传入，或者内部设置（getDefaultProps），组件内通过 `this.props`获取
- 状态（state）：由组件设置或更改，内部通过 `this.state`获取
- getDefaultPorps()
- getInitialState
- setState
  更改组件的状态 state 会触发重新渲染
  在setState中传入一个对象，就会将组件的状态中键值对的部分更改，还可以传入一个函数，这个回调函数必须返回像上面方式一样的一个对象，函数可以接收prevState和props
  ```javascript
  <body>
    <div id="app"></div>
  </body>
  </html>
  <script type="text/babel">
    let app = document.querySelector('#app')
    var Father = React.createClass({
      render () {
        return (
          <div>
            <p>我是父组件</p>
            <Son name={'tom'}></Son>
          </div>
        )
      }
    })
    var Son = React.createClass({
      getDefaultProps () {
        return {
          name: 'jim'
        }
      },
      getInitialState () {
        return {
          age: 18
        }
      },
      changeAge () {
        // this.state.age++ // 不会触发视图更新
        // this.setState ((previousState, props) => { // 触发视图更新
        //   return {
        //     age: previousState.age + 1
        //   }
        // })
        this.setState({
          age: this.state.age+1
        })
      },
      render () {
        return (
          <div>
            <p>我是子组件</p>
            <p>我的名字是：{this.props.name}, 年龄：{ this.state.age }</p>{/*父组件传入会覆盖初始属性*/}
            <button onClick= { this.changeAge }>+</button>
          </div>
        )
      }
    })
    ReactDOM.render(<Father/>,app)
  </script>
  ```
#### 属性和状态的对比

相似点：都是纯js对象，都会触发render更新，都具有确定性（状态/属性相同，结果相同）

不同点： 

1. 属性能从父组件获取，状态不能
2. 属性可以由父组件修改，状态不能
3. 属性能在内部设置默认值 ，状态也可以
4. 属性不在组件内部修改   ，状态要改
5. 属性能设置子组件初始值  ，状态不可以
6. 属性可以修改子组件的值，状态不可以

状态只和自己相关，由自己维护

属性不要自己修改，可以从父组件获取，也可以给子组件设置

组件在运行时自己需要修改的数据其实就是状态而已

#### 组件生命周期
![life cycle](https://images2015.cnblogs.com/blog/588767/201612/588767-20161205190022429-1074951616.jpg)
- 初始化阶段钩子函数
  - getDefaultPorps () 
    - 作用：挂载默认属性，当给组件设置属性的时候会覆盖掉（优先级低）
    - 特点： 
      - 不管实例化多少次组件，只执行一次，因为组件实例间的默认属性是共享的
  - getInitailState () {}
    - 每次实例化组件都会执行，也就是说每一个组件都有一个自己独立的状态
  - componentWillMount () {}
    - 相当与 vue 的 created + beforeMount ，渲染之前最后一次更改数据的机会，更改数据不会触发 render 的重新执行
    > react中官方不推荐我们在componentWillMount里这么做，会有安全的问题
  - render () {}
    - 渲染 DOM 
  - componentDidMount () {}
    - 页面中生成真实的 DOM ，可以做 DOM 相关的操作
- 组件运行阶段钩子函数
  - componentWillReceiveProps (nextProps, nextState) {}
    - 这时得知属性的变化，执行对应操作
    - 形参 nextProps 和 nextState 是新的数据，而 this.props 和 this.state 仍然为更改前的数据
  - shouldComponentUpdate (nextProps, nextState) {}
    - componentWillReceiveProps 钩子后执行
    - 函数返回值为 true 时，组件才更新，false 时不会更新，当代码中书写了这个函数时，默认会返回 false 
    - 接收新的数据 nextProp nextState ，可以根据新数据和原数据对比，控制组件是否更新
  - componentWillUpdate
    - 组件马上更新，在函数内不要更新状态，否则**死循环**
  - render () {}
    - 组件重新渲染
  - componentDidUpdate () {}
    - 更改完成，页面重新生成 DOM 
- 组件销毁阶段
  - componentWillUnmount () {}
  怎么样就算组件被销毁：
    1. 当父组件从渲染这个子组件变成不渲染这个子组件的时候，子组件相当于被销毁
    2. 调用ReactDOM.unmountComponentAtNode(node) 方法来将某节点中的组件销毁

##### call apply bind
  功能： 更改函数的this指向
  es6 -> 全局函数中的this不指向window
  call和apply是在调用函数的过程中，将函数的this改掉
  bind 更改指针和传参的方式和call一样，但是不能执行函数，而是返回一个新的更改指针并传参后的函数
#### 组件通信
- 父子组件通信

- 非父子组件通信
  - 状态提升

#### 无状态组件（函数定义组件）
在使用组件的时候，我们不需要组件拥有自己的状态，只需要接收外界传入的属性之后做出反应（如渲染相应的 DOM 结构）
可以利用纯函数的方式将其制作成无状态组件，提高性能
```javascript
import React from 'react'
// 定义无状态组件
const Button = (props) => {
  return (
    <button onClick = { props.handler }>pay</button>
  )
}
// 调用无状态组件
class Pay extends React.component = {
  constructor (props) {
    super(props)
    this.props = {
      handler () {
        alert('const $110')
      }
    }
  }
  render () {
    return (
      <div>
        <Button props = {this.props} /> // 传入 this.props
      </div>
    )
  }
}
```
#### context 传递数据
组件间的数据传递默认是层层传递，不能跳层。
react 提供了context 组件树状态传递方式，可以把数据让某一个外层的父级组件创建一个 context ,然后利用 Context.Provider 传递给所有的子级组件，任意子级组件可以通过 Context.Consumer 来获取这个 context 上的数据
```javascript
import React from 
const ThemeContext = React.createContext('key') // 创建一个 theme Context ，默认值为 light
function B (props) {
  render () {
    return (
      <ThemeContext.Consumer>
        { function (theme) { return (<div>{ theme }</div>)} } // 函数接收 dark 返回渲染出组件
      </ThemeContext.Consumer>
    )
  }
}
//中间组件
function A (props) {
  return (
    <div>
      <B/>
    </div>
  )
}
class App extends React.Component {
  render () {
    <ThemeContext.Provider value="dark"> // 传入一个 dark
      <A/>
    </ThemeContext.Provider>
  }
}
```

#### ES6 的react
在新版的 react 中，采用了新的组件创建方式和新的属性、状态设置方式
- 组件创建使用 class 来创建
- 在 es6 中不再使用 getInitialState 来设置默认属性，而是在 constructor 里直接给 this.state 上挂载数据
- 属性设置通过给类设置 defaultProps 属性来设置默认属性
  ```javascript
  class App extends React component {
    constructor (props) {
      super(props)
      this.state = {
        doing: 'studing'
      }
    }
  }
  App.defaultProps = {
    name: 'App根组件'
  }
  ```

#### react 路由
---
react-router的使用
- react-router、react-router-dom、react-router-native的区别
  - react-router是路由的核心，react-router-dom 比前者多出了 `<link>`，`<BrowserRouter>` 这样的 DOM 类组件
  - 如果你在开发一个网站，你应该使用`react-router-dom`，如果你在移动应用的开发环境使用React Native，你应该使用`react-router-native`
  - 我们这里使用 react-router-dom 即可
- `react-router`（react-router-dom）的使用
  - 基本的路由结构为
    ```javascript
    <BrowserRouter>// 或者 HashRouter
      <Route></Route>
      <Route></Route>
      <Route></Route>
    </BrowserRouter>
    ```
    因此，我们首先需要在 SPA 应用最外层包裹上一个 Router，Router 分为两种：BrowserRouter 和 HashRouter
      - BrowserRouter: 
        使用了HTML5的history API来记录你的路由历史使用了HTML5的history API来记录你的路由历史
      - HashRouter:
        使用URL`(window.location.hash)`的hash部分来记录
  - 在需要切换路由的时候，使用 `<Route>` 来作为匹配路由选择
    - Route 的一些参数：
      - path：string 路径
      - component:componentcomponent 渲染的组件。当访问地址和路由匹配时，对应的 component 将会被渲染，并且传入 match、location、history
      - render：func render 函数返回需要渲染的组件
      - exact：boolean 为 true 时路径将会精准匹配，'/one' 的路由将不能匹配 '/one/two'
      - strict：boolean 对路径末尾斜杠的匹配，为 true 时 '/one/' 将不能匹配 '/one' 但可以匹配 '/one/two'，需要确保路由没有末尾斜杠，那么需要 exact 和 strict 都为 true
      ```javascript
      <Router exact={ true } path="/home" component= { AppHome } /> 
      ```
  - `<Switch>`
      Switch 只会渲染第一个与当前访问地址匹配的 Router 或者 redirect，有效防止同级路由多次渲染
      ```javascript
      <Switch>
        <Router  path="/" component= { AppHome } />
        <Router  path="/mine" component= { AppMine } />
      </Switch>
      // 当路径为'/'时，只渲染第一个
      ```
  - `<Redirect>`：重定向。可以使用 Redirect 组件，添加 from 、to 属性进行重定向跳转
  - `<Link>` 和 `<NavLink>`：
    - `<Link>`：声明式导航
      - to：string 跳转指定路径
      - to: Object 带参数跳转到指定路径
        ```javascript
        <Link to={{ 
          pathname: '/course',
          state: { price: 18 }
        }}>
        ```
      - replace: boolean 跳转时，是否替换访问历史
    - `<NavLink>`: `<Link>` 的特殊版，增加了：
      - activeClassName: String 激活时的类名
      - activeStyle: Object 激活时的内联样式
      - exact：boolean 是否精准匹配
      - strict：bolean 是否匹配最后的斜杠
      - isActive：func 激活时执行函数
  - `history` 对象通常具有以下属性和方法：
    - length: number 浏览历史堆栈中的条目数
    - action: string 路由跳转到当前页面执行的动作，分为 PUSH, REPLACE, POP
    - location: object 当前访问地址信息组成的对象，具有如下属性：
      - `pathname`: string URL路径
      - search: string URL中的查询字符串
      - hash: string URL的 hash 片段
      - state: string 例如执行 push(path, state) 操作时，location 的 state 将被提供到堆栈信息里，state 只有在 browser 和 memory history 有效。
      - `push(path, [state])` 在历史堆栈信息里加入一个新条目。
      - `replace(path, [state])` 在历史堆栈信息里替换掉当前的条目
      - `go(n)` 将 history 堆栈中的指针向前移动 n。
      - goBack() 等同于 go(-1)
      - goForward 等同于 go(1)
      - block(prompt) 阻止跳转
  - `location`:当前的位置，将要去的位置，或是之前所在的位置
    在以下情境中可以获取 location 对象
      - 在 Route component 中，以 `this.props.location` 获取
      - 在 Route render 中，以 `({location}) => ()` 方式获取
      - 在 Route children 中，以 `({location}) => ()` 方式获取
      - 在 withRouter 中，以 `this.props.location` 的方式获取

  - 路由传参：
  - `<withRouter>` 根据传入的组件生成一个新的组件（高阶组件），`<withRouter>` 处理过的组件外面会有 Router ，可以使用 `this.props.history` 等的属性
  - 路由钩子：
    react-router 没有路由钩子，我们需要根据组件的声明周期做出相应的处理
    比如，当我们要监听某一个组件的进入和离开，我们利用`componentWillMount`、`componentWillUnmount`
    全局路由切换, 我们觉得在App里监听就可以了，因为当路由切换的时候，父级路由组件的location属性中pathname会变化
    但是App组件虽然是全部路由组件的父级组件，但是它不是一个路由组件，所以App外面没有Route组件，所以App没有location属性，所以，无法坚持属性的变化
    我们可以李扬withRouter来将App处理一下，就是在他外面包一个Route来实现这一个功能
    我们发现withRouter他可以在任意组件外面包上Route，也就是说，可以让非路由组件也能使用到路由相关的属性
  
      
#### 高阶组件
hoc
高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件

#### 非父子组件通信
在 vue 中可以利用空实例进行非父子之间通信，因为 vue 的实例拥有 `$on`, `$emit` 方法，可以绑定事件和触发事件，就可以在一个组件中为实例绑定事件，在另一个实例里为这个空实例触发事件
在 react 中，可以引入 node 中的 events 模块中 EventEmitter, 它的原型上有 `on`， `emit`


#### redux
---
redux 是一个架构思想，redux 工具实现这种思想
redux 架构是应用系统架构，和 MVC、MVVM 同种概念

- redux 的结构： store、reducer、view、actionCreator
- 安装 redux 工具
  ```
  npm i redux -S
  ```
- `store`： 
  - Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
  - 创建 store
    ```javascript
    import { createStore } from 'redux'
    const store = createStore(reducer)// 注册时传入一个函数（reducer），在调用 store.dispatch(action) 的时候会自动调用函数（reducer）
    ```
    createStore函数接受另一个函数作为参数，返回新生成的 Store 对象。
- reducer ：
  - Store 收到 Action 以后，必须给出一个新的 State（在previousState 中如果存在 Array,Object 等的引用类型的时候需要重新赋予新的引用地址），这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
  - reducer 是一个纯函数，接收两个函数：当前的状态（state）、以及action，返回一个新的状态就代表这store中的 state 改变了
  - 给 reducer 函数中参数 `previousState` 设置默认值则为 state 设置了默认值
    > 当 createStore 中传入第二个参数时，表示 state 的最初状态，这个状态会覆盖 reducer 设置的默认 state
    ```javascript
    import state from './state' // 设置的默认值
    const reducer = function (previousState = state, action) {
      let new_state = { ...previousState }
      return new_state
    }
    export default reducer // 暴露出去给 createStore 
    ```
    > 纯函数：只要是同样的输入就会得到同样的输出
    > - 不得改写参数
    > - 不能调用系统 I/O 的 API 
    > - 不能调用 `Date.now()`或者`Math.random()`等不纯的方法，因为每次会输出不确定的结果
- 使用 store 中的状态

  `store.getState()` 方法可以获得其中管理的 state
  > state: Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。

- action
  - 当 view 需要更改状态的时候，创建 action 来生成来生成一个动作
  - Action 是一个对象。其中的`type`属性是必须的，表示 Action 的名称。其他属性可以自由设置
  - actionCreator： View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。
    ```javascript
    const actionCreator = {// 组件调用 actionCreator 选择需要的函数
      login (username) {// 返回一个 action（对象）
        return {
          type: 'CHANGE_USERINFO',
          username
        }
      }
    }
    ```
- `store.dispatch()` 方法
  - `store.dispatch()`是 View 发出 Action 的唯一方法。
  - `store.dispatch()` 会自动调用 reducer 生成一个新的 state
- `store.subscribe()`
  - 组件中想要得知状态改变的化，则需要使用 `store.subscribe()` 方法来订阅状态变化，传入回调函数，这个函数会在状态变化时执行
    ```javascript
    store.subscribe(function () {
      console.log(store.getState()) // 当 state 改变时就会输出 state
    })
    ```
  - store.subscribe方法返回一个函数，调用这个函数就可以解除监听。
  > 只要把 View 的更新函数（对于 React 项目，就是组件的`render`方法或`setState`方法）放入listen，就会实现 View 的自动渲染

- reducer 划分
  在 vuex 中可以分模块管理模块，可以更好的协同合作，互不干扰，在 redux 中划分模块，划分 reducer 即可
  - reducer 使用 redux 提供的 `combineReducers` 来划分 reducer
    ```javascript
    import { combineReducers } from 'redux'
    import todolist from './todolist'
    import couter from './couter'

    const reducer = combineReducers({
      todolist,
      couter
    })
    // 取用 state
    store.getState().todolist.aaa
    store.getState().couter.bbb
    ```
- redux 执行流程
![redux](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016091802.jpg)
1. 用户发出 action 
    ```javascript
    store.dispatch(action)
    ```
2. store 自动调用 reducer ，接收两个参数，当前 state 和 action，返回一个新的 state
    ```javascript
    let nextState = reducer(previousState, action)
    ```
3. state 变化，store 调用监听函数
    ```javascript
    store.subscribu(listener)
    ```
4. listener 可以通过 store.getState() 得到新的 state，在 react 中，这时可以触发重新渲染
    ```javascript
    function listener () {
      let newState = store.getState()
      component.setState(newState)
    }
    ```
#### react-redux 工具
react-redux 工具提高 redux 操作的简易程度
##### 核心思想
- react-redux 认为组件分为两种：UI组件（木偶组件），容器组件（智能组件）
  - 父组件 -> 容器组件 => 负责管理数据和逻辑

  - 子组件 -> UI 组件 => 负责 UI 呈现，不做任何业务逻辑

- 安装 react-redux
  ```
  npm install react-redux -S
  ```
##### 核心 API
- `<Provider>` 组件
  使用 react-redux 的时候，在**最外层组件**包裹 Provider 组件，并传入 store 
    ```javascript
    import { Provider } from 'react-redux'
    ReactDOM.render(
      <Provider store={ store }>
        <App/>
      </Provider>
    , document.querySelector('#root'))
    
    ```
  - Provider 组件作为提供者，为包裹在内的左右容器组件提供 store ，利用 context 树进行传递

- `connect()` 方法
  - `cnnect()`函数传入一个组件，返回一个高阶组件
      ```javascript
      import { connect } from 'react-redux'
      let HOC = connect()
      let HOCcomponent = HOC(UIcomponent)
      export default HOCcomponent
      // 简写
      exprot default connect()(UIcomponent)
      ```
  - `connect()`接收两个参数，这两个参数分别为两个函数

    - `mapStateToProps()`
      - `mapStateToProps`是一个函数。接收 state。建立一个从（外部的）`state` 对象到（UI 组件的）`props` 对象的映射关系。执行后返回一个**对象**，里面的每一个键值对就是一个映射。**函数返回什么，props 里就有什么**
        ```javascript
        const mapStateToProps = ((state) => { // 函数可以接收到 state
          return {
            state.todos // 返回 state 里的 todos UI组件里的 props 会接收到 todos，可以直接使用 this.props.todos 来调用
          }
        })
        ```
      - `mapStateToProps`会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。

      - 可以接收第二参数，第二个参数代表容器组件的 props 如果容器组件的 props 发生改变也会触发 UI 组件的重新渲染
    - `mapDispatchToProps()`

      - 建立 UI 组件的参数到`store.dispatch`方法的映射。作为函数时会接收 store的 dispatch 方法，返回值是对象，键值对对应 props 接收方法；如果是对象，每个健名对应一个方法名，键值（函数）会被当做一个actionCreator，返回的 action 会有 redux 自动发出。一般以函数的形式直接返回函数，函数内直接 dispatch.**函数返回什么，props就有什么**

      - 同样第二个参数为容器组件的 props

        ```javascript
        const mapDispatchToProps(dispatch) {
          return {
            addTodo (todo) {
              disptach({
                type: 'ADD_TODO',
                todo
              })
            }
          }
        }
        // UI 组件直接调用 addTodo 方法即可完成 disptch
        this.props.addTodo('doSomething')
        ```
      - `bindActionCreator` 方法

        bindActionCreator 方法是 redux 提供的方法，可以将 actionCreator 中的action 集合分别 dispatch ，返回值是一个对象，props 接收这个对象中的键值对
        ```javascript
        import { bindActionCreator } from 'redux'
        import actionCreator from '../store/actionCreator.js' // 自己穿件的actionCreator
        const mapDispatchToProps (dispatch) {
          return bindActionCreator(actionCreator, dispatch)
        }
        // 如果 actionCreator 的集合 为 { addtodo:{ type: 'addtodo' }, add: { type: 'add' } } ，则在 UI 组件 props 中可以这样调用
        this.props.addtodo()
        this.props.add()
        ```
#### redux-thunk
redux 的执行过程中，action 发出后立即执行 reducer 生成state，这时一个同步的过程，那么当我们要执行异步操作会如何呢？

如果我们想要先去经过一个异步操作，再去返回action怎么办，异步逻辑不能写在视图层的组件中，依然需要写在actionCreator中，但是如果有异步操作的话，我们就无法返回action

这个时候我们就需要使用一些redux的中间件工具：redux-thunk、redux-promise、redux-saga

[参考文档](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)
##### 中间件
- 中间件的概念：
  站在框架作者的角度思考问题：如果要添加功能，你会在哪个环节添加？

  1. Reducer：纯函数，只承担计算 State 的功能，不合适承担其他功能，也承担不了，因为理论上，纯函数不能进行读写操作。
  2. View：与 State 一一对应，可以看作 State 的视觉层，也不合适承担其他功能。
  3. Action：存放数据的对象，即消息的载体，只能被别人操作，自己不能进行任何操作。

  想来想去，只有发送 Action 的这个步骤，即store.dispatch()方法，可以添加功能。举例来说，要添加日志功能，把 Action 和 State 打印出来，可以对store.dispatch进行如下改造。
    ```javascript
    let next = store.dispatch;
    store.dispatch = function dispatchAndLog(action) {
      console.log('dispatching', action);
      next(action);
      console.log('next state', store.getState());
    }
    ```
  上面代码中，对`store.dispatch`进行了重定义，在发送 Action 前后添加了打印功能。这就是中间件的雏形。

  - 中间件就是一个函数，对store.dispatch方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。
- 中间件的用法
  - 配置
    ```javascript
    import { createStore, applyMiddleware } from 'redux'
    import thunk from 'redux-thunk'
    import reducer from './reducer'
    const store = createStore(reducer, applyMiddleware(thunk));// 当createStore传入第二个参数作为state初始值时，applyMiddleware就是第三个参数
    ```
  - 中间件的顺序有要求，否则不会出正确结果
    ```javascript
    const store = createStore(
      reducer,
      applyMiddleware(thunk, promise, logger)
    );
    ```
  - `applyMiddleware()`

    Redux 的原生方法，作用是将所有中间件组成一个数组，依次执行。


  - 配置好之后，`actionCreator`方法的返回值可以是一个函数，这个函数会接受dispatch，在这个方法中我们可以执行异步操作然后直接 dispatch 一个 action
    ```javascript
    const actionCreator  = {
        // addNewTodo (title) {// 同步方法直接返回action
        //     let action = { type: ADD_NEW_TODO, title }
        //     return action             
        // }
        addNewTodo (title) {// 异步方法
            //可以直接返回一个接受dispatch的函数，这样的话我们就可以将异步创建的action直接dispatch
            return (dispatch) => {
                backend.saveTitle(title).then(res => {
                    let action = { type: ADD_NEW_TODO, title }
                    dispatch(action)
                })
            }            
        }
    }
    ```
#### react 组件库
- ant-design 
- ant-mobile
