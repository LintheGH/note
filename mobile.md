### mobile 开发
---
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
