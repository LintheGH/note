# phase3 vue.js
## vue
- ‘渐进式’、‘自底向上增量开发’

## MVC/MVVM/MVP - 设计思想、设计模式
> 设计思想：应用与设计应用结构的思想，就是设计思想

- MVC认为应用分为
	-  M:model(数据模型)
	-  V：view（视图层）
	-  C：controller（控制）
  
![Alt text](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015020105.png)

>    基本的MVC模式中所有通信单向，view发送指令到controller，controller完成业务逻辑要求model更改转改，完成更新的model反映到view，用户得到反馈。根据互动模式的不同产生改变，如用户直接通过controller控制数据反映到view层而view和controller之间不产生联系；用户既控制view层又可以控制controller层，通过view层发送指令让model层发生改变，通过controller控制view和model层

- MVP
	- M：model
	- V：view
	- P：presenter

![Alt text](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015020109.png)

>  controller 改为了presenter，改变了通信方向。M层和V层不联系，所有联系之间都是双向的（单向双箭头），presenter层非常厚，而view层非常薄

-  MVVM分为
	-  M:model（数据模型）
	-  V:view（视图层）
	-  VM：viewmodel
 
 
 ![Alt text](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015020110.png)

>  V和VM采用双向数据绑定方式，view改变自动反应到viewmodel，反之亦然，model和view之间没有直接联系

- MVVM、MVC的区别
	- 

## Vue及时响应原理
- Vue中使用了一个叫做Object.defineproperty的ES5的api
- Vue中实例的数据都是用Object.defineProperty()方法处理过的，每一个数据都有自己的setter和getter，当更改数据时，对应的setter就会执行，属性中watcher()方法就会马上通知视图层进行更改

``` javascript

```

### 关于Object.defineProperty()方法
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
>  声明式渲染 || 数据驱动
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

-  v-if  控制元素是否显示
-  v-cloak
	-  当元素上加上v-cloak指令的时候，在vue没有加载的时候，这个指令就相当于p标签的一个标签属性，当vue加载完成后，会将这个指令去掉
	-  依靠这个属性可以实现防止{{}}闪烁

-  v-text
	-  v-text会将绑定的dom的innerText改成指定的数据

-  v-html
	-  v-html和v-text唯一的区别就是可以解析标签，慎用，性能耗费比v-text高


## 计算属性和监听
-  watch 监听
-  计算属性
	-  根据一个现有数据去生成一个新数据，并且这两个数据直接会建立永久的关系，并且会建立缓存，当无关数据改变的时候，不会重新计算而是直接使用缓存中的值!!!
	-  


## 全局API

-  Vue.filter
	-  将某种格式的数据在输出的时候转换成另一种格式，原数据不会更改
	-  


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
	  title: String,
	  likes: Number,
	  isPublished: Boolean,
	  commentIds: Array,
	  author: Object
	}
	```
	- **单向数据流：数据只能从父级组件流向子级组件**

-  组件间通信
	-  在每个组价的实例中，都存在 `$root` , `$parent`, `$children`，分别代表根实例，父组件，子组件，因此可以在各自中进行组件间通信（不推荐实现数据更改，违背单项数据流）
		-  **父组件重新设置data会触发 Vue 重新渲染 DOM ，重新给子组件传入新数据**
	-  组件间通信通过传递事件，子组件触发事件实现
	-  组件能够实现子组件事件绑定和触发，其实就是组件能够像普通元素一样绑定事件
	-  `ref`  ： `string`类型，给元素或组件注册引用信息，引用信息会注册在父组件的 $refs 对象上，通过 `this.$refs.注册名` 就可调用 
-  `slot` 插槽
	-  component-tag 中的内容 Vue 在编译的时候，会忽略，如果要实现显示内容的效果，可以用`<slot></slot>`来接收内容
	-  具名插槽
		-  通过 `slot` 的特殊属性 `name` 命名 slot 来定义多个插槽，在组件模板中使用的时候在 tag 内添加对应的 name 即可，`<app-template><h1 slot="name">标题1</h1></app-template>`

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
