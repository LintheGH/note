---
title: Vue
categories: 
- Code
- Vue
tags: 
- Vue
---

## vue
- ‘渐进式’、‘自底向上增量开发’

## MVC/MVVM/MVP - 设计思想、设计模式
> 设计思想：应用与设计应用结构的思想，就是设计思想

- MVC认为应用分为
	-  M:model(数据模型)
	-  V：view（视图层）
	-  C：controller（控制）
![Alt text](./bg2015020105.png)

>    基本的MVC模式中所有通信单向，view发送指令到controller，controller完成业务逻辑要求model更改转改，完成更新的model反映到view，用户得到反馈。根据互动模式的不同产生改变，如用户直接通过controller控制数据反映到view层而view和controller之间不产生联系；用户既控制view层又可以控制controller层，通过view层发送指令让model层发生改变，通过controller控制view和model层

- MVP
	- M：model
	- V：view
	- P：presenter

![Alt text](./bg2015020109.png)
>  controller 改为了presenter，改变了通信方向。M层和V层不联系，所有联系之间都是双向的（单向双箭头），presenter层非常厚，而view层非常薄

-  MVVM分为
	-  M:model（数据模型）
	-  V:view（视图层）
	-  VM：viewmodel
 ![Alt text](./bg2015020110.png)


>  V和VM采用双向绑定方式，view改变自动反应到viewmodel，反之亦然，model和view之间没有直接联系

- MVVM、MVC的区别
	- 

## Vue及时响应原理
- Vue中使用了一个叫做Object.defineproperty的ES5的api
- Vue中实例的数据都是用Object.defineProperty()方法处理过的，每一个数据都有自己的setter和getter，当更改数据时，对应的setter就会执行，属性中watcher()方法就会马上通知视图层进行更改

``` javascript

```

## 关于Object.defineProperty()方法
- 语法：`Object.defineProperty(obj,name,descriptor)`
	-  obj：必需。目标对象 
	-  prop：必需。需定义或修改的属性的名字
	-  descriptor：必需。目标属性所拥有的特性

-  返回值：传入函数的对象。即第一个参数obj

-  descriptor：包含数据属性描述和存储器描述
	-  数据属性：
		-  1.Configurable：默认为true。表示能否通过delete删除属性从而重新定义属性，能否修改属性特性，或者能否把属性修改为访问器属性；
		-  2.Enumerable：默认为true。表示能否通过for-in循环返回属性；
		-  3.Writable：默认为true。表示能否修改属性的值。
		-  4.Value：默认值为undefined。表示包含属性的数据值。读写属性值都从这个位置进行。
	-  访问器属性
		-  1.Configurable：默认为true。表示能否通过delete删除属性从而重新定义属性，能否修改属性特性，或者能否把属性修改为访问器属性；
		- 2.Enumerable：默认为true。表示能否通过for-in循环返回属性；
		-  3.Get：读取属性时调用的函数，默认为undefined；
		-  4.Set：写入属性时调用的函数，默认为undefined。

> 数据属性和访问起属性仅能存在一个


## 指令
>  1.带v-都是vue指令
>  2.指令作用于标签
>  3.指令的作用是操作DOM

- `v-for` 循环指令 
	- 预期：Array | Object | String | Number
	- 语法：`alias in expression`
		- `<div v-for="(item, index) in items"></div>`
		-  `<div v-for="(val, key) in object"></div>`
		-  `<div v-for="(val, key, index) in object"></div>`
	- 作用于需要循环的标签
	- 当数据中有重复数据，可能会引起报错
		-  数据变化后，vue采用“就地复用”策略，不会移动已存在DOM元素的顺序，更新的数据顺序不会重排。为了重用和重新排序，需要设定每一项唯一的`key`属性。**在循环的时候需要给dom添加动态的key ,保证key都不相同，这样的话能提高vue对比的效率，提高性能**
	``` 
	<div v-for="item in items" :key="item.id">
	  <!-- 内容 -->
	</div>
	```
	-  template
		-  template标签在渲染时忽略
		>  vue 对实例对象标签内的操作是重新渲染，故一般不在vue实例对象外做DOM操作，所造成的现象就是：vue实例内的内容都是“假的”。

-  v-on 简写：`@` 监听 DOM 事件
	-  语法：`v-on:事件名 = 'fn'`
	-  实例中的复杂方法写入到methods中
	-  methods方法中会自动接收事件对象, 但是当我们传参的时候，如果需要事件对象的话，得手动的传入`$event`来表示事件对象
	-  事件修饰符
		-  stop  阻止冒泡
		-  prevent  阻止默认事件
		-  self  只当在 event.target 是当前元素自身时触发处理函数（阻止所有子元素中的同名事件冒泡）
		-  passive  提升移动端性能，不组织默认事件
		- 按键修饰符
			- enter、delete、space、left、right、middle
			- .keycode => `v-on:keyup.13 = fn`
			

-  v-model  表单输入绑定，它会根据控件类型自动选取正确的方法来更新元素。
	-  v-model实现的是一个功能：双向数据绑定
	-  自动选取正确的方法更新
		-  如`<input type="checkbox" v-model='toggle'>`和`<input type="checkbox" value="selected" v-model= 'status'>`不同的显示方式
		-  修饰符
			-  lazy  在“change”时而非“input”时更新
			-  number  自动将用户的输入值转为数值类型
			-  trim  自动过滤用户输入的首尾空白字符
>  声明式渲染 || 数据驱动：声明式渲染即：在实例中声明数据，然后通过 `{{}}` mustache 表达式，在视图中输出数据
>  视图中所有显示变化的情况，都应该有一条数据来与之对应

-  v-bind 简写 `:`
	-  预期：`any (with argument) | Object (without argument)`
	-  与class和style绑定  class和stle的绑定类型除了是string之外还可以是对象或数组
		-  对象语法
			-  `<div v-bind:class="{ active: isActive }"></div>`
			-  可以与普通静态class属性共存
			-  也可以与返回对象的计算属性绑定
		-  数组语法
			-  `<div v-bind:class="[activeClass, errorClass]"></div>`
			-  `<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>`
			-  `<div v-bind:class="[{ active: isActive }, errorClass]"></div>`

-  v-if  控制元素是否显示、
	-  
-  v-cloak
	-  当元素上加上v-cloak指令的时候，在vue没有加载的时候，这个指令就相当于p标签的一个标签属性，当vue加载完成后，会将这个指令去掉
	-  依靠这个属性可以实现防止`{{}}`闪烁

-  v-text
	-  v-text会将绑定的dom的innerText改成指定的数据

-  v-html
	-  v-html和v-text唯一的区别就是可以解析标签，**慎用，性能耗费比v-text高**


## 计算属性和监听
- watch 监听
	- watch 可以监听数据的变化
	```
	 new Vue({
	    el:"#app",
	     data: {
	         username: '',
	         message: ''
	     },
	     watch: {//当username数据变化之后会执行，new_val为更改后的值，old_val为更改前的值
	         username: {
	             immediate: true,//默认执行一次
	             deep:true, //深度监听
	             handler (new_val, old_val) {
	                 console.log('哈哈')
	                 if ( new_val.length > 12 || new_val.length < 6 ) {
	                     this.message = '用户名必须大于6位，小于12位'
	                 }else {
	                     this.message = ''
	                 }
	             }
	         }
	     }
	 })
	```

-  计算属性
	-  根据一个现有数据去生成一个新数据，并且这两个数据直接会建立永久的关系，并且会建立缓存，当无关数据改变的时候，不会重新计算而是直接使用缓存中的值!!!
	-  


## 全局API

-  `Vue.filter()`
	-  将某种格式的数据在输出的时候转换成另一种格式，原数据不会更改
	-  
-  `Vue.nextTick([callback,context])`
	-  在下次 DOM 更新之后执行延迟回调函数。在修改数据之后立即执行这个方法，可以获取更改后的 DOM 
	```
	vm.msg = 'Hello'//数据更改
	Vue.nextTick(function(){'some JS'})
	```
	-  当没有参数时返回一个 Promise 对象
	```
	Vue.nextTick().then((res)=>{}).catch((err))
	```

 **回流和重绘（reflow、repaint）**
>  修改数据或者直接操作DOM，导致浏览器重新渲染的两种状况，都会影响性能

-  重绘
	-  只修改DOM的background等的属性，不会影响文档流

-  回流
	-  影响文档流解构，消耗性能较高


## 组件
-  通过 `Vue.extend({})`创建组件
	-  组件使用template来确定模板，模板必须有根节点
	-  组件实例需要拥有自己的独立数据，Vue 设计出在组件中函数返回数据的形式，从而实现每个组件实例的数据独立
	-  组件嵌套形成父子组件，组件的嵌套只能形成父子关系，子组件嵌套在父模板中（不是嵌套在组件中）
	```javascript
	//创建组件（全局注册）
	let Hello = Vue.extend({
		template:"<h1>Hello {{ message }} <mark @click = "handleClick">haha</mark> <br/><input type="text" v-model = "message" /></h1>",
		//独立数据，用函数return的形式，函数每次返回的 object 即使形状相同，也为一个全新的object
		data(){
			return {message:'Vue.js'}
		},
		methods:{
			handleClick(){
				alert(1)
			}
		}
	})
	//注册组件
	Vue.component('app-hello',Hello)
	//组件创建注册简写
	var vm = new Vue({
		el:'#app',
		components:{//以键值对的形式定义，键为组件名，值为模板
			'app-component':{
				template:'<div>content</div>',
				data(){return 'some js'}
			}
		}
	})
	```

- 特点：可组合、可重用、可测试、可复用
- 组件使用
	- 组件想要使用，不许先注册，分为全局注册和局部注册
	- 全局注册 => 全局组件，能在任意实例，组件的**模板**中使用
	- 某个实例/组件中注册 => 局部组件，只能在注册所在位置中使用
	>  组件的编译 ：组件在编译自己的模板过程中发现某个组件（如 Hello 组件），就会实例化组件 `new Hello()`，得到一个组件实例
	

- 可以在 body 中创建 template 模板标签在组件里指定 template ，用 ID 作为标记
-  组件嵌套及父组件传递数据到子组件中
	-  子组件通过props接收
```html
	<div id="app">
			<app-movies-list></app-movies-list>
		</div>
		<template id="app-movies-list">
			<ul>
                <app-movies-item
                    v-for = '(move ,index) in movies'
                    :key = index
                    :title = 'move'
                >
			    </app-movies-item>
            </ul>
		</template>
		<template id="app-movies-item">
		
			<li>
                {{ title }}	
            </li>	
		</template>	
	<script>
		Vue.component('app-movies-list',{
			template:"#app-movies-list",
			data(){
				return {
					movies:['西红柿首付','狄仁杰：四大天王','摩天营救']
				}
			}
		});
		Vue.component('app-movies-item',{
			template:"#app-movies-item",
			props:['title']
		})
		var vm = new Vue({
			el:'#app',
			data:{
			}
		})
	</script>
```
-  **`is`：Vue 在解析模板时有一定的规则 ，table 内只能出现 tr 等的限制，通过在元素标签添加 `is="component name"`属性来告诉 Vue 元素以组件渲染**
	-  以下来源没有条件限制
		-  字符串 (例如：`template: '...'`)
		-  单文件组件 (`.vue`)
		-  `<script type="text/x-template">`
	-  `is`可以用来做 tab 标签切换
>  组件名：遵循 W3C 规范，自定义组件名全小写字母必须包含连字符（自定义元素规范）
>  


- **props:** 
	- Object` || `Array`，传递的名称有连接符时，子组件用小驼峰命名接收
	```javascript
	//父组件中以'post-title' 命名传递
	 props: ['postTitle'],
	```
	- 数据验证，父组件传递过来的数据需要做数据验证，遇到错误类型会在控制台中显示出来
	```javascript
	props: {
	    // 基础的类型检查 (`null` 匹配任何类型)
	    propA: Number,
	    // 多个可能的类型
	    propB: [String, Number],
	    // 必填的字符串
	    propC: {
	      type: String,
	      required: true
	    },
	    // 带有默认值的数字
	    propD: {
	      type: Number,
	      default: 100
	    },
	    // 带有默认值的对象
	    propE: {
	      type: Object,
	      // 对象或数组且一定会从一个工厂函数返回默认值
	      default: function () {
	        return { message: 'hello' }
	      }
	    },
	    // 自定义验证函数
	    propF: {
	      validator: function (value) {
	        // 这个值必须匹配下列字符串中的一个
	        return ['success', 'warning', 'danger'].indexOf(value) !== -1
	      }
	    }
	  }
	```
	- **单向数据流：数据只能从父级组件流向子级组件**

-  组件间通信
	-  在每个组价的实例中，都存在 `$root` , `$parent`, `$children`，分别代表根实例，父组件，子组件，因此可以在各自中进行组件间通信（不推荐实现数据更改，违背单项数据流）
		-  **父组件重新设置data会触发 Vue 重新渲染 DOM ，重新给子组件传入新数据**
	-  组件间通信通过传递事件，子组件触发事件实现
	-  组件能够实现子组件事件绑定和触发，其实就是组件能够像普通元素一样绑定事件
		-  通过内建的 `$emit` 方法传入事件名触发父级组件的事件
```
//子组件中
<button v-on:click="$emit('enlarge-text')">
 Enlarge text
</button>
//父组件中
<blog-post
 v-on:enlarge-text="postFontSize += 0.1"
></blog-post>
```
- 
	-  `ref`  ： `string`类型，给元素或组件注册引用信息，引用信息会注册在父组件的 $refs 对象上，通过 `this.$refs.注册名` 就可调用 
-  非父子组件间通信：`event_bus` 事件总线
	-  利用空实例
	-  
-  组件绑定原生事件：`.native`修饰符
	-  组件根元素无法触发绑定的事件时，使用 `$listeners` 结合`v-on:'$listener'` 将所有事件绑定到特定元素上
-  `slot` 插槽
	-  component-tag 中的内容 Vue 在编译的时候，会忽略，如果要实现显示内容的效果，可以用`<slot></slot>`来接收内容
	-  具名插槽
		-  通过 `slot` 的特殊属性 `name` 命名 slot 来定义多个插槽，在组件模板中使用的时候在 tag 内添加对应的 name 即可，`<app-template><h1 slot="name">标题1</h1></app-template>` 或 `<app-template><template slot="name"></template></app-template>`

## 过渡、动画
-  `transition`
	-  为需要过渡效果的元素、组件外部套上`<transition></transition>`标签，Vue 会在特定事件给目标添加删除类名
		1. ` v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
		2. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
		3. `v-enter-to`: 2.1.8版及以上 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。
		4. `v-leave`: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
	5.	`v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
		6. `v-leave-to`: 2.1.8版及以上 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。
![enter image description here](https://cn.vuejs.org/images/transition.png). 
对于这些在过渡中切换的类名来说，如果你使用一个没有名字的 <transition>，则 v- 是这些类名的默认前缀。如果你使用了 <transition name="my-transition">，那么 v-enter 会替换为 my-transition-enter
	-  自定义类名
		-  `enter-class`
		-  `enter-active-class`
		-  `enter-to-class` (2.1.8+)
		-  `leave-class`
		-  `leave-active-class`
		-	`leave-to-class `(2.1.8+)

## render 函数



## 全局属性
> 伴随实例化 Vue 对象而来的属性，实例名称根据具体而定，这里假定为 vm

- vm.$slots
	- 类型： `[name:string,...]`

## 生命周期，钩子函数

-  **实例生命周期**：组件的声明周期分为三个阶段：初始化、运行中、销毁
	-  组件实例化开始，到出现在页面中 => 初始化
	-  组件使用过程中 => 运行中
	-  组件从准备销毁到销毁之后 => 销毁阶段
- **生命周期的钩子函数**：在生命周期中有很多特殊的时间点，有一些函数会在这些时间点上自动执行，这些函数称为钩子函数
![enter image description here](https://cn.vuejs.org/images/lifecycle.png)

### 整个生命周期及其钩子函数的作用
-  **初始化声明周期、添加事件监听**：使用组件时，会马上实例化组件得到一个组件的实例，然后给实例添加一些事件监听和初始化生命周期，然后执行 `beforeCreate` 钩子函数
	>  **钩子函数 `beforeCreate`** ：
	> 此时数据没有挂载，DOM 没有渲染
	
-  **挂载数据、绑定数据监听**：然后执行 `created`
 	>  **钩子函数 `created` **：
	>  特点：数据挂载，还未渲染 DOM ，此时修改数据不会触发 updated 函数，即不会重新渲染 DOM 
	>  作用：可以做一些初始数据的获取、更新

-  **查找模板，编译虚拟 DOM **:查找模板，将其编译成虚拟 DOM 结构，将其放入到 render 函数中等待渲染，然后执行 `beforeMount` 钩子函数
	>  **钩子函数 `beforeMount`**：
	>  特点和作用跟 `created`一样
	
- **渲染虚拟 DOM 到页面中，挂载$el 属性**：渲染出真实dom，然后执行mounted钩子函数，此时，组件已经出现在页面中，数据、真实dom都已经处理好了,事件都已经挂载好了
	> **钩子函数 `mounted`**：
	> 特点：能访问到数据，也能操作真实 DOM ，此时再去修改数据会触发 updated 函数，重新渲染 DOM
	> 作用：操作真实 DOM ，实例化一些组件

-  **运行阶段更新数据**：此时进入运行阶段，更改数据会马上触发 `beforeUpdate` 
	>  特点：数据已经更改，DOM 没有更新
	>  作用：没有什么作用，**不能更改数据，会在成死循环**

-  **重新渲染**：创建虚拟 DOM ，重新渲染，执行 updated
	>  **钩子函数`updated`**：
	>  特点：dom 已经更新
	> 作用：依然**不能修改数据**，可以做一些 DOM  修改

-  **进入销毁阶段**：`vm.$destroy`实例的方法被调用时进入销毁阶段，比如切换插件，路由跳转等会触发 vm.$destroy 执行，马上执行钩子函数 `beforeDestroy`
	> **钩子函数`beforeDestroy`**：做一些善后工作，比如清除定时器
	 
-  **销毁**：清除事件、数据监听、绑定，只留下 DOM 结构的空壳，执行 `destroyed`
	>  **钩子函数`destroyed`**和 beforeDestroy 一样

## Vue CLI 脚手架
-  安装 vue-cli （脚手架）
	1. 全局安装 vue-cli：`npm install --global vue-cli`
	2. 创建一个基于 webpack 模板的新项目：`vue init webpack my-project`（init之后可以定义模板的类型）
	3. 安装依赖：`cd my-project`、 `npm install`、 `npm run dev`
- vue-cli没有内置sass编译，我们需要自己修改配置

	1. 下载对应工具：node-sass(4.0.0) sass-loader

	2. 在build目录下的webpack.base.conf.js中的module.rule里添加如下配置
		```
		{
		    test: /\.scss$/,
		    loader:'style-loader!css-loader!sass-loader'
		} 
		```
	3. 在需要使用scss代码的组件的style标签中添加 lang='scss'
-  build 文件加放置 webpack 的配置文件，其中 
	-  webpack.base.conf.js 是通用配置
	-  webpack.dev.conf.js 是开发启动项目的配置文件
	-  webpack.prod.conf.js 开发完成打包配置
-  config 文件夹内存放抽离出来封装的配置文件，如开发服务器的配置
-  src 开发目录
	-  webpack 是一个模块打包工具，开发中会写很多模块，这些模块相互依赖，最后放入到一个文件中，此文件为入口文件
	-  main.js 入口文件
	-  单文件组件：后缀 .vue 的文件是一个组件，即一个文件为一个组件，单文件组件包含模板，逻辑，样式，因此便于更新、维护和复用。vue-cli最终会将 *.vue 文件进行编译，脚手架在编译单文件组件的时候会直接将模板编译成 createElement ，用户不必在浏览器中进行编译，提高了页面渲染熟读，提高性能
	-  static 静态文件目录
	-  assets 目录
		-  在 assets 中引入的图片，会被转换成 base64 编码格式，但是体积较大的文件（> 10k）不会转换

## axios 

