---
title: echart 相关tips
tags: echart, reacti, tips
notebook: other
---

### echarts 折线图波动过大问题
- 问题出现：echarts折线图中当增加dataZoom，修改start大于0的时候，会出现折线混乱，变成竖直的线，绘制有问题
  - 问题解决办法：在dataZoom中增加filterMode: ‘empty’
