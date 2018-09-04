
## vuex 状态管理工具
- 状态管理工具:集中式地管理所有组件共享状态，解决多组件状态共享问题
- 单个组件的单向数据流
  ![单向数据流](https://vuex.vuejs.org/flow.png)
  当多个组件共享同一个状态时就会显得流向不明确
- ![vuex](https://vuex.vuejs.org/vuex.png)
- store
仓库（store），响应式状态（数据）存储，只能通过mutation 修改
    ```
    import Vuex from 'vuex'
    Vue.use(Vuex)
    const state = {
      count: 0
    }
    const mutations = {
      increment (state) {//会接收 state
        state.count++
      }
    }
    const actions = {
      //...
    }
    const getters = {
      //...
    }
    const store = new Vuex.Store({
      state,
      mutations,
      actions,
      getters
    })

    new Vue({
      el: #app,
      store,// 把 stroe 注入所有组件
    })
    ```
  - state：唯一数据源，保存状态
    - 组件在使用的时候可使用 this.$store.state 访问state 的数据，为了做到响应式，需要使用计算属性接收,可以使用 mapState 辅助方法
    ```javascript
    computed: {
      number () {
        return this.$store.state.number//数据响应式
      }
    }
    // 引用 import { mapState } from 'vuex',映射 computed 到 state 的对应数据
    computed: mapState ({
      number: function (state) {return state.number}
      //使用箭头函数
      number: state => state.number
      
      //等同于 state=> state.number
      number: 'number'
    })
    //计算属性名称和 state 子节点名称相同
    computed: mapState(['number'])
    //
    computed: {
      ...mapState(['number']),
      // 自己的一些计算属性
    }
    ```
  - getters：
    - 有的时候需要根据一条现有的状态派生新状态，比如，根据 当前用户的购物车里的商品数据，需要得到用户购物车的总价钱，我们就可以利用getters来派生数据
    ```javascript
    const store = new Vuex.store({
      state: {},
      getters: {
        doubleNubmer (state) {
          return state.number*2
        }
      }
    })
    
    // 组件中计算属性调用，映射
    computed: {
      doubleNubmer () {
        return this.$stroe.getters.doubleNubmer
      }
    }
    // 也可以使用 mapGetters() 辅助函数
    ```
  - mutations：更改数据的唯一方法,必须同步
    - 更改 store 中状态 state 的唯一方法,对象中包含字符串类型的 事件类型 和 回调函数 ，组件通过 `this.$stroe.commit()`调用mutations中的方法
    ```javascript
    mutations: {
      increment (state,payload) {
        state.count += payload.number
      }
    }
    // 组件调用
    this.$stroe.commit('increment',{num:2})
    //对象方式调用
    this.$stroe.commit({
      type:'increment',
      num:2
    })//对象对整个传给 payload
    ```
    - 除此之外，还可以使用辅助函数 `mapMutations()`映射到组件 methods 
    ```javascript
    ...mapMutations([
      'increment',// this.increment() 映射为 this.$stroe.commit('increment')
      'incrementBy'// this.incrementBy() 映射为 this.$stroe.commit('incrementBy')
    ]),
    ...mapMutations({
      add: 'increment' // this.add() => this.$store.commit('increment')
    })
    
    ```
    - **mutations 中的函数必须是同步的！！**
  - actions: 异步操作，提交 mutations 
    - 通过传入的 context 中的 commit 提交 mutations 而非直接修改 state
    - 可包含异步操作
    ```javascript
    // 注册 actions 
    actions: {
      increment (context) {//context 有 store 实例的方法和属性
        context.commit('increment')
      },
      incrementAsync(context.payload) {// 第二个参数接收传递过来的payload
        context.commit(payload)
      }
    }
    //在组件中触发
    this.$store.dispatch('increment')
    // 对象模式
    this.$store.dispatch({
      type:'incrementAsync',
      amount:5
    })
    //也可以用 mapActions() 辅助函数
    ```
  - modules：
    - store 是唯一数据源，因此通常所有状态集合在一起会十分庞大，因此可以使用模块分割的方法
    ```javascript
    const moduleA = {
      state: { ... },
      mutations: { ... },
      actions: { ... },
      getters: { ... }
    }

    const moduleB = {
      state: { ... },
      mutations: { ... },
      actions: { ... }
    }

    const store = new Vuex.Store({
      modules: {
        a: moduleA,
        b: moduleB
      }
    })
    ```

  > `...`展开运算符：将对象展开拼接到目标对象中
  >  ```javascript
  >    var obj1 = {1,2,4}
  >    var obj2 = {a,b,c,...boj1}//{a,b,c,1,2,4}
  >  ```

  `mapMutations()`、`mapGetters()`、`mapActions()`、`mapState()`辅助方法的用法相同

