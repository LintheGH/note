---
title: webpack相关
tags: webpack, tips
notebook: framework
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
