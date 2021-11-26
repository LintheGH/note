---
title: react-native 使用简介
date: 2021/10/15 16:35
categories: 
- Code
- React-Native
tags: 
- React-Native
notebook: React-Native
---

react-native 使用的简单介绍
<!--more-->



## 基础

### 特定平台代码

- `Platform`模块

  ```javascript
  import { Platform, StyleSheet } from 'react-native'
  // Platform.OS
  const styles = StyleSheet.creat({
    height: PlatForm.OS === 'ios' ? 200 : 100,
  })
  // Platform.select
  const styles2 = StyleSheet.creat({
    ...Platfrom.select({
      ios: {backgroundColor: 'red'},
      android: {backgroundColor: 'blue'}
    })
  })
  // 检测版本
  const iosVer = Platform.Version // 版本字符串
  const andVer = Platform.Version // api版本
  ```

- 特定平台扩展名

  ```文件
  BigButton.ios.js
  BigButton.android.js
  ```

  ```javascript 引入
  import BigButton form './BigButton'
  ```

  > 系统会自动根据平台选择文件

  ```区分web和其他
  BigButton.native.js // iOS 或 Android 加载
  BigButton.js // web加载
  ```

- 滚动视图：`ScrollView`

- 长列表：`FlatList`、`SectionList`

  - `FlatList`：渲染可见的元素
  - `SectionList`：带分组标签

## 开发流程

## 设计



## 交互

