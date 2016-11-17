# learn-webpack
:tada: 一直没有好好学习 webpack ，最近局势动荡不安，赶紧入手认真学习。
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

> --colors -> -c 带颜色的日志

### WATCH MODE

    webpack --progress --colors --watch

### DEVELOPMENT SERVER

    cnpm i webpack-dev-server -g
    webpack-dev-server --progress --colors

这里只是介绍了 webpack 基本的用法

demo 来自 [webpack/getting-started](http://webpack.github.io/docs/tutorials/getting-started/)



## 使用 webpack 来处理图片

需要对应的插件加载器有 **css-loader** **style-loader** **url-loader** **file-loader**

> `url-loader` 是对 `file-loader` 的上层封装

webpack.config.js 添加对应的配置

    {
        test: /\.png|jpg$/,
        loader: 'url?limit=50000'
    }

limit参数，代表如果小于大约50k则会自动帮你压缩base64编码的图片


## 使用 webpack + babel 来处理 ES 2015 代码

    cnpm i babel-core babel-loader babel-preset-es2015

webpack.config.js 添加对应的配置

    {
        test: /\.js|jsx$/, //是一个正则，代表js或者jsx后缀的文件要使用下面的loader
        loader: "babel"
    }

## 使用 html-webpack-plugin 来简化创建 HTML 文件

- `title`: The title to use for the generated HTML document.
- `filename`: The file to write the HTML to. Defaults to `index.html`.
   You can specify a subdirectory here too (eg: `assets/admin.html`).
- `template`: Webpack require path to the template. Please see the [docs](https://github.com/ampedandwired/html-webpack-plugin/blob/master/docs/template-option.md) for details.
- `inject`: `true | 'head' | 'body' | false` Inject all assets into the given `template` or `templateContent` - When passing `true` or `'body'` all javascript resources will be placed at the bottom of the body element. `'head'` will place the scripts in the head element.
- `favicon`: Adds the given favicon path to the output html.
- `minify`: `{...} | false` Pass a [html-minifier](https://github.com/kangax/html-minifier#options-quick-reference) options object to minify the output.
- `hash`: `true | false` if `true` then append a unique webpack compilation hash to all
  included scripts and CSS files. This is useful for cache busting.
- `cache`: `true | false` if `true` (default) try to emit the file only if it was changed.
- `showErrors`: `true | false` if `true` (default) errors details will be written into the html page.
- `chunks`: Allows you to add only some chunks (e.g. only the unit-test chunk)
- `chunksSortMode`: Allows to control how chunks should be sorted before they are included to the html. Allowed values: 'none' | 'auto' | 'dependency' | {function} - default: 'auto'
- `excludeChunks`: Allows you to skip some chunks (e.g. don't add the unit-test chunk)
- `xhtml`: `true | false` If `true` render the `link` tags as self-closing, XHTML compliant. Default is `false`

**[中文翻译]**(https://segmentfault.com/a/1190000007294861)

## 使用 extract-text-webpack-plugin 把 CSS 文件从 JS 里面取出来

wepack 1 中的配置写法

    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader", {publicPath: '../'})
    }
