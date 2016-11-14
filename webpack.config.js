/**
 * Created by Neo on 2016/11/11.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./entry.js', './js/index.js'],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.png|jpg$/,
        loader: 'url?limit=50000'
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
          template: './index.html',
          filename: 'dist/index.html',
          inject:true
      })
  ]
};
