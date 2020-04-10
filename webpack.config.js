
/* @author yanjun.zsj
 * @date 2018.11
*/
/* global process,__dirname:true */
const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const env = process.env.NODE_ENV;
const entry = {
  fieldmapping: ['@babel/polyfill', './src/index.ts']
};
const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new ForkTsCheckerWebpackPlugin(),
  new webpack.ProvidePlugin({
    React: 'react'
  })
];
module.exports = {
  mode: env,
  entry: entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryExport: 'default',
    library: 'FieldMapping',
    libraryTarget: 'umd'
  },
  performance: {
    hints: false
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 8080,
    open: true,
    openPage: 'example/test.html'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.ts', '.tsx', '.jsx', '.less', '.css', '.wasm', '.mjs', '.js', '.json']
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      loader: ['babel-loader', 'eslint-loader']
    }, {
      test: /\.(ts|tsx)$/,
      include: /src/,
      exclude: /node_modules/,
      use: [
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        },
        'eslint-loader'
      ]
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      ]
    }, {
      test: /\.(less|css)$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }]
  },
  plugins: plugins
};