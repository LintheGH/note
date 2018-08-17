---
title: webpack
tags: webpack
notebook: framework
---
### webpack
- 前端工程化： npm、cnpm、yarn、bower、tnpm | grunt 、 gulp 、webpack
  - gulp：基于流（pipe）的前端自动化构建任务式工具
    `gulp.src("a.acss").pipe(scss()).pipe(postcss()).pipe(gulp.dist(''))`
  - webpack: 模块化打包工具。基于配置，让 webpack 按需执行打包任务

- webpack 安装
    ```
    npm i webpack -g

    npm i webpack-cli -g (4.0+)
    // yarn 包管理工具
    npm i yarn -g
    ```
> webpack 打包的时候，会在内部创建一个依赖关系图，一般默认使用 webpack.config.js 文件进行依赖图入口和出口的配置

#### entry 
构建其内部依赖图的开始
#### output 
在哪里输出它所创建的 bundles
#### env
在命令行或者终端中执行 webpack --env hello命令，就相当于在打包的时候传入一个参数为hello
在webpack.config.js中可以暴露出一个函数，这个函数就可以接收到env参数，当然函数就可以根据env参数来有选择的返回某一个或多个配置对象
```
module.exports = (env)=>{
    if(env=='production'){
        return productionConfig
    }
    return developmentConfig
}
```

--watch 可以让webpack去监听文件的改变。`webpack --watch --env production --config ./build`

可以在package.json里的scripts中配置一些快捷操作，通过npm run来运行
#### plugin
在webpack编译用的是loader，但是有一些loader无法完成的任务，交由插件（plugin）来完成，插件的使用需要在配置项中配置plugins选项，值是数组，可以放入多个插件的使用，而一般的插件都是一个构造器，我们只需在plugins数组中放入该插件的实例即可，在实例化插件的时候又可以传入options，对插件的使用进行配置

- html-webpack-plugin

  这个插件可以选择是否一句模板来生成一个打包好的 html 文件，可以配置 title 、temlate、filename、minify 等选项 [插件使用](https://segmentfault.com/a/1190000007294861)
    ```
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const config = {
        mode: 'production',
        entry: {...},
        output: {...},
        plugins: [
            // 实例化使用
            new HtmlWebpackPlugin({
                title: 'webpack-config-demo,
                template: './src/index.jade',// html, jade, ejs, hbs 等的格式文件
                filename: 'index.html'
            })
        ]
    }
    module.exports = config
    ```
- webpack-dev-server

 - extract-text-webpack-plugin
#### loader
- 在webpack中专门有一些东西用来编译文件、处理文件，这些东西就叫loader，loader的使用就是在配置项中，设置modules，在modules中设置rule值为数组，在数组里放入多个匹配规则：

    ```
    module:{
        rules:[
            {test:/\.css$/,use:'css-loader'},
            {test:/\.scss$/,use:'sass-loader'}
        ]
        //before
        loaders:[
            {test:/\.css$/,loader:'css-loader'}
        ],
    }
    ```

    test为此次匹配要匹配的文件正则规则，use代表要使用的loader

    使用url-loader可以将css中引入的图片（背景图）、js中生成的img图片处理一下，生成到打包目录里

    视图html-withimg-loader可以将html中img标签引入的img图片打包到打包目录

    file-loader 

    ```
    {
        test:/\.(png|jpe?g|svg|gif)$/,
        // use:'url-loader?limit=1000&name=images/[hash:8].[name].[ext]'
        use:[
            {
                loader:'url-loader',
                options:{
                    limit:1000,
                    name:'/static/images/assets/[hash:8].[name].[ext]'
                }
            }
        ]
    },
    {
        test:/\.html$/,
        use:'html-withimg-loader'
    }
    ```

- 处理css：
    - 安装
    cnpm i css-loader style-loader --save-dev


    - 配置：
        ```
        {
            test:/\.css$/,
            use:['style-loader','css-loader']
        }
        ```
        注意：webpack中loader的使用是从后往前的

        css-loader可以将引入到js中的css代码给抽离出来，style-loader可以将抽离出来的css代码放入到style标签中

- 处理sass
    ```
    {
    test:/\.scss$/,
    use:['style-loader','css-loader','sass-loader']
    },
    ```
- extract-text-webpack-plugin 插件将引入项目的css文件、scss文件抽成一个文件，引入到页面中
    - 安装
        ```
        cnpm i extract-text-webpack-plugin
        ```
    - 配置：
        ```
        const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
        ///loader
        {
            test:/\.css$/,
            use:ExtractTextWebpackPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
            })
        },
        {
            test:/\.scss/,
            use:ExtractTextWebpackPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader","sass-loader"]
            })
        }
        ///plugin
        new ExtractTextWebpackPlugin({
            filename:'app.css',
            allChunks:true
        })
        ```

    - 因为ExtractTextWebpackPlugin对webpack4支持的不是很好，所以我们这样解决：
        ```
        cnpm i extract-text-webpack-plugin@next -D
        yarn add extract-text-webpack-plugin@next -D
        ```
        `@next`下载的就是最最新的版本，可能是开发版本

> webpack-dev-server进行了一个优化，在跑起服务的时候，会将编译结果保存在内存里，不会实时的输出的打包结果

- css兼容优化处理：post-css 、autoprefixer
    ```
    {
        test: /\.scss$/,
        use: ['style-loader','css-loader',{
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
                config: {
                path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                }
            }
            },'sass-loader']
    }
    ```
    // postcss.config.js：
    module.exports = {
        plugins: [
        require('autoprefixer')
        ]
    };

- 处理es6：

    - 需要的依赖：
        ```
        "babel": "^6.23.0",
        "babel-core": "^6.24.1",
        "babel-loader": "^7.0.0",
        "babel-preset-es2015": "^6.24.1",
        "babel-preset-react": "^6.24.1",
        ```
    - 配置：
        ```
        rules：
            {
                test:/\.js$/,
                exclude: /node_modules/,//忽略 包文件夹内的 js 文件
                loader:'babel-loader',
                query: {
                    presets: ['es2015','react']
                }
            }
        ```
#### webpack.config.js 文件
```javascript

// webpack的默认配置文件， 需要暴露出一个配置对象
const path = require('path')
//webpack配置对象
const config = {
    mode: 'development',//4.0版本需要配置一个mode，来指定是开发环境还是生产环境， development, production, none
    //入口配置
    entry: {
        main: './src/main',
        vendor: './src/vendor'
    },
    //出口配置
    output: {
        //打包的出口路径, 必须是绝对路径
        path: path.join(__dirname, '/dist'),
        //打包后的文件名字 
        filename: '[name]_[hash].js'
    }
}


module.exports = config


//单入口，单出口
//入口配置
// entry: './src/main',
// //出口配置
// output: {
//     //打包的出口路径, 必须是绝对路径
//     path: path.join(__dirname, '/dist'),
//     //打包后的文件名字 
//     filename: 'app.js'
// }


//多入口，单出口

//入口配置
// entry: ['./src/main', './src/vendor'],
// //出口配置
// output: {
//     //打包的出口路径, 必须是绝对路径
//     path: path.join(__dirname, '/dist'),
//     //打包后的文件名字 
//     filename: 'app.js'
// }
```
#### package.json 配置文件
- scripts
```
// 在命令行中，使用 npm run 命令可以执行 script 中的属性对应的命令（相当于简写）
"scripts": {
    // 执行 webpack 命令为启动 webpack 打包程序，开始打包
    "dev": "webpack --watch --config ./build/webpack.dev.js",
    "start": "npm run dev",
    "build": "webpack --env production --config ./build/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```
