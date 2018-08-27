### 微信公众号
微信公众号是微信平台的战略部署，为 webapp 提供了 JS-SDK 来调用微信、设备的原生功能
对H5开发者来说微信公众号的开发一般即为研究如何调用 JS-SDK 

#### JS-SDK
- JS-SDK: 软件开发工具包，JS-SDK 指的是专门为 JS 调用所开发的工具包。JS-SDK 除了提供调用微信本身的功能之外，还提供了调用设备原生功能的 API

- weui： 微信提供了与微信原生样式同意的标准样式库

- js-sdk：调用步骤 [官方文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)
  1. 在需要调用js-sdk页面中引入js 文件`http://res.wx.qq.com/open/js/jweixin-1.2.0.js`

  2. 进行权限验证:
    所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用（同一个url仅需调用一次，因此当作路由跳转url变化后，调用js-sdk时需要先注入配置信息
      ```javascript
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: '', // 必填，公众号的唯一标识
        timestamp: , // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '',// 必填，签名
        jsApiList: [] // 必填，需要使用的JS接口列表
      });
      ```
      > 其中 `signature`为根据`url`、`jsapi_ticket`(用户授权通过微信的access_token调用接口获取到)、`noncestr`（随机字符串）、`timestamp`(时间戳)组合通过`sha1`加密得到的字符串，因为`ignature`的安全级别很高，都是保存在服务器中，需要时请求后端接口得到
      >
      > `jsApiList`: 写入需要调用的接口，如
      > ```javascript
      > jsApiList: ['scanQRCode', 'chosseImage']
      > ```
      
  3. 权限验证成功之后进行接口调用
    js-sdk 的调用需要确保在配置注入完成后才能正确调用，js-sdk提供了`wx.ready()`方法，里面的代码会在配置注入完成后调用，需要调用js-sdk的代码让如其中即可
