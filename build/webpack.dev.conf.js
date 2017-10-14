var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var path = require('path')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')


// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
      DEBUG: 'true',
      'axiosBaseURL': JSON.stringify('http://120.25.250.211:8080'),
      'wsURL': JSON.stringify('ws://120.25.250.211:8080/ws/'),
      'staticBase': '"/assets/"'
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname,'../node_modules/font-awesome/css'),
      to: path.resolve(__dirname,'../static/css')
    },{
      from: path.resolve(__dirname,'../node_modules/font-awesome/fonts'),
      to: path.resolve(__dirname,'../static/fonts')
    },{
     from: path.resolve(__dirname,'../src/assets/fonts'),
     to: path.resolve(__dirname,'../static/fonts')
    },{
      from: path.resolve(__dirname,'../src/assets/lib'),
      to: path.resolve(__dirname,'../static/lib')
    },{
      from: path.resolve(__dirname,'../src/assets/plugins'),
      to: path.resolve(__dirname,'../static/plugins')
    }])
  ]
})
