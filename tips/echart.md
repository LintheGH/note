---
title: echart 相关tips
tags: echart, reacti, tips
notebook: other
---

### 配置`echarts`主题配置
Echarts 官网中提供有配置echarts主题所需的配置工具，可以供开发人员或者UI设计师配置echarts的主题。主题中提供基本的图形基本的配置，包括基本的颜色，折线图的萧条粗细，折点的类型和大小，折线平滑，数据缩放的颜色背景，控制手柄大小等的基本配置。

![echart图配置](https://github.com/LintheGH/images/tree/master/note/echart-theme.png)

但是更加详细的配置需要在echart的option中去配置，例如折线图默认点的大小，放大时的大小，这种具体的配置需要在option中具体去配置

![echarts图主题配置项](https://github.com/LintheGH/images/tree/master/note/echarts-theme-options.png)

> 可以看到只有基本的一些配置，详细的配置还是需要到实例中的`option`配置项中去配置


测试2
### echarts 折线图波动过大问题
- 问题出现：echarts折线图中当增加dataZoom，修改start大于0的时候，会出现折线混乱，变成竖直的线，绘制有问题 github issues： #4654
  - 问题解决办法：在dataZoom中增加filterMode: ‘empty’
 