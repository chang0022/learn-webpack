# learn-webpack
一直没有好好学习 webpack ，最近局势动荡不安，赶紧入手认真学习。
```
大致目录结构
.
├── bundle.js
├── content.js
├── css
├── entry.js
├── index.html
├── package.json
└── webpack.config.js
```

首先全局安装

`cnpm i webpack -g`
>[cnpm](https://npm.taobao.org/) 阿里云国内镜像，`npm i` -> `npm install`， `-g` -> `--global`

## 1 基本命令
创建文件 entry.js 作为入口文件，index.html 引用 JS 使用

```
//entry.js
document.write("It works.");

//index.html
<html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
         <!--bundle.js 为把包后JS-->
        <script type="text/javascript" src="bundle.js" charset="utf-8"></script>
    </body>
</html>
```
在 Terminal 中执行命令

`webpack ./entry.js bundle.js`

项目中生成一个 bundle.js，打开index.html 可以看到 **It works**

## 2 添加依赖
添加文件 content.js

    //content.js
    module.exports = 'It works from content.js'

在 entry.js 中引入 content.js

    document.write(require('./content'));

执行命令

`webpack ./entry.js bundle.js`
> webpack 分析你的入口文件(entry.js)所依赖的其他文件（模块），这些文件都会被打包到 bundle.js中。webpack 会分配给每个模块一个唯一的 Id，在 bundle.js 中通过这个 Id 来访问每个模块。在程序启动的时候只会处理入口模块（entry.js）, require 方法会在执行时即时地处理依赖模块。

## 3 打包CSS
webpack 只能处理 javascript，要处理 css 就需要安装css-load来转换 css 为 js，还要安装style-loader 将转换后的 css 加载到 dom 中。

    cnpm i css-loader style-loader -D
> -S -> --save -D -> --save-dev

>--save-dev 是你开发时候依赖的东西，--save 是你发布之后还依赖的东西。
>比如，你写 ES6 代码，如果你想编译成 ES5 发布那么 babel 就是devDependencies。
>如果你用了 jQuery，由于发布之后还是依赖jQuery，所以是dependencies。

添加 style.css

    body {
        background-color: blue;
    }

修改 entry.js

    require('!style!css!./style.css);
    document.write(require('./content'));

执行命令

`webpack ./entry.js bundle.js`

> 通过 "!style!css!" 这样的前缀，可以把文件进行一系列的转化，最终变成 javascript 的一个模块。

当然也可以使用命令行绑定 laoders

修改 entry.js

    require('./style.css');
    document.write(require('./content'));

这次执行下面命令

     webpack ./entry.js bundle.js --module-bind "css=style\!css"

> 官网说明在这有个错误 "css=style!css" 里面少了个反斜杠，原因是叹号在 bash 里有特殊意义

> Some environments may require double quotes: –module-bind "css=style!css"

## 4 添加 webpack.config.js
add **webpack.config.js**

    module.exports = {
        entry: "./entry.js",
        output: {
            path: __dirname,
            filename: "bundle.js"
        },
        module: {
            loaders: [
                { test: /\.css$/, loader: "style!css" }
            ]
        }
    };

仅仅 Terminal 中执行

` webpack `

# More

We want to display some kind of progress bar. And we want colors…
But the project grows the compilation may take a bit longer.

    webpack --progress --colors
> --progress 打印打包日志

> --colors -c 带颜色的日志

### WATCH MODE

    webpack --progress --colors --watch

### DEVELOPMENT SERVER

    cnpm i webpack-dev-server -g
    webpack-dev-server --progress --colors

这里只是介绍了 webpack 基本的用法

demo 来自 [webpack/getting-started](http://webpack.github.io/docs/tutorials/getting-started/)