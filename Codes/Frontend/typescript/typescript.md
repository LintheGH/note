---
title: TypeScript
categories: 
- Code
- TypeScript
tags: 
- TypeScript
---

### TypeScript 
---

- `TypeScript`: `JavaScript`的超类
	主要提供了**类型系统**和对**ES6的支持**，第一个版本发布于2012年10月。
	
- 基本类型
	- `number`
		
		```TypeScript
		let num1: number = 1
		let num2: number = NaN
		let num3: number = Infinity
		```
		
	- `boolean`
		```TypeScript
		let boolean1: boolean = true
		let boolean2: boolean = new Boolean(true) // error
		```
	
	- `string`
		```TypeScript
		let srt1: string = 'hello'
		let str2: string = new String('hello') //  error
		```
	
	- `void`
	
		一般为声明没有返回值的函数，声明变量是只可以是`undefined`和`null`
	
		```TypeScript
		function voidReturn(params): void {
			//return 'hello' // error
	
			console.log('no return');
		}
	
		let voidValue1: void = undefined
		let voidValue2: void = null
		let voidValue3: void = 1111 //  error
		```
	
	- `undefined`
	
		`undefined`是所有类型的子集，而`void`不是
		```TypeScript
		let undefinedValue: undefined = undefined
		let nullValue: null = null
	
		let num1: number = undefinedValue
		let num2: number = nullValue
	
		let voidValue: void = undefined
		let num3: number = voidValue // error
		```
	
	- `any`
	
		普通类型在执行过程中不允许修改变量类型，而`any`类型可以修改其值类型。声明变量时如果未声明类型，默认为`any`类型
	
		```TypeScript
		let num1: number = 1123
		num1 = '1111' // error
		
		let anyValue: any = 123123
		anyValue = '121323'
		let anyValue1 = 1231231232
		// 相当yu let anyValue1: any = 1231231232
		```
	
- 对象类型--接口`interface`

	对类的行为的抽象，常用于对对象形状（shape）的描述

	```TypeScript
	interface Person {
		name: string,
		age: number,
	}
	
	let tom: person { //  约束tom对象形状与person一致
		name: 'tom',
		age: 24
	}
	```

	对象的属性比接口的属性少或者多都是不允许的

	```TypeScript
	interface Person {
		name: string,
		age: number,
	}
	
	let tom: Person {
		name: 'tom',
	} //  error
	let jim: Person {
		name: 'jim',
		age: 25,
		gender: 1
	}
	```

	可选属性与任意属性:
	当定义了任意属性后，确定属性和可选属性的类型必须为任意属性的子集

	```TypeScript
    interface Person {
      name: string,
      age: number,
      gender?: number,
      [propName: string]: any
    }
	
    let tom: Person {
      name: 'tom',
      age: 24,
      gender: 1,
      heair: 'yello',
    }
    interface Person1 {
      name: string,
      age: number,
      gender?: number,
      [propName: string]: string
    }
	
    let jim: Person1 {
      name: 'tom',
      age: 24,
      gender: 1,
      hair: 'yello',
    } //  error 报错，hair  
	```
	只读属性：
	希望对象属性只能在创建时被赋值，可以用`readonly`定义只读属性
	```TypeScript
		interface Animal {
			name: string,
			type: string,
			age: number,
			readonly id: number
		}
	
		let wangcai: Animal = {
			name: 'wangcai',
			type: 'dog',
			age: 2,
		} // 编译时报错，id未定义
	
		let awang: Animal = {
			name: 'awang',
			type: 'cat',
			age: 1,
			id: 12345
		}
		awang.id = 2345 // 编译时报错，'id' is declared here
	```
- 数组类型

	- 类型 + [] 的表示方法
	```TypeScript
		let foo: number[] = [1,2,3,4]

		let bar: number[] = [1,2,'3',4] // error

		let bar2: any[] = ['1212', 1, 2]

		bar.push('222') // error
	```

	- 接口表示数组
	```TypeScript
		interface Foo {
			[index: number]: number,
		}

		let arr: Foo = [1, 1]
		let arr2: Foo = [1, '2'] // error
	```
	接口表示：只要索引的类型是数字时，那么值的类型必须是数字。

	- 数组泛型
		```TypeScript
		let arr: Array<number> = [1, 2, 3, 4]
		```
	- 类数组类型
	```TypeScript
		function sum(): void {
			let arg: number[] = arguments
		} // error

		// 此时arguments为类数组，类数组应该用接口类型，
		function sum2(): void {
			let arg: {
				[index: number]: number,
				length: number,
				callee: function
			} = arguments
		}

		// 也可以用typescript内置接口

		function sum3(): void {
			let arg: IArguments = arguments
		}
	```
	- 函数的类型
		- 函数声明
		```TypeScript
			function sum(x: number, y: number): number {
				return x + y
			}
		```
		- 函数表达式
		```TypeScript
			let sum = function(x: number, y: number): number {
				return x + y
			}
		
			// 上面的定义实际上是左边根据右边的类型推断出来，可以通过编译。若需要手动给左边添加类型，则
			let sum: (x: number, y: number) => number = function(x: number, y: number): number {
				return x + y 
			}
		```
		- 接口定义函数形状
		```TypeScript
			interface myFunc {
				(source: string, subString: string): boolean; 
			}
		 
			let search: myFunc;
		
			search = function(source: string, subString: string): boolean {
				return source.indexOf(subString) !== -1
			}
		
			// 当多个函数使用一样的接口时，可以保证参数个数，参数类型，返回值一致
		```
		> 以上定义在调用函数时参数数量和类型必须严格遵守

		- 可选参数和默认值
		```TypeScript
			let buildName = function(firstName: string, lastName?: string): string {
				return firstName + lastName
			}
		
			let buildName2 = function(firstName: string, lastName: string = 'Tim'): string {
				return firstName + lastName
			}
		```
		- 剩余参数
		```TypeScript
			let push = function(array: any[], ...rest: any[]): any[][] {
				return array.concat([], rest)
			}
		```
		- 函数重载
		如果一个函数有多种参数类型对应返回的类型，可以用函数重载，实现不同类型检查
		```TypeScript
			function reverse(target: string): string
			function reverse(target: number): number
			function reverse(target: string | number): string | number {
				if(typeOf target == 'string') {
					return target.split('').reverse().join('')
				}
				if(typeOf target === 'number') {
					return Number(target.toString().split('').reverse().join(''))
				}
			}
		```
		TypeScript 对函数是从前往后匹配，所以包含关系的需要写在后面，精确类型的写在前面

- 类型推论：如果没有明确指定类型，typescript 会自动依照类型推论的规则判断类型

	```TypeScript
		let myNum = 'six'
		muNum = 6 // error
	```
	此时 `myNum` 的类型被推断为 `string`

	```TypeScript
		let myNum;
		myNum = 'six'
		myNum = 6
	```
	如果在定义时没有指定类型，也没有赋值，`TypeScript` 会推断为 *`any`* 类型

- 联合类型：表示取值可以是多种类型中的一种

	```TypeScript
	let myNum: string | number
	
	myNum = 'six'
	myNum = 6
	```
	- *访问联合类型的方法或属性*
		当`TypeScript`无法判断一个联合类型的变量是何种类型时，*只能访问此联合类型的所有类型里共有的方法或属性*
		```TypeScript
		function getLength(target: string | number): number {
			// return target.length // error
			return target.toString().lenght
		}
		```
	- 联合类型在赋值时，会被赋予一种类型
		```TypeScript
		let myCode: string | number;
		myCode = '123456'
		console.log(myCode.length) // 6
		myCode = 123456
		console.log(myCode.length) // error
		```

- 类型断言：用来手动指定某一类型

	语法
	```
	<类型> 值 

	// 或者

	值 as 类型
	```

	- 联合类型只能访问共有的属性和方法，如果需要访问指定类型的方法或属性，需要用断言
		```TypeScript
		interface Cat {
			name: string,
			run(): void
		}
		interface Fish {
			name: string,
			swim(): void 
		}
		
		function ifFish(target: Cat | Fish): boolean {
			if(typeof target.swim =='function') {
				return true
			}
			return false
		} // error
		
		// 上面的例子中，访问 target.swim 会报错，需要用断言指定类型
		function isFish(target: Cat | Fish): boolean {
			if(typeof (target as Fish).swim == 'function') {
				return true
			}
			return false
		}
		function isCat(target: Cat | Fish): void {
			if(typeof (<Cat> target).run == 'function') {
				return true
			}
			return false
		}
		```
		> 但是，上述例子中虽然类型断言能够是typescript编译通过，但是，在运行时，也是可能产生属性、方法访问错误的情况，造成程序崩溃，在开发中应当避免这种情况
		```TypeScript
		let cat: Cat = {
			name: 'tom',
			run(): void {
				console.log('i can run')
			}
		}
		function swim(target: Cat | Fish): void {
			(target as Fish).swim()
		}
		swim(cat) // 虽然能够通过编译，但是在运行时错误
		```

	- 将父类断言为更具体的类

		```TypeScript
		interface Error {
			errorMessage: string
		}
		interface ApiError extends Error {
			code: number
		}
		interface HttpError extends Error {
			statusCode: number
		}

		// 由于需要判断类型是否是 ApiError 或者是 HttpError，因此，肯定需要以更抽象的父类接口来作为类型
		function isApiError(error: Error) {
			// 由于此时是 interface，而不是一个真正的类，在编译结果中会被删除，就无法使用 instanceOf 来判断是不是具体的那个接口，此时需要使用断言
			if(typeof (error as ApiError).code == 'number') {
				return true
			}
			return false
		}
		```
	
	- 将任何类型断言为 `any`

		在某些情况下，我们可以确定某个对象下面有属性和方法，但是typescript在编译过程中并不会正确判断而抛出错误，此时我们可以把这个对象断言为`any`

		```TypeScript
		// window.foo = 1 // 报错，window中没有foo，需要用断言
		(window as any).foo = 1
		```
	
	- 将 `any` 断言为具体类型

		有时由于第三方库或者其他开发者提供的值没有定义具体类型，而为`any`，为了自己能够更好的使用ts的静态类型检查，可以断言为具体类型
		
		```TypeScript
		// 某些第三方库或者其他开发者提供的函数返回的any类型的值
		function getValue(key:string): any {
			return (window as any).cach[key] 
		}
		
		interface Cat {
			name: string,
			run(): void
		}
		
		const tom = getValue('tom') as Cat // 获取到值后断言为 Cat 类型，方便后续的代码自动补全和代码维护
		tom.run()
		```
	- 断言的限制

		若 `A` 兼容 `B` ，`A` 可以断言为 `B`，`B` 也能断言为 `A`

		```TypeScript
		interface Animal {
			name: string
		}
		
		interface Cat {
			name: string,
			run(): void
		}
		
		function testCat(cat: Cat) {
			return (cat as Animal)
		}
		function testAnimal(animal: Animal) {
			return (animal as Cat)
		}
		```
		上面的例子相当于`Cat`继承了`Animal`
		```TypeScript
		interface Animal {
			name: string
		}
		interface Cat extends Animal {
			run(): void
		}
		```
	- 双重断言
	
		现在有：

		- 任何类型可以断言为`any`leixing
		- `any` 可以断言为任何特定类型

		故可以：把任何特定类型断言为`any`类型，再断言为其他任意特定类型
		```TypeScript
		interface Cat {
			run():void
		}
		interface Dog {
			shout(): void
		}

		function testCat(cat: Cat) {
			return (cat as any as Dog)
		}
		```
		> 注意，如非必要，不要进行双重断言，一般进行双重断言都会发生错误

	- 类型断言和类型转换

		```TypeScript
		function toBoolean(target: any): boolean {
			return (target as boolean)
		}
		// 上面的情况虽然可以通过编译，但是并没有返回boolean值，实际编译出来的结果为
		function toBoolean(target) {
			return target
		}

		// 因此需要进行类型专员
		function toBoolean(target: any): boolean {
			return Boolean(target)
		}
		```
	
	- 类型断言和类型声明

		```TypeScript
		interface Cat {
			name: string,
			run(): void
		}
		interface Animal {
			name: string
		}
		
		let animal: Animal = {
			name: 'animal'
		}
		
		function getValue(key: string): any {
			return (window as any)[key]
		}
		
		let tom = getValue('tom') as Cat // 类型断言
		
		let tom = animal as Cat // 和上面的是一样的，类型断言
		
		tom.run()
		```
		上面的例子中的类型断言都可通过编译，即使`tom`中没有`run`方法（运行时错误）

		但是类型声明的话会比类型断言更严格
		```TypeScript
		interface Cat {
			name: string,
			run(): void
		}
		interface Animal {
			name: string
		}
		
		let animal: Animal = {
			name: 'animal'
		} 
		
		let tom: Cat = animal // error run is missing，编译不通过
		```

		从上面的两个例子可以看出：

		- `animal` 断言为 `Cat`：只要 `Animal` 兼容 `Cat`，或者 `Cat` 兼容 `Animal`
		- `animal` 赋值给 `tom`：需要 `Animal` 包含 `Cat` 才行

		平常代码编辑尽量偏用类型声明

- 声明文件

	项目中用到的第三方库时，需要引用它的声明文件，才能使用代码补全，接口提示等

	- 什么是声明语句
		```TypeScript
		// 项目中用到 jquery
		jQuery('#foo')
		```
		此时编译不通过，因为typescript不知道 jQuery 是什么，需要先声明
		```TypeScript
		declared var jQuery(select: string) => any
		
		jQuery('#foo')
		```
	- 声明文件

		通常，会把声明语句集中发到一个以`.d.ts`结尾的文件中，放到项目目录中，则在使用时就可以正常用代码补全和接口提示，这个`.d.ts`结尾的文件就是声明文件

		```TypeScript
		// src/jQuery.d.ts
		declared const jQuery() => any

		// src/index.ts
		jQuery('#foo')
		```
		> 声明文件通常官方已经提供，或者社区提供，可以非常方便的直接使用，如果没有的话就需要自己编写

	- 声明文件的编写

		具体声明方式可以参考[声明文件](https://www.tslang.cn/docs/handbook/declaration-files/introduction.html) [参考](https://ts.xcatliu.com/basics/declaration-files#xin-yu-fa-suo-yin)

		一些声明语法

		- `declare var` 声明全局变量
		- `declare function` 声明全局方法
		- `declare class` 声明全局类
		- `declare enum` 声明全局枚举类型
		- `declare namespace` 声明（含有子属性的）全局对象
		- `interface` 和 `type` 声明全局类型
		- `export` 导出变量
		- `export namespace` 导出（含有子属性的）对象
		- `export default` ES6 默认导出
		- `export =` commonjs 导出模块
		- `export as namespace` UMD 库声明全局变量
		- `declare global` 扩展全局变量
		- `declare module` 扩展模块
		- `/// <reference />` 三斜线指令

- 内置对象

	`JavaScript` 的内置对象可以直接在 `TypeScript` 中使用，此外，还有 `DOM`和`BOM`对象，`TypeScript`核心库的定义文件

	```TypeScript
	let b: Boolean = true
	let e: Error = new Error('message')
	let d: Date = new Date()
	let r: RegExp = new RegExp('[a-z]')
	
	// ...
	
	let body: HTMLElement = document.body
	let allDiv: NodeList = document.querySelectorAll('div')
	document.addEventListener('click', function(e: MouseEvent) {
	
	})
	
	// ...
	```


	Math.pow(10, '2'); // error , typescript的核心库文件定义了pow接受两个number类型的参数，即： interface Math {pow(x: number, y: number): number}
	
	// 在node中使用 typescript 需要引入 node 的声明文件
	
	```

- 进阶

	- 元祖

	  数组中元素为相同类型的集合，而元祖则为不同类型元素的集合

	  ```typescript
	  // 数组
	  let arr = number[]
  
	  // 元祖
	  let tup: [string, number] = ['tom', 25]
	  ```

		对元祖初始化或者赋值时，需要听过元祖需要的全部元素
		```TypeScript
		let tom: [string, number]

		// let tom = ['tom'] // error

		tom = ['tom', 25]
		```

		可以改变元祖的值
		```TypeScript
		let tom: [string, number] = ['tom', 25]

		tom[0] = '123'
		```
		
		元祖可以添加超过规定数量的元素，但是类型必须是元祖中所有元素的联合类型
		```TypeScript
		let tom:[string, number] = ['tom', 25]
		tom.push(234)
		tom.push(true) // error
		```

	- 枚举

		```TypeScript
		enum Days {
			mon,
			tue,
			wed,
			thu,
			fri,
			sat,
			sun,
		}
		Days['mon'] // 0
		Days['sun'] // 6
		Days[5] // sat
		```
		未定义枚举值，会自动从 0 开始递增或根据前一个枚举开始递增(+1)，如果递增的枚举在之前已经有，会发生覆盖
		```TypeScript
		enum Days {
			mon = 3,
			tue = 2,
			wed,
			thu,
			fri,
			sat,
			sun
		}
		
		enum Months {
			juna = 1,
			fab = 2,
			mar = -1,
			apr,
			may,
		}
		
		enum StudentCode {
			stu1 = 'stu1',
			stu2, // error, 如果前一个枚举成员的只不是数字，不能实现自增
		}
		
		Days['mon'] // 3
		Days['wed'] // 3
		Days['3'] // wed，发生覆盖
		Months['apr'] // 0 从前一枚举的增
		```

		常数项和计算所得项

		- 枚举项分为两种类型：常量项和计算所得项
			```TypeScript
			enum Days {
				mon = 1, // 常量项
				tue = 2,
				fri = 'fir' // 常量项
				sat = '111'.length // 计算所得项
			}
			```
			如果是计算所得项或者是非数字的常量项，后面跟着未赋值的枚举成员，则不会通过编译

		- 常量枚举：使用`const enum`定义的枚举类型，常量枚举会在编译阶段会被删除，由于是敞亮枚举，不能使用计算所得作为枚举成员，必须使用常量作为成员
			```TypeScript
			const enum Directions{
				Up,
				Down,
				Left,
				Right,
			}
			
			let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
			```
		- 外部枚举：外部枚举用来描述已经存在的枚举类型的形状。
			```TypeScript
			declared enum Enum {
				A = 1,
				B,
				C = 3
			}
			```
			外部枚举中未赋值的成员会被当成计算所得项
		
	- 范型：在定义的时候不制定特定类型，而在使用的时候再制定类型。通过使用**类型变量**，达到输入与输出同类型的情况
		```TypeScript
		function createArr<T>(length: number, value: T): Array<T> {
			let result: T[] = []
			for(let i=0;i< length; i++>) {
				result.push(value)
			}
			return result
		}
		
		// 调用的时候传入类型变量的值
		createArr<String>(4, 'value')
		
		// 多个类型变量
		function swap<S, N>(arr: [S, N]): [N, S] {
			return [arr[1], arr[0]]
		}
		```
		- 范型约束：需要限定传入的参数含有某种特性的时候，可以使用范型约束
			```TypeScript
			// 比如我们需要传入的参数函数length的属性
			interface lengthWise {
				length: number
			}
			//function getLength<T>(target: T): number {
			//	return target.length // error: T 类型上不存在length属性。传入的参数不一定会含有length的属性，不能通过编译
			//}
			// 使用范型约束
			function getLength<T extends lengthWise>(target: T): number { // 通过约束传入的参数的，通过编译
				return target.length
			}
			```
		- 范型接口
			```TypeScript
			interface createArr {
				<T>(length: number, value: T): Array<T>
			}
			// 或者把类型变量放到接口上
			interface createArr<T> {
				(length: number, value: T): Array<T>
			}
			
			let createArray: createArr
			createArray = function<T> (length: number, value: T): Array<T> {
				let result: Array<T> = []
				for(let i=0;i<length;i++>) {
					result[i] = value
				}
				return result
			}
			
			// 类型变量在接口上时，需要指定类型
			let createArray: createArr<any>
			createArray = function<T> (length: number, value: T): Array<T> {
				let result: T[] = []
				for(let i=0;i<length;i++>) {
					result.push(value)
				}
				return result
			}
			```
		
		- 范型类
			```TypeScript
			class GenericNumber<T> {
				zeroValue: T;
				add: (x: T, y: T) => T;
			}
			
			let myGenericNumber = new GenericNumber<number>();
			myGenericNumber.zeroValue = 0;
			myGenericNumber.add = function(x, y) { return x + y; };
			```
	
	- 声明合并
	
	- 类型别名：使用type关键字
		```TypeScript
		type Name = string
		type NameResolver = () => string 
		type NameOrResolver = Name | NameResolver
		function getName(n: NameOrResolver): Name {
			if(typeof n === 'string') {
				return n
			} else {
				return n()
			}
		}
		```
	
	- 字符串字面量类型
		```TypeScript
		type EventName = 'click' | 'scroll' | 'mousemove'
		function handleEvent(ele: Element, event: EventName) {
			// do something
		}
		```
		
	- 类
	
	- 类与接口
	
- 操作符：

  - `typeof`：类型索引操作符

    ```typescript
    interface User {
      name: string
      age: number
      department: string
    }
    
    type a = keyof User
    // 即
    type a = 'name' | 'age' | 'department'
    ```

  - `Partial`：将类型的说有属性转换为可选

    ```typescript
    interface User {
    	name: string
      age: number
      apartment: string
    }
    
    type UserP = Partial<User>
    // 即
    type UserP = {
      name?: string
      age?: number
      apartment?: string
    }
    ```

    

  - `Record`

### TIP

-  class

  - 声明方法

    ```typescript
    class Test {
      constructor(
    		public a,
        public b, 
        public c,
    	) {}
    }
    
    // 编译
    var Test = /** @class */ (function () {
        function Test(a, b, c) {
            this.a = a;
            this.b = b;
            this.c = c;
        }
        return Test;
    }());
    /** 
    	所以类构造函数中使用如public、private声明的参数会出现在类的实例中
    */
    ```


- TS 相关的符号

  - `!`：非空断言操作符。从值域中排出 null 和 undefined

    ```typescript
    // 忽略 undefined 和 null 类型
    function Foo(mayString: string | undefined | null) {
    	const stringOnly: string = mayString; // Error
      const ignoreNullUnde: string = mayString!; // Ok
    }
    
    // 忽略undefined
    type StringGe: () => string
    
    function Bar(strGe: StringGe | undefined) {
     	const str1:string = strGe();
      const str2: string = strGe!();
    }
    
    ```

  - `?.`：可选链，与 ES2020的可选链一致

  - `??`：空值合并，与 ES2020的空值合并一致

  - `?:`：可选属性

  - `&`：合并类型，将多个类型合并为一个类型，包含所需的所有类型

    ```typescript
    interface Foo {
      foo: string
    }
    interface Bar {
      bar: number
    }
    type Baz = Foo & Bar
    
    const foo: Baz = {
      foo: '1234t',
      bar: 123456,
    }
    
    // 类型内有同名基础类型的合并
    interface X {
      c: string
      d: string
    }
    interface Y {
      a: string
      c: number
    }
    type XY = X & Y
    const bar: XY = {
      c: 1234,
      d: '123',
      a: 'qwer',
    }// Error 这时的c的类型为never，因为即为 string 又是 number 的类型是不存在的
    ```

  - `|`：分隔符

- 工具类型：

  - `Partial<T>`：将T接口类型的属性变成可选。

    ```typescript
    interface Foo {
      foo: string
      bar: number
    }
    
    type Bar = Partial<Foo>
    
    /**
    即：type Bar = {
    	foo?: string
    	bar?: number
    }
    */
    ```

  - `Required<T>`：与 Partial 的作用相反，将接口的可选属性变为必须

    ```typescript
    interface Foo {
    	foo?: string
      bar?: number
    }
    type Bar = Required<Foo>
    
    /** 
    	即：type Bar = {
    		foo: string
    		bar: number
    	}
    */
    ```

  - 限定类型

    - `in`关键字：

      ```typescript
      interface Admin {
        name: string
        private: boolean
      }
      interface Employee {
        name: string
        age: number
      }
      type UnknownEmployee = Admin | Employee
      
      function foo(emp: UnknowEmployee) {
        console.log(emp.name)
        if('private' in emp) { // 直接 emp.private 会报错
        	console.log(emp.private)
        }
        if('age' in emp) {
          console.log(emp.age)
        }
      }
      ```

    - `typeof`关键字：

      ```typescript
      function padLeft(value: string, padding: string | number) {
        if(typeof value === 'string') {
          value + '1111'
        }
      }
      ```

    - `instanceof`关键字：

