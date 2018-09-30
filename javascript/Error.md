#### Error 实例对象
  - JavaScript在运行过程中发生错误时，引擎会抛出一个`Error`错误对象。JavaScript 提供 `Error` 构造函数，所有抛出的错误都是这个构造函数的实例
    ```javascript 
    var err = new Error('出错了')
    err.message
    ```
  - `Error`实例对象的属性
    - `Error`实例对象必有的一个属性
      - `message`:错误信息提示
    - 多数JavaScript引擎会有的属性
      - `name`：错误的名称
      - `stack`：错误的堆栈
#### 原生错误类型
  Error实例对象时最一般的错误类型，在它的基础上还有6中错误类型
  - `SyntaxError`: 无法解析代码的语法错误
  - `ReferenceError`：引用一个不存在的变量的错误
  - `RangeError`：超出有效范围
  - `TypeError`：变量或参数不是预期类型，比如常见的not a function
  - `URIError`：URI相关函数参数不正确，如encodeURI(),decodeURI()
  - `EvalError`: eval方法没有被正确执行
  - 自定义错误：自定义错误函数，其原型为`Error`实例（继承Error）
#### throw语句
  使用`throw`语句抛出一个错误，代码停止执行
  ```javascript
  if (i > 10) 
  throw new Error('i小于10')
  ```
  `throw`语句可以接受任意数值类型
#### `tyr...catch...fianll`语句
  JavaScript遇到错误时，会停止代码执行，抛出错误，`try...catch`语句可以让
  ```javascript
  try {
    console.log(000)
    throw '错误'
    console.log(111)
  } catch (e) {
    console.log(222)
  }
  console.log(333)
  // 000
  // 222
  // 333
  ```
  上述代码中`try`中执行错误时，try内的语句停止执行，错误被`catch`捕捉，然后继续执行下面的代码

  `catch(e)`接受一个参数，这个参数时`try`结构中抛出的错误
  ```javascript
  try {
    fn ()
  } catch (e) {
    console.log(e.name)// ReferenceError
    console.log(e.message)// fn is not a function
  }
  ```
  > `catch` 代码块中可针对错误作出处理

  `finally`代码块,无论是否错误，都会执行`finally`中的代码
