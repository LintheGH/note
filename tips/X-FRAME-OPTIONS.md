---
title: X-FRAME-OPTIONS
tages: iframe, 点击劫持, X-FRAME-OPTIONS
notebook: other
---
### 点击劫持（UI-覆盖攻击）
利用`iframe`透明覆盖在原网页上，当用户点击网页时，看上去时点击所看到的，实际上点击的是`iframe`上的链接，从而实现了不可见的操作
### `X-FRAME-OPTIONS`响应头设置
`X-FRAME-OPTIONS`设置响应头属性可以有效放置点击攻击
- `X-FRAME-OPTIONS`有3个值
    - `DENY`: 表示该页面不允许在 frame 中展示，即便是在相同域名的页面中嵌套也不允许。
    - `SAMEORIGIN`: 表示该页面可以在相同域名页面的 frame 中展示。
    - `ALLOW-FROM uri`: 表示该页面可以在指定来源的 frame 中展示。
- 具体实例
    在服务端设置的方式如下：
    - Java代码:
        response.addHeader("x-frame-options","SAMEORIGIN");
    - Nginx配置:
        add_header X-Frame-Options SAMEORIGIN
    - Apache配置:
        Header always append X-Frame-Options SAMEORIGIN

    一般选第二个参数就可以了。
