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
        3. 调整 viewport 的大小，1 和 2 两种方式设定的 rem 大小在测量设计稿的时候需要除以 2 再根据换算成 rem ，而调整 viewport 为浏览器大小的两倍，则不再需要除以 2 


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
