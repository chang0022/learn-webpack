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

## 1
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

