---
title: mac 启动台图表数量
tags: mac, dock
notebook: other
---
#### 改变启动台的图标数量
用mac终端输入命令，改变dock的图标数量，从而改变图标大小
- 改变行数

  `defaults write com.apple.dock springboard-rows -int 10`
  > 10行

- 改变列

  `defaults write com.apple.dock springboard-columns -int 10`
  > 10列

- 重置启动台
  `defaults write com.apple.dock ResetLaunchPad -bool true`

- 重启启动台
  `killall Dock`