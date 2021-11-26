---
title: 项目的 package.json 文件说明
categories: 
- Code
- Node
tags: 
- package
---

每个项目的根目录下面，一般都有一个package.json文件，定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。npm install命令根据这个配置文件，自动下载所需的模块，也就是配置项目所需的运行和开发环境。

<!--more-->

package.json 文件就是一个 JSON 对象，该对象的每个成员就是该项目的各种配置。

## 各个字段

- scripts: 指定运行脚本命令的npm命令行缩写。

- dependencies：项目运行所依赖的模块

- devDependencies：项目开发所依赖的模块

  ```javascript
  {
    "devDependencies": {
      "html-webpack-plugin": "^4.4.1",
      "webpack": "^4.43.0",
      "webpack-cli": "^3.3.11"
    },
    "dependencies": {
      "react": "@^16.0.0"
    },
  }
  ```

  > 版本号：以 `主版本.次要版本.小版本`的形式

  > 指定版本：如 2.2.3，安装时只安装指定的版本。
  >
  > 波浪号 + 指定版本：如 ~2.2.3，只安装最新的小版本号，即只会安装2.2下最新的版本。
  >
  > 插入号 + 指定版本：安装主版本号下的最新版本。如^2.2.3，会安装2.X.X的最新版。
  >
  > latest：安装最新版

- peerDependencies：peerDependencies 的目的，是提示宿主环境安装 peerDependencies 中指定版本的模块，一般来说这种需求是在写插件的形式下。比如你所写的插件以来某个模块的 ^2.0.0 版本，则在安装了你插件的项目中安装依赖包时，如果没有指定版本的模块，则会强制安装（npm2）或者发出警告（npm3）

- bin：指定内部命令对应的可执行文件的位置

  ```javascript
  {
    "bin": {
      "someTool": "./bin/someTool.js"
    }
  }
  ```

  
