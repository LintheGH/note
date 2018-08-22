## Hybrid

- WebApp
  运行在浏览器中的web站点，属于B/S架构
  - 优点：开发成本低，周期短，跨平台，更新维护成本低，使用成本低
  - 缺点：性能差，流畅度低，用户体验较低，对网络的依赖强，受浏览器安全级别限制（跨域，无法调用设备原生功能）
  > H5 离线缓存技术
- NativeApp
  运行在移动设备上需要下载原生安装包进行安装的应用，属于C/S架构
  - 优点：性能好，流畅度高，用户体验好，对网络的依赖性不强，可以调用设备原生功能
  - 缺点：开发成本高，不能跨平台，周期长，更新维护成本高，使用成本高
- HybridApp
  利用H5页面来实现native部分功能的开发模式，属于C/S架构，需要下载安装
  - 开发模式
    - 将H5页面嵌入到native应用中去实现部分功能，需要和Android、ios进行交互
    - 利用工具实现整个应用中所有界面都由web页面来实现，最终利用工具调用设备原生功能，并打包成安装包

### H5页面嵌入到 native 中
为了节省开发成本，调高开发效率，很多应用会选择将部分原生应用功能交由H5实现，利用 webview 嵌入到native。更新较多，内容数据渲染较多的功能由H5实现较好，一般交互效果不强的页面都由H5实现
嵌入到 webview 中的 H5 页面注意进制用户长按选中文字
```css
* {
-webkit-touch-callout:none;
-webkit-user-select:none;
-khtml-user-select:none;
-moz-user-select:none;
-ms-user-select:none;
user-select:none;
}
```

##### 判断操作系统的方法
window.navigator.userAgent 对象

### 利用工具进行纯H5的混合开发

利用H5页面来实现应用程序的所有逻辑，然后使用工具将web应用打包成原生安装包
  - 目前较为流行的工具
    - phonegap + cordova，phonegap提供打包、测试，cordova调用设备原生功能
    - Dcloud：Hbuild（测试、打包） + mui（提高开发效率）+ （H5+runtime）（调用原生功能）
    - ApiCloud
  - Dcloud(Hbuilder)
    - 项目打包
      - 项目中的路径全部改为相对路径
      - 配置项目目录中的manifest.json文件
      - 
### H5+ 开发
#### 采用H5+ + mui 开发 HybridApp
H5+，提供给H5页面调用设备原生功能的能力, native的部分为window上挂载了plus的对象，这个plus对象上就拥有很多调用设备原生功能的方法，例如： window.plus.camera.getCamera
- mui
  - 在app开发中，若要使用HTML5+扩展api，必须等plusready事件发生后才能正常使用，mui将该事件封装成了mui.plusReady()方法，涉及到HTML5+的api，建议都写在mui.plusReady方法中
  - 
  - mui 事件管理
    - 事件绑定： el.addEventListener()、els.on()批量元素绑定
    - 事件触发:
      - mui.triggle()  触发DOM事件
      - mui.fire() 触发窗口webview的事件
    - 事件取消：el.off()
