'use strict';

var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');
var copyWebpackPlugin = require('copy-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = function makeConfig() {
  var config = {};

  config.devtool = isProd ? 'source-map' : 'eval-source-map';

  var entries = ['./client/app/index.js'];

  if (!isProd) {
    entries.unshift(
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server'
    );
  }

  config.entry = entries;

  config.output = {
    path: __dirname + '/public',
    publicPath: isProd ? '/' : 'http://localhost:3000/',
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  };

  config.plugins = [];

  config.plugins.push(
    new htmlWebpackPlugin({ template: './client/public/index.html', inject: 'body' }),
    new extractTextPlugin('[name].[hash].css'), // Extract css files (disabled when not in build mode)
    //new webpack.optimize.CommonsChunkPlugin('vendor', config.output.filename),
    new webpack.optimize.UglifyJsPlugin()
  );

  if (isProd) {
    config.plugins.push(
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),

      // Copy assets from the public folder
      new copyWebpackPlugin([{ from: __dirname + '/client/public' }]),

      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    );
  } else {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  config.module = {
    preloaders: [],
    loaders: [{
      test: /\.jsx?$/,
      loaders: isProd ? ['babel'] : ['react-hot', 'babel'],
      include: __dirname + '/client/app'
    }, {
      test: /\.css$/,
      loader: extractTextPlugin.extract('style', 'css?sourceMap')
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file'
    }, {
      test: /\.html$/,
      loader: 'raw'
    }]
  };

  return config;
}();
