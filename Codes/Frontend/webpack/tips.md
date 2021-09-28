---
title: webpack相关
categories: 
- Code
- Webpack
tags: 
- webpack
---

### vue 路由懒加载和代码分割
- 


### `ProvidePlugin`全局变量/自动加载模块
- `ProvidePlugin` 是 `webpack` 的内置模块，配置后可以无需 import/require 即可直接使用
```
module.exports = {
  plugins: [
    ...
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'lodash'
    }),
    ...
  ]
}

new webpack.ProvidePlugin({
  _map: ['lodash', 'map'] // 依次加载依赖（lodash -> map)
})

```
在项目中
```
componentDidMount() {
    this.setState({
        list: _.get(data, 'list', [])
    })
}
```

### `react` + `antd` + `css modules` 实现按需加载antd和自定义主题
  由于 css modules 和 antd 的按需加载冲突，需要有别与官方的设置，特此记录
  ```
    // .babelrc or babel-loader option
    {
      "plugins": [
        ["import", {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": true // `style: true || css` true会加载 less 文件， 此处需要自定义主题，所以需要加载less文件
        }]
      ]
    }
  ```

  ```
    // module 的rules中

    { // 正常编写页面的less文件处理
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',// 开发环境需要css热刷新，此处需要用style-loader
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]-[hash:base64:5]',
              },
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')] // 添加浏览器前缀
            }
          }, 
          {
            loader: 'less-loader',
            options: {
              modifyVars: colors,
              javascriptEnabled: true,
            }
          }
        ]
      },

      { // 不能用css modules 来处理 antd 的less文件，需要单独处理
        test: /\.less$/,
        include: /antd/,
        use: [
          'style-loader',// 开发环境需要css热刷新，此处需要用style-loader
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                ...colors, // colors 为自定义主题文件
                //or
                'hack': `true; @import "~@public/style/antd.variable.less";`, // Override with less file
              }, 
              javascriptEnabled: true,
            }
          }
        ]
      },
  ```

### autoprefixer自动移除老式过时的代码

  webpack中配置了autoprefixer，默认设置在处理css属性的时候会去除老旧的属性，需要设置remove未false