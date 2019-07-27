### mobile 开发

- viewport
    - 网页首先放入到 viewport 中，viewport 放入到浏览器中,网页的宽度取决于 viewport 的宽度
    - viewport 的宽度情况：
        - 当浏览器的宽度 > 980 的时候，viewport 的宽度 = 浏览器的宽度
        - 当浏览器的宽度 < 980 的时候，viewport 的宽度 = 980
    - 开发时多数情况下会对 viewport 进行设置，绝大多数情况下会将 viewport 的宽度设置成和浏览器宽度一致
    ```
    //maximum-scale：最大缩放比
    //minimum-scale:最小缩放比
    //user-scalable:是否允许用户缩放 no/yes
    <memta name="viewport" content="width=device-width,maximum-scale=1,minimum-scale=1,user-scalable=no">
    ```
    设置`viewport`之后就可以直接使用`px`作为单位，移动设备会自动根据屏幕的宽度，设置实际显示的像素大小

    > 设置 `width=device-width` 之后，1px = 1/屏幕的宽度， 而没设置的 1px = 1/clientWidth， 在设备上的显示效果会根据设备的 `dpr` 进行变更。设置 `width=device-width` 之后，宽度较大的设备会在横向上显示更多的内容，如果需求需要不同宽度的设备显示一样多的内容，则需要再设置html的font-size，页面单位使用`rem`

- 设备屏幕
    -  移动设备的屏幕都是 retina 屏（视网膜高清屏），retina 屏幕有一个属性叫“设备缩放比（dprr）”
    dpr = 物理像素 / 逻辑像素
    如：iphone5 的宽度为320 => 逻辑像素
        分辨率 640 => 物理像素
- 移动端布局方法
    - 弹性盒
    - rem
    - 百分比
    - vh || vw
        - 1vw = 屏幕宽度的百分之一
        - 1vh = 屏幕高度的百分之一
        - 1vmax = vw 和 vh 中较大的一个 
        - 1vmin = vw 和 vh 中较小的一个
    - rem 的处理：
        rem 是html标签的 font-size 的值，根据设备的不同，需要我们动态对 rem 进行设定
        1. 将 rem 的尺寸设置为屏幕宽度的某个比例
            ```html
            <script>
                //html 的字体大小为屏幕宽度的 10%
                document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px'
            </script>
            ```
        2. 以 iphone6 的 rem 为标准，假如将 rem 定位100px ，则
            ```
            //根据等比换算
            375 / 100 = clientWidth / ?;
            ? = clientWidth / 3.75;
            ```
        3. 调整 viewport 的大小，1 和 2 两种方式设定的 rem 大小在测量750宽度设计稿的时候需要除以 2 再根据换算成 rem ，而调整 viewport 为浏览器大小的两倍，则不再需要除以 2 


#### 淘宝flexible结合postcss-plugin-px2rem配置基于webpack的移动端rem布局
- 在入口文件加入动态计算rem的代码
```javascript
(function (win, lib) {
      var doc = win.document;
      var docEl = doc.documentElement;
      var metaEl = doc.querySelector('meta[name="viewport"]');
      var flexibleEl = doc.querySelector('meta[name="flexible"]');
      var dpr = 0;
      var scale = 0;
      var tid;
      var flexible = lib.flexible || (lib.flexible = {});
      if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
          scale = parseFloat(match[1]);
          dpr = parseInt(1 / scale);
        }
      } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
          var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
          var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
          if (initialDpr) {
            dpr = parseFloat(initialDpr[1]);
            scale = parseFloat((1 / dpr).toFixed(2));
          }
          if (maximumDpr) {
            dpr = parseFloat(maximumDpr[1]);
            scale = parseFloat((1 / dpr).toFixed(2));
          }
        }
      }
      if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
          // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
          if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
            dpr = 3;
          } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
            dpr = 2;
          } else {
            dpr = 1;
          }
        } else {
          // 其他设备下，仍旧使用1倍的方案
          dpr = 1;
        }
        scale = 1 / dpr;
      }
      docEl.setAttribute('data-dpr', dpr);
      if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
          docEl.firstElementChild.appendChild(metaEl);
        } else {
          var wrap = doc.createElement('div');
          wrap.appendChild(metaEl);
          doc.write(wrap.innerHTML);
        }
      }
      function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) {
          width = 540 * dpr;
        }
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
      }
      win.addEventListener('resize', function () {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
      }, false);
      win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
          clearTimeout(tid);
          tid = setTimeout(refreshRem, 300);
        }
      }, false);
      if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
      } else {
        doc.addEventListener('DOMContentLoaded', function (e) {
          doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
      }
      refreshRem();
      flexible.dpr = win.dpr = dpr;
      flexible.refreshRem = refreshRem;
      flexible.rem2px = function (d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
          val += 'px';
        }
        return val;
      }
      flexible.px2rem = function (d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
          val += 'rem';
        }
        return val;
      }
    })(window, window['lib'] || (window['lib'] = {}))
```

- 安装`postcss-plugin-px2rem`后在postcss.config.js加入代码
```javascript
module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: [
                'last 2 versions',
                '> 1%'
            ]
        }),
        require('autoprefixer')({
            rootValue: 100, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
            unitPrecision: 5, //允许REM单位增长到的十进制数字。
            propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            propBlackList: [], //黑名单
            exclude: /(node_module)/,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            selectorBlackList: [], //要忽略并保留为px的选择器
            ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
            minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
        }),
    ]
};
```

#### 移动端事件
- 事件对象属性：changedTouches、touches、targetTouches
    touchstart、touchmove,这三个事件对象属性都能使用，touchend只能使用changedTouches事件对象
- click 事件的300ms延迟
    点击事件在手机端上依然可以使用，但是存在300ms的延迟
    原因是 safari 浏览器在判断用户点击事件时，介于移动设备的双击事件比较困难，故在判断点击事件时会延迟大概 300ms 的时长

- 替代 click 事件的方案
    - tap事件
        封装的自定义事件，touchestart 和 touchend的 时间间隔短，移动距离小，即可判断为点击 tap 事件
        ```javascript
        // $.fn.extend(object)
        $.fn.extend({

        
            function tap (callback) {
                let sp = {x: 0, y: 0}
                let isMove;
                this.on('touchstart', (e) => {
                    sp.x = e.touches[0].clientX;
                    sp.y = e.touches[0].clientY;
                    isMove = false
                })
                this.on('touchmove', (e) => {
                    isMove = true
                })
                this.on('touchend', (e) => {
                    let ep = {x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY}
                    if (Math.abs(ep.x-sp.x) < 10 && Math.abs(ep.y - sp.y) < 10) {
                        if (!isMove) {
                            callback(e)
                        }
                    }
                })
                return this
            }
        })
        $('.box').tap(function(e){
            $(this).css({'backgroundColor':'red'})
        })
        ```
    - 可以采用类库
        - zepto.js 轻量级移动端类库，移动端的 JQ
        - touch.js 手势库
        - hammer.js 手势库
        - fastclick库 解决300ms延迟

- 点透 bug 的产生与解决
    - 产生：
        DOM 元素排列形成上下层关系，上层元素绑定 tap 事件，tap 之后元素消失，下层元素绑定click 事件（类似遮罩层），但是 tap 上层时，也会触发下层的click 事件，成为点透bug
    
    - 解决方案
        - 上下层都是用tap
        - 上下层使用click（fastclick）
        - 使用缓动动画，是上层元素tap后以动画形式消失
        - 使用中间层，在上层元素和下层元素之间创建一个透明层，给透明层添加click


#### 地图与定位
- 后端定位
    根据前端请求中所携带的IP地址来进行定位
- H5 定位
    navigator.geolocation.getCurrentPosition, 基于google的服务
- 利用第三方的平台进行定位
