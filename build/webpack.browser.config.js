const config = require('./webpack.config.js');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

config.output.filename = 'network-heart-service.min.js';
config.optimization = {
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      extractComments: true,
    }),
  ]
  // runtimeChunk: true
};

module.exports = config;
