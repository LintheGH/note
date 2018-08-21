
## 路由`vue-router`

*   单页面应用 SPA(sigle page application)  

    *   单页面应用就是用户通过某些操作更改地址栏url之后，动态的进行不同模板内容的无刷新切换，用户体验好。
    *   Vue中会使用官方提供的vue-router插件来使用单页面，原理就是通过检测地址栏变化后将对应的路由组件进行切换（卸载和安装）
*   简单的路由使用  

    1.  引入vue-router，如果是在脚手架中，引入VueRouter之后，需要通过Vue.use来注册插件

        import Vue from 'vue'
        import Router from 'vue-router'
        Vue.use(Router)

1.  创建router路由器

        new Router(options)

1.  创建路由表并配置在路由器中
    ```
    var routes = [
        {path,component}//path为路径，component为路径对应的路由组件
    ]
    ```

##### vue-router

现在的应用都流行SPA应用（single page application）

传统的项目大多使用多页面结构，需要切换内容的时候我们往往会进行单个html文件的跳转，这个时候受网络、性能影响，浏览器会出现不定时间的空白界面，用户体验不好

单页面应用就是用户通过某些操作更改地址栏url之后，动态的进行不同模板内容的无刷新切换，用户体验好。

Vue中会使用官方提供的vue-router插件来使用单页面，原理就是通过检测地址栏变化后将对应的路由组件进行切换（卸载和安装）

###### 简单路由实现：

1. 引入vue-router，如果是在脚手架中，引入VueRouter之后，需要通过Vue.use来注册插件
```
    import Vue from 'vue'
    import Router from 'vue-router'
    Vue.use(Router)
```
2. 创建router路由器
```
    new Router(options)
```
3. 创建路由表并配置在路由器中
```
    var routes = [
        {path,component}//path为路径，component为路径对应的路由组件
    ]

    new Router({
        routes
    })
```
4. 在根实例里注入router,目的是为了让所有的组件里都能通过this.$router、this.$route来使用路由的相关功能api
```
    new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
    })
```
5. 利用router-view来指定路由切换的位置

6. 使用router-link来创建切换的工具，会渲染成a标签，添加to属性来设置要更改的path信息，且会根据当前路由的变化为a标签添加对应的router-link-active/router-link-exact-active（完全匹配成功）类名
```
<router-link to="main">main</router-link>
<router-link to="news">news</router-link>

.router-link-active{
    color:red;
}
```

###### 多级路由:

在创建路由表的时候，可以为每一个路由对象创建children属性，值为数组，在这个里面又可以配置一些路由对象来使用多级路由，注意：一级路由path前加'/'

```
const routes = [
  {path:'/main',component:AppMain},
  {path:'/news',component:AppNews,children:[
    {path:'inside',component:AppNewsInside},
    {path:'outside',component:AppNewsOutside}
  ]},
]
```

二级路由组件的切换位置依然由router-view来指定（指定在父级路由组件的模板中）

```
<router-link to='inside'>inside</router-link>
<router-link to='outside'>outside</router-link>

<router-view></router-view>
```

###### 默认路由和重定向：

当我们进入应用，默认像显示某一个路由组件，或者当我们进入某一级路由组件的时候想默认显示其某一个子路由组件，我们可以配置默认路由：
```
{path:'',component:Main}
```
当我们需要进入之后进行重定向到其他路由的时候，或者当url与路由表不匹配的时候：
```
{path:'',redirect:'/main'}
///...放在最下面
{path:'**',redirect:'/main'},
```

###### 命名路由

我们可以给路由对象配置name属性，这样的话，我们在跳转的时候直接写name:main就会快速的找到此name属性对应的路由，不需要写大量的urlpath路径了

###### 动态路由匹配

有的时候我们需要在路由跳转的时候跟上参数，路由传参的参数主要有两种：路径参数、queryString参数

路由参数需要在路由表里设置

```
{path:'/user/:id',component:User}
```
上面的代码就是给User路由配置接收id的参数，多个参数继续在后面设置

在组件中可以通过this.$route.params来使用

queryString参数不需要在路由表设置接收，直接设置？后面的内容，在路由组件中通过this.$route.query接收



###### router-link

`<router-link>` 组件支持用户在具有路由功能的应用中（点击）导航。 通过 to 属性指定目标地址，默认渲染成带有正确链接的 <a> 标签，可以通过配置 tag 属性生成别的标签.。另外，当目标路由成功激活时，链接元素自动设置一个表示激活的 CSS 类名。

router-link的to属性，默认写的是path（路由的路径），可以通过设置一个对象，来匹配更多
```
:to='{name:"detail",params:{id:_new.id},query:{content:_new.content}}'
```
name是要跳转的路由的名字，也可以写path来指定路径，但是用path的时候就不能使用params传参，params是传路径参数，query传queryString参数

replace属性可以控制router-link的跳转不被记录\

active-class属性可以控制路径切换的时候对应的router-link渲染的dom添加的类名

##### 编程式导航

有的时候需要在跳转前进行一些动作，router-link直接跳转，需要在方法里使用$router的方法

router.push = router-link:to
router.replace = router-link:to.replace
router.go() = window.history.go


##### 路由模式

路由有两种模式：hash、history，默认会使用hash模式，但是如果url里不想出现丑陋hash值，在new VueRouter的时候配置mode值为history来改变路由模式，本质使用H5的histroy.pushState方法来更改url，不会引起刷新，但是需要后端进行路由的配置

##### 路由钩子

在某些情况下，当路由跳转前或跳转后、进入、离开某一个路由前、后，需要做某些操作，就可以使用路由钩子来监听路由的变化

全局路由钩子：
```
router.beforeEach((to, from, next) => {
    //会在任意路由跳转前执行，next一定要记着执行，不然路由不能跳转了
  console.log('beforeEach')
  console.log(to,from)
  //
  next()
})
//
router.afterEach((to, from) => {
    //会在任意路由跳转后执行
  console.log('afterEach')
})
```

单个路由钩子：
只有beforeEnter，在进入前执行，to参数就是当前路由
```
 routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
```

路由组件钩子：
```
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }

```

##### 命名视图

有时候想同时（同级）展示多个视图，而不是嵌套展示，例如创建一个布局，有 sidebar（侧导航） 和 main（主内容） 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default。
```
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```
一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置（带上 s）：
```
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,//默认的，没有name的router-view
        a: Bar,
        b: Baz
      }
    }
  ]
})
```
