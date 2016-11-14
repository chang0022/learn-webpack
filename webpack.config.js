/**
 * Created by Neo on 2016/11/11.
 */
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
  }
};
