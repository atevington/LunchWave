'use strict';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  contentBase: './client/public',
  stats: 'normal',
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  inline: true,
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      secure: false
    }
  }
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('[client] Webpack listening at http://localhost:3000/');
});
