const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const babelConfig = require('./babelconfig.js');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: path.resolve(__dirname, 'client/index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/public/js'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: babelConfig.client },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              modules: {
                auto: true,
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'index.css' })],
  stats: { warnings: false, modules: false },
};
