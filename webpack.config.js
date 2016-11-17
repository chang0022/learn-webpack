/**
 * Created by Neo on 2016/11/11.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./js/entry.js', './js/index.js'],
  output: {
    path: __dirname,
    filename: './script/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader", {publicPath: '../'}) // 解决路径问题
      },
      {
        test: /\.png|jpg$/,
        loader: 'url?limit=50000&name=img/[hash].[ext]' // 指定图片存放位置
      },
      {
        test: /\.js|jsx$/,
        loader: "babel"
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          title: 'Hello Webpack',
          favicon: './img/favicon.ico',
          template: './template/index.html',
          filename: './index.html',
          inject: true
      }),
      new ExtractTextPlugin('styles/index.css')
  ]
};
