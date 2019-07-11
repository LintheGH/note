---
title: '开发常用工具'
tags: tool, function, javascript
notebook: other
---
[原文地址](https://segmentfault.com/a/1190000019601333)

### 前端开发常用工具函数
---
- isStatic：检测数据是不是除了symbol外的原始数据
```javascript
  function isStatic(value) {
    return(
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'undefined' ||
        value === null
    )
}
```

- isPrimitive：检测数据是不是原始数据
```javascript
  function isPrimitive(value) {
    return isStatic(value) || typeof value === 'symbol'
  }
```

- isObject：判断数据是不是引用类型的数据 (例如： arrays, functions, objects, regexes, new Number(0),以及 new String(''))
```javascript
  function isObject(value) {
      let type = typeof value;
      return value != null && (type == 'object' || type == 'function');
  }
```

- isObjectLike：检查 value 是否是 类对象。 如果一个值是类对象，那么它不应该是 null，而且 typeof 后的结果是 "object"
```javascript
  function isObjectLike(value) {
      return value != null && typeof value == 'object';
  }
```

- getRawType：获取数据类型，返回结果为 Number、String、Object、Array等
```javascript
function getRawType(value) {
    return Object.prototype.toString.call(value).slice(8, -1)
}
//getoRawType([]) ==> Array
```

- isPlainObject：判断数据是不是Object类型的数据
```javascript
function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
```

- isArray：判断数据是不是数组类型的数据
```javascript
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
}
```

- isRegExp：判断数据是不是正则对象
```javascript
function isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]'
}
```

- isDate：判断数据是不是时间对象
```javascript
function isDate(value) {
    return Object.prototype.toString.call(value) === '[object Date]'
}
```

- isNative：判断 value 是不是浏览器内置函数
```javascript
function isNative(value) {
    return typeof value === 'function' && /native code/.test(value.toString())
}
```

- cached：记忆函数：缓存函数的运算结果
```javascript
function cached(fn) {
    let cache = Object.create(null);
    return function cachedFn(str) {
        let hit = cache[str];
        return hit || (cache[str] = fn(str))
    }
}
```

- capitalize：字符串首位大写
```javascript
function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}
// abc ==> Abc
//使用记忆函数
let _capitalize = cached(capitalize)
```

- 识别各种浏览器及平台
```javascript
//运行环境是浏览器
let inBrowser = typeof window !== 'undefined';
//运行环境是微信
let inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
let weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
//浏览器 UA 判断
let UA = inBrowser && window.navigator.userAgent.toLowerCase();
let isIE = UA && /msie|trident/.test(UA);
let isIE9 = UA && UA.indexOf('msie 9.0') > 0;
let isEdge = UA && UA.indexOf('edge/') > 0;
let isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
let isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
let isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
```

- getExplorerInfo：获取浏览器信息
```javascript
function getExplorerInfo() {
    let t = navigator.userAgent.toLowerCase();
    return 0 <= t.indexOf("msie") ? { //ie < 11
        type: "IE",
        version: Number(t.match(/msie ([\d]+)/)[1])
    } : !!t.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
        type: "IE",
        version: 11
    } : 0 <= t.indexOf("edge") ? {
        type: "Edge",
        version: Number(t.match(/edge\/([\d]+)/)[1])
    } : 0 <= t.indexOf("firefox") ? {
        type: "Firefox",
        version: Number(t.match(/firefox\/([\d]+)/)[1])
    } : 0 <= t.indexOf("chrome") ? {
        type: "Chrome",
        version: Number(t.match(/chrome\/([\d]+)/)[1])
    } : 0 <= t.indexOf("opera") ? {
        type: "Opera",
        version: Number(t.match(/opera.([\d]+)/)[1])
    } : 0 <= t.indexOf("Safari") ? {
        type: "Safari",
        version: Number(t.match(/version\/([\d]+)/)[1])
    } : {
        type: t,
        version: -1
    }
}
```

- isPCBroswer：检测是否为PC端浏览器模式
```javascript
function isPCBroswer() {
    let e = navigator.userAgent.toLowerCase()
        , t = "ipad" == e.match(/ipad/i)
        , i = "iphone" == e.match(/iphone/i)
        , r = "midp" == e.match(/midp/i)
        , n = "rv:1.2.3.4" == e.match(/rv:1.2.3.4/i)
        , a = "ucweb" == e.match(/ucweb/i)
        , o = "android" == e.match(/android/i)
        , s = "windows ce" == e.match(/windows ce/i)
        , l = "windows mobile" == e.match(/windows mobile/i);
    return !(t || i || r || n || a || o || s || l)
}
```

- repeat：生成一个重复的字符串，有n个str组成，可修改为填充为数组等
```javascript
function repeat(str, n) {
    let res = '';
    while(n) {
        if(n % 2 === 1) {
            res += str;
        }
        if(n > 1) {
            str += str;
        }
        n >>= 1;
    }
    return res
};
//repeat('123',3) ==> 123123123
```

- GetUrlParam：获取Url参数，返回一个对象
```javascript
function GetUrlParam(){
    let url = document.location.toString();
    let arrObj = url.split("?");
    let params = Object.create(null)
    if (arrObj.length > 1){
        arrObj = arrObj[1].split("&");
        arrObj.forEach(item=>{
            item = item.split("=");
            params[item[0]] = item[1]
        })
    }
    return params;
}
// ?a=1&b=2&c=3 ==> {a: "1", b: "2", c: "3"}
```

- downloadFile：base64数据导出文件，文件下载
```javascript
function downloadFile(filename, data){
    let DownloadLink = document.createElement('a');

    if ( DownloadLink ){
        document.body.appendChild(DownloadLink);
        DownloadLink.style = 'display: none';
        DownloadLink.download = filename;
        DownloadLink.href = data;

        if ( document.createEvent ){
            let DownloadEvt = document.createEvent('MouseEvents');

            DownloadEvt.initEvent('click', true, false);
            DownloadLink.dispatchEvent(DownloadEvt);
        }
        else if ( document.createEventObject )
            DownloadLink.fireEvent('onclick');
        else if (typeof DownloadLink.onclick == 'function' )
            DownloadLink.onclick();

        document.body.removeChild(DownloadLink);
    }
}
```

- toFullScreen：全屏
```javascript
function toFullScreen(){
    let elem = document.body;
    elem.webkitRequestFullScreen 
    ? elem.webkitRequestFullScreen()
    : elem.mozRequestFullScreen
    ? elem.mozRequestFullScreen()
    : elem.msRequestFullscreen
    ? elem.msRequestFullscreen()
    : elem.requestFullScreen
    ? elem.requestFullScreen()
    : alert("浏览器不支持全屏");
}
```

- exitFullscreen：退出全屏
```javascript
function exitFullscreen(){
    let elem = parent.document;
    elem.webkitCancelFullScreen 
    ? elem.webkitCancelFullScreen()
    : elem.mozCancelFullScreen
    ? elem.mozCancelFullScreen()
    : elem.cancelFullScreen
    ? elem.cancelFullScreen()
    : elem.msExitFullscreen
    ? elem.msExitFullscreen()
    : elem.exitFullscreen
    ? elem.exitFullscreen()
    : alert("切换失败,可尝试Esc退出");
}
```

- requestAnimationFrame：window动画
```javascript
window.requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback) {
        //为了使setTimteout的尽可能的接近每秒60帧的效果
        window.setTimeout(callback, 1000 / 60);
    };
    
window.cancelAnimationFrame = window.cancelAnimationFrame ||
    Window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.msCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    function (id) {
        //为了使setTimteout的尽可能的接近每秒60帧的效果
        window.clearTimeout(id);
    }
```

- 禁止某些键盘事件
```javascript
document.addEventListener('keydown', function(event){
    return !(
        112 == event.keyCode || //F1
        123 == event.keyCode || //F12
        event.ctrlKey && 82 == event.keyCode || //ctrl + R
        event.ctrlKey && 78 == event.keyCode || //ctrl + N
        event.shiftKey && 121 == event.keyCode || //shift + F10
        event.altKey && 115 == event.keyCode || //alt + F4
        "A" == event.srcElement.tagName && event.shiftKey //shift + 点击a标签
    ) || (event.returnValue = false)
});
```

- 禁止右键、选择、复制
```javascript
['contextmenu', 'selectstart', 'copy'].forEach(function(ev){
    document.addEventListener(ev, function(event){
        return event.returnValue = false
    })
});
```