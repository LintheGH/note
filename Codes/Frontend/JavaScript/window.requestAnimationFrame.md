---
title: requestAnimationFrame
categories: 
- Code
- JavaScript
tags:
- requestAnimationFrame
---

- window.requestAnimationFrame()方法跟setTimeout类似，都是推迟某个函数的执行。不同之处在于，setTimeout必须指定推迟的时间，window.requestAnimationFrame()则是推迟到浏览器下一次重流时执行，执行完才会进行下一次重绘。重绘通常是 **16ms** 执行一次，不过浏览器会自动调节这个速率，比如网页切换到后台 Tab 页时，requestAnimationFrame()会暂停执行。

- 如果某个函数会改变网页的布局，一般就放在window.requestAnimationFrame()里面执行，这样可以节省系统资源，使得网页效果更加平滑。因为慢速设备会用较慢的速率重流和重绘，而速度更快的设备会有更快的速率。

`window.requestAnimationFrame(callback)`

上面代码中，callback是一个回调函数。callback执行时，它的参数就是系统传入的一个高精度时间戳（performance.now()的返回值），单位是毫秒，表示距离网页加载的时间。

window.requestAnimationFrame()的返回值是一个整数，这个整数可以传入window.cancelAnimationFrame()，用来取消回调函数的执行。

- 通常，将动画函数作为callback
``` javascript
var element = document.getElementById('animate');
element.style.position = 'absolute';

var start = null;

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  // 元素不断向左移，最大不超过200像素
  element.style.left = Math.min(progress / 10, 200) + 'px';
  // 如果距离第一次执行不超过 2000 毫秒，
  // 就继续执行动画
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```