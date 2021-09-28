---
title: JS数据加密
date: 2013/7/13 20:46:25
categories: 
- Code
- JavaScript
tags: 
- encodeURIComponent
---
- `window.encodeURICompoent()` 把字符串进行编码
  - 返回值：URIstring 的副本，其中的某些字符将被十六进制的转义序列进行替换。
- 请注意 encodeURIComponent() 函数 与 encodeURI() 函数的区别之处，前者假定它的参数是 URI 的一部分（比如协议、主机名、路径或查询字符串）。因此 encodeURIComponent() 函数将转义用于分隔 URI 各个部分的标点符号。