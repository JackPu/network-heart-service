const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, '../src'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
    library: 'NetworkHeartService',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: 'env',
            plugins: ['transform-object-assign']
          },
        }],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
  ],
};
