## mainTodoList



## programTodoList
- [ ] 了解 mobx `autorun` 的依赖
- [ ] 回顾 mobx 的用法
- [ ] 了解`legions`的内部封装，如`legions/store`
- [ ] 了解hoolinks-legion-design的组件的内部封装
- [ ] 了解 IOC 编程思想，Rxjs
- [ ] Typescript 的进阶
- [ ] class 写法的回顾
- [ ] 装饰器
- [ ] git 打 tag
- [ ] Lerna
- [ ] iframe
- [ ] IndexDB

## program

### legions-lunar

- schedule
  - schedule：用 mobx 的 autorun 处理了数组的参数，返回一个经过autorun 包装的函数的数组，用于取消订阅
- mobx-decorator
  - submittingAutoMessage(state?: string, store?: string, type?: string, )：主要是应用 mobx 的 reaction 订阅组件的`store[state]`(可以指定 store，订阅的数据是一个`observablePromise`对象)，在 resolved 时，弹出消息。

### store-utils

- 

### legions-decorator

- `urlParams`：

整个项目基于`iframe`的前端微服务，每个模块为一个可单独打包的项目。

- 数据请求

  由于多个模块之间可能存在跨域的问题，因此，需要后端服务去代理前端的请求，使用的是网关代理，将需要请求的具体资源地址和cookie之类的通过header 带到网关，请求到资源后再通关网关返回数据。

- 数据流向

  - 采用了二次封装的 `mobx`作为数据处理。
  - 

### hoolinks-legion-design

- `<QueryConditions/>`

- `<ListPageLayout/>`：一般的列表页面布局

  ![ListPageLayout](https://tva1.sinaimg.cn/large/008i3skNgy1gu9216uohaj616d0didiw02.jpg)
  
  | 参数 | 说明 | 类型 | 默认值 |
  | ---- | ----| ---- | ---- |
  | query | 一般为筛选 | React.ReactNode |  |
  | operation | 一般为列表上的筛选按钮 | React.ReactNode |  |
  | content | 一般为列表组件 | React.ReactNode |  |

- `<HLFormContainer />`：包含筛选的多模块组件

  ![HLFormContainer](https://tva1.sinaimg.cn/large/008i3skNgy1gu92h9qdq1j616a0lmjv302.jpg)

  | 参数       |      | 说明                                                         | 类型                                     | 默认值 |
  | ---------- | ---- | ------------------------------------------------------------ | ---------------------------------------- | ------ |
  | onGetForm  |      | 即将废弃⚠️<br />在componentWillMount阶段执行                  | (WrapperForm, containerInstance) => void |        |
  | group      |      | 模块数组                                                     | Array<IGoup>                             |        |
  | colCount   |      | 表单组件每行的个数span=(24/colCount)，controls中的.iAntdProps.span优先级更高 | Number                                   |        |
  | controls   |      | 由CreateForm生产的组件配置数组                               | Array<CreateForm>                        |        |
  | size       |      | 布局                                                         | string: default ｜ small ｜table         |        |
  | isDragSort |      | 是否可拖动                                                   | Boolean                                  |        |
  |            |      |                                                              |                                          |        |
  
  - WrapperForm: antd 组件`Form.create`包裹后`this.props.form`提供的方法
  - containerInstance：
    - store： HLFormContainer维护的store
      - updateFormInputData：`(uid, formField, parentRef) => void`
        - uid：表单uid
        - formField：表单数据对象
        - parentRef：父组件，传入React.Component对象，调用React.Component.forceUpdate函数直接render
    - uid：
    - viewModel：
      - setFormState： 设置表单组件的属性值
    - localViewModel：
    - freezeUid：
    - decryptionFreezeUid：
    - methods：
      - onSelectSearch：
      - getQuerySelectOption：
    - validateFields：
  - IGoup
    - name:
    - id：唯一标识，用于匹配control中的iAntdProps.groupId
    - active：是否激活，作用于导航
    - isFolding：分组是否折叠
    - className：
    - isShowFormSizeIcon：是否渲染主题风格按钮，分组中之需要一个即可，控制全局布局
  
  > group.length > 6 时，自动开启右侧快捷导航。
  
- `<HLTable />`

