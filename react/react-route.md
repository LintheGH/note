---
title: react-router
tags: router, react-router
notebook: framework
---

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
  

  - react-router 的原生数组对象写法

  ```javascript
  const routeConfig = [
  { path: '/',
      component: App,
      indexRoute: { component: Dashboard },
      childRoutes: [
      { path: 'about', component: About },
      { path: 'inbox',
          component: Inbox,
          childRoutes: [
          { path: '/messages/:id', component: Message },
          { path: 'messages/:id',
              onEnter: function (nextState, replaceState) {
              replaceState(null, '/messages/' + nextState.params.id)
              }
          }
          ]
      }
      ]
  }
  ]

  React.render(<Router routes={routeConfig} />, document.body)
  ```

  - 复合式写法
  ```javascript
  <Router history={hashHistory}>
    {{
        path: '/',
        component: App,
        childRoutes: []
    }}
    {{
      path: '/login',
      getComponent(nextState, callback) {
        require.ensure([], require => {
          callback(null, require('src/login'));
        });
      } // component 的按需加载式写法
    }}
  </Router>
  ```
    - `require-ensure`
      - 说明: `require.ensure`在需要的时候才下载依赖的模块，当参数指定的模块都下载下来了（下载下来的模块还没执行），便执行参数指定的回调函数。`require.ensure`会创建一个chunk，且可以指定该chunk的名称，如果这个chunk名已经存在了，则将本次依赖的模块合并到已经存在的chunk中，最后这个chunk在webpack构建的时候会单独生成一个文件。
      - 语法:`require.ensure(dependencies: String[], callback: function([require]), [chunkName: String])`
        - `dependencies`: 依赖的模块数组
        - `callback`: 回调函数，该函数调用时会传一个require参数
        - `chunkName`: 模块名，用于构建时生成文件时命名使用
      - 注意点：`requi.ensure`的模块只会被下载下来，不会被执行，只有在回调函数使用`require(模块名)`后，这个模块才会被执行。

- 路由的按需加载
  - 定义加载组件：
    ```javascript
    import React, { Component } from "react";

    export default function asyncComponent(importComponent) {
      class AsyncComponent extends Component {
        constructor(props) {
          super(props);

          this.state = {
            component: null
          };
        }

        async componentDidMount() {
          const { default: component } = await importComponent();

          this.setState({
            component: component
          });
        }

        render() {
          const C = this.state.component;

          return C ? <C {...this.props} /> : null;
        }
      }

      return AsyncComponent;
    }
    ```
  - 路由表中使用加载组件：
    ```javascript
    const Buttons = asyncComponent(() => import("./button"));
    ```
  - babel 配置
    ```javascript
    "presets": [
      [
        "es2015"
      ],
      "stage-1", // 应用了es7的语法，所以必须有这个配置
      "react"
    ],
    ```