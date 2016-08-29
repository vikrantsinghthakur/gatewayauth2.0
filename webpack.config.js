var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: ['webpack-dev-server/client?http://localhost:8080',
            './example/sample.js'],
  output: { path: __dirname + '/dist',
            publicPath: '/',
            filename: 'bundle.js'},
  plugins: [
    new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }})
  ],
  devtool : 'source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      { test: /\.json$/, loaders: ['json-loader'] }
    ]
  },
  devServer: {
    contentBase: './example'
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};