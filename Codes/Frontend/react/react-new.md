---
title: React 少用但有用的API总结（笔记）
date: 2021/4/16 10:52
categories: 
- Code
- React
tags: 
- React
notebook: React
---

## 组件类API

### PureComponent

PureComponent 会做props浅层比较，未改变则不渲染组件

```tsx
class SonComponent extend React.PureComponent {
  
  render() {
    const {data} = this.props
    return <div>
      {data.number}
    </div>
  }
}

class Index extend React.Component {
  state = {
    data: {
      number: 1
    }
  }
  handleClick = () => {
    const {data} = this.state
    data.number = ++data.number
    this.setState({
      data // data 的地址没有改变，不会重新渲染
    })
  }
  
  render() {
    return <div>
      <SonComponent data={this.state.data}></SonComponent>
      <button onCLick={this.handleClick}>click</button>
    </div>
  }
}
```



### memo

`memo`是一个高阶组件，可以包裹类组件和函数组件，接收两个参数，第一个为需要处理的组件，第二为可选参数，决定是否重新渲染的函数，有点类似componentShouldUpdate，缺省时默认对props作浅比较。

```tsx
const Comp: React.FC<{number: number}> = ({number}) => {
  
  return <div>{number}</div>
}

function isEqual(prevProps, nextProps) {
  return prevProps.number !== nextProps.number && nextProps.number > 5 // 返回 true 时，不重新渲染，返回false时重新渲染，和componentShouldUpdate相反
}

const SonComponent = React.memo(Comp, isEqual)

class Index extend React.Component {
  state = {
    number: 1
  }
  handleClick = () => {
    const {number} = this.state
    this.setState({
      number: ++number
    })
  }
  
  render() {
    return <div>
      <SonComponent data={this.state.data}></SonComponent>
      <button onCLick={this.handleClick}>click</button>
    </div>
  }
}
```



### ref

父组件修改子组件

通常情况下，父组件与子组件的交互通常是由`props`的单向数据流来决定，子组件中使用到的props数据决定了其如何渲染，通常情况下是不推荐父组件去使用子组件的方法来修改子组件，因为通常子组件作为一个独立的组件，有一定的封闭性，ref的使用会破坏这种封闭性，父组件调用子组件也不明确子组件内部的情况，带来很多不确定性。

> ref 是不可传递到属性，在子组件中获取props中的ref时，为undefined
>
> ref在组件上时，ref指向组件实例，挂在DOM时，指向DOM

- `refs`

  **已弃用**。官方不推荐使用refs，推荐使用 ref回调函数

  ```react
  class index extend React.Component {
    
    handleClick = () => {
      this.refs.sonComponent // 获取到子组件的实例
    }
    
    render() {
      return <div>
        <SonComponent ref="sonComponent"></SonComponent>
        <button onCLick={this.handleClick}>click</button>
      </div>
    }
  }
  ```

  

- `ref={ref => this.ref = ref}`

  ```react
  class index extend React.Component {
    son = null
    handleClick = () => {
      this.refs.son // 获取到子组件的实例
    }
    
    render() {
      return <div>
        <SonComponent ref={ref => this.son = ref}></SonComponent>
        <button onCLick={this.handleClick}>click</button>
      </div>
    }
  }
  ```

  

- 回传子组件的实例`this`到父组件

  ```react
  class index extend React.Component {
    
    son = null
    
    handleClick = () => {
      this.refs.son // 获取到子组件的实例
    }
    
    render() {
      return <div>
        <SonComponent onRef={ref => this.son = ref}></SonComponent>
        <button onCLick={this.handleClick}>click</button>
      </div>
    }
  }
  
  class SonComponent extend React.Component {
    
    componentDidMount() {
      this.props.onRef(this) // 回调父组件方法
    }
    
    render() {
      return <div>sonComponent</div>
    }
  }
  ```

  

- `createRef`

  ```react
  class index extend React.Component {
    son = React.ceateRef()
    handleClick = () => {
      this.son.current // 实例挂在current上
    }
    
    render() {
      return <div>
        <SonComponent ref={this.son}></SonComponent>
        <button onCLick={this.handleClick}>click</button>
      </div>
    }
  }
  ```

  

- `forwardRef`

  `forwardRef`的作用是传递ref。返回一个react组件

  - 类组件中

    ```tsx
    interface CompProps {}
    class Comp extend React.Component {
    
      render() {
    
        return <div>sonComponent</div>
      }
    }
    
    const SonComponent = React.forwardRef<Comp, CompProps>((props, ref) => { // forwardRef的类型需要注意，具体后续研究
    
      return <Comp {...props} ref={ref}/>
    })
    
    class index extend React.Component {
      son = React.ceateRef<any>() // ref指向的类型，具体后续研究
      handleClick = () => {
        this.son.current // 实例挂在current上
      }
    
      render() {
        return <div>
          <SonComponent ref={this.son}></SonComponent>
          <button onCLick={this.handleClick}>click</button>
        </div>
      }
    }
    ```
  
  - 函数组件中
  
    函数组件不能接收ref
  
    ```tsx
    const Son: React.FC<{}> = React.forwardRef((props, ref) => {
      
      return <div ref={ref}>son</div>
    })
    
    function Father() {
      const ref = useRef(null) // ref.current -> <div>son</div>
      return <div>
      	<Son ref={ref}/>
      </div>
    }
    ```
  
    

### lazy、Suspense

`React.lazy`和`Suspense`组合使用可以在组件加载中优雅降级

```tsx
// Component/son.tsx
class Son extend React.Component<{}, {}>{
	
  render() {
    
    return <div>son</div>
  }
}

const newSon = React.lazy(() => import('./Component/son'))

class Father extend React.Component<{}, {}> {
  
  render() {
    
    return <div>
    	something...
      <React.Suspense fallback={<div>loading...</div>}>
        <newSon />
      </React.Suspense>
    </div>
  }
}
```

`lazy`和`Suspense`结合`react-router-dom`做代码分割

```tsx
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}> {/*Suspense 组件可以包裹多个懒加载组件*/}
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

### Fragments

组件可以包裹多个DOM片段，简写为`<></>`，区别是`<React.Fragment></React.Fragment>`可以使用key属性，未来可能会添加更多的支持，如事件。

### Profiler 

`Profiler`组件可以通过包裹组件来测量树中这部分渲染所需要的开销

```tsx
function App() {
  const onRender = function(
    id: any, // 发生提交的 Profiler 树的 “id”
     phase: any, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
     actualDuration: any, // 本次更新 committed 花费的渲染时间
     baseDuration: any, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
     startTime: any, // 本次更新中 React 开始渲染的时间
     commitTime: any, // 本次更新中 React committed 的时间
     interactions: any // 属于本次更新的 interactions 的集合
  ) {}
  return <div>
  	<React.Profiler id="profilerId" onRender={onRender}>
      <OtherComponent></OtherComponent>
    </React.Profiler>
  </div>
}
```



### StrictMode

严格模式，检测react项目中潜在的问题，不会渲染任何UI组件。

- 识别不安全的生命周期
- 使用过时的字符串 ref API 的警告
- 使用废弃的 findDOMNode 方法警告
- 检测意外的副作用
- 检测过时的 context API



## 工具类

### React.createElement

每个JSX 语法糖实际上是调用`React.createElement(component, props, children)`，这里`component`可以是组件、函数或普通dom的字符串；`props`是`component`的属性集合

```tsx
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>
  }
}

ReactDOM.render(
	<Hello toWhat="World"/>,
  document.getElemnetById('root')
)
```

不使用 JSX 则为

```tsx
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`)
  }
}

ReactDOM.render(
	React.createElement(
  	Hello,
    {toWhat: 'World'},
    null
  ),
  documnet.getElementById('root')
)
```



### cloneElement

`React.cloneElement(element, [props], [...children])`，以element元素为模版克隆并返回新组件。返回元素的props是原始原素props和新props的浅层合并，原始原素的`key`和`ref`将被保留。用这个方法，**可以劫持、混入新元素**。劫持的典型案例：`react-router`的`Switch`组件通过 `path`来匹配组件

```tsx
class Father extends React.Component {
  
  return <div>
    <Son>
      <GrandSon>
				grandSon children
      </GrandSon>
    </Son>
  </div>
}

class Son extends React.Component {
  
  render() {
    return <div>
      <p>this is Son</p>
      {
        React.cloneElement(
        	this.props.children,
          {},
          [
            'has been hijacked'
          ]
        )
      }
    </div>
  }
}

class GrandSon extends React.Component {
  
  render() {
    return <div>
      <p>this is grandSon</p>
      <p>{this.props.children}</p>
    </div>
  }
}
```

结果为：

<img src="https://tva1.sinaimg.cn/large/008eGmZEgy1gpp4iglzx4j308e05gwec.jpg" style="zoom:50%;" />

### createContext

创建`context`对象，提供给组件订阅这个对象，当context对象的值改变时，组件会从组件数中离自己最近的`context.Provider`中获取value的值。

```tsx
// MyContext.tsx
const DEFAULT_VALUE = {name: 'Tim'};
export const MyContext = React.createContext(DEFAULT_VALUE);

// app.tsx
import MyContext from './MyContext'
class App extends React.Component {
  state = {
    name: 'Tom'
  }
  render() {
    <MyContext.Provider value={this.state}>
    	<MyContext.Provider value={{name: 'Sam'}}>
      	<ComponentA />
      </MyContext.Provider>
			<MyContext.Consumer>
        {value => <ComponentB {...value}/>}
      </MyContext.Consumer>
    </MyContext.Provider>
    <ComponentC />
  }
}

// ComponentA.tsx
import MyContext from './MyContext'
class ComponentA extends React.Component {
  render() {
    return <div>{this.context.name}</div>
  }
}
ComponentA.contextType = MyContext

// ComponentB
export default function ComponentB(props) {
  return <div>{props.name}</div>
}

// ComponentC
import MyContext from './MyContext'
export default function ComponentC() {
  const value = useContext(MyContext);
  return <div>{value.name}</div>
}
```

<img src="https://tva1.sinaimg.cn/large/008eGmZEgy1gpq8g8p9nvj306o0bo3yf.jpg" style="zoom:50%;" />



### isValidElement

检测是否为`react element`元素，返回 `true`或者 `false`。在一些公共组件处理时可以增强组件健壮性。

```tsx
const reactEle = <div></div>
const Component = function() {
  return <div></div>
}

React.isValidElement(reactEle) // true
React.isValidElement(Component) // fasle
```



### React.Children 相关的几个API

`React.Children`提供了用于处理`this.props.children`不透明数据结构的几种方法

这里的不透明性：

```tsx
function Text() {
  return <div>hello world</div>
}

function WrapComponent(props) {
  conole.log(props.children)
  return props.children
}

function Index() {
  return <div>
    <WrapComponent>
    	<Text />
      <Text />
      <Text />
    </WrapComponent>
  </div>
}
```

此时：

<img src="https://tva1.sinaimg.cn/large/008eGmZEgy1gpq99xxh77j3102064dgb.jpg" style="zoom:50%;" />

这种时透明的数据结构，我们可以直接遍历

修改`Index`的写法

```tsx
function Index() {
  return <div>
    <WrapComponent>
      {new Array(3).map(() => <Text />)}
      <span>hello world</span>
    </WrapComponent>
  </div>
}
```

变成

<img src="https://tva1.sinaimg.cn/large/008eGmZEgy1gpq9dn445rj311u04q0st.jpg" style="zoom:50%;" />

这种结构我们不能正常遍历，需要借助`React.Children(props.children, item => tiem)`

<img src="https://tva1.sinaimg.cn/large/008eGmZEgy1gpq9jldsgzj311a05ojrv.jpg" style="zoom:50%;" />

> React.Fragment包裹的元素会被当作一个元素

- `React.Children.map(children, function)`

  在children的每个子节点上调用一个函数，如果子节点为`null`或`undefined`，则返回`null`或者`undefined`而不会调用函数

- `React.Children.forEach(children, function)`

  和`React.Children.map`相似，不会返回数组

- `React.Children.count(children)`

  `children`中组件总数，`React.Children.map`的遍历次数

- `React.Children.only(children)`

  验证`children`是否只有一个子节点，有则返回节点，不是唯一则报错。

- `React.Children.toArray(children)`

  将`children`这个复杂结构扁平展开返回，并为每个成员添加一个key



## Hooks

Hooks在另一篇记录

## ReactDom

- `render`

  ```tsx
  ReactDOM.render(element, container[, callback])
  ```

- `unmountComponentAtNode`

  从DOM中写在组件，会将组件的事件处理器和state一并清除。若容器内没有组件，函数返回false，成功移除则返回true

  ```tsx
  ReactDOM.unmountComponent(container); 
  ```
  > `unmountComponent`只可以卸载类似由`ReactDOM.render`渲染的组件

- `createProtal`

  createProtal 是将子节点渲染到 DOM 节点中的方法，这个子节点可以存在于父节点之外

  ```tsx
  function Protal() {
    const ele = <div>in body</div>
    return ReactDOM.createProtal(ele, document.body);
  }
  ReactDOM.render(Protal, document.getElementById('root'));
  ```

  <img src="https://tva1.sinaimg.cn/large/008i3skNgy1gpthkrar2xj30vg0ckmxu.jpg" style="zoom:33%;" />

  可以看到 `ele`节点被渲染到了body之中。全局弹窗组件`modal`可以用此方法实现挂载到body之中。