const webpack = require('webpack');
const path = require('path');

const entry = [
  './dist/index.js'
];

const output = {
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/dist/',
  filename: 'bundle.js',
};
  
module.exports = {
  mode: 'production', 
  performance: { hints: false },
  entry, output,
  devtool: "eval-source-map",
  module: {
    rules : [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'es2016', 'react', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
    ],
  },
};    