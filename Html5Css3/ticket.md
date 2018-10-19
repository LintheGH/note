---
title: 使用css3属性实现ticket效果
tags: css3
notebook: HTML5css3
---
#### `pointer-events`属性
  - 取值： 
    - auto：与pointer-events属性未指定时的表现效果相同。在svg内容上与visiblepainted值相同，默认取值
    - none：元素永远不会触发鼠标事件的target
      ```html 
      <!DOCTYPE html>
      <html lang="zh-cmn-Hans">
      <head>
      <meta charset="utf-8" />
      <title></title>
      <meta name="author" content="Joy Du(飘零雾雨), dooyoe@gmail.com, www.doyoe.com" />
      <style>
      a[href="http://example.com"] {
        pointer-events: none;
      }
      </style>
      </head>
      <body>
      <ul>
        <li><a href="https://developer.mozilla.org/">MDN</a></li>
        <li><a href="http://example.com">一个不能点击的链接</a></li>
      </ul>
      </body>
      </html>
      ```