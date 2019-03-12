---
title: mac 使用automator建立自动工作流
tags: macos, automator
notebook: other
---
#### mac在新建文件时的操作非常不方便，好在macos 系统自带了一个 automator 的 app 可以创建一些工作流，减少繁琐的操作
1. 打开 automator ，中文为自动操作。位置在 应用程序 -> 其他 -> automator（自动操作）
2. 选择左侧栏资源库分类 -> 选择文本 -> 将新建文本文件拖到右侧 -> 上侧工作流程收入到 “无输入“（在访达的服务中的通用中） -> 其他根据需要选择相应的选项，比如文件放置位置 -> command + s 保存 -> 在访达的服务中就可以看到新建文本文件的操作，点击即可在需要的地方看到新建的 txt 文本，减少平时的繁琐操作

#### 删除 automator 的工作流程
1. 打开 automator 选择菜单的文件 -> 打开 -> 可以看到之前创建成功的工作流程 -> 删除即可 
    > 在 finder 中这个 service 文件夹是隐藏的
    > mac os 显示隐藏文件的方法 `shift + command +  .`