
### react
轻量级视图层框架

#### JSX （javascript xml）
JSX 借鉴了 xml 的语法，但是因为是 javascript 语法，所以应遵循 js 语法规则（关键字。。。）

#### prop 和 state
- getDefaultPorps()
  - 挂载默认属性，当给组件设置属性的时候会覆盖掉（优先级低）
- getInitialState
- setState
#### 组件生命周期
- 初始化阶段钩子函数
  - getDefaultPorps () 
    - 特点： 
      - 不管实例化多少次组件，只执行一次，因为组件实例间的默认属性是共享的
  - getInitailState () {}
    - 每次实例化组件
  - componentWillMount () {}
  - render () {}
  - componentDidMount () {}
- 组件运行阶段钩子函数
  - componentWillReceiveProps (props, state) {}
    - 这时得知属性的变化，执行对应操作
    - 如： 当传入
  - shouldComponentUpdate () {}
    - 
  - render () {}
    - 组件重新渲染
  - componentDidUpdate () {}
    - 更改
- 组件销毁阶段
  - componentWillUnmount () {}

#### react
- ref
- 在表达式中放入数组，元素会被输出
