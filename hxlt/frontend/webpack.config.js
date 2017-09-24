const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};


const commonConfig = {
  entry: {
    app: PATHS.app,
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: PATHS.app,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  devServer: {
    stats: 'errors-only',
    overlay: {
      errors: true,
      warnings: true,
    },
    devtool: 'cheap-module-source-map',
  },
  node: {
    fs: 'empty',
    module: 'empty',
  },
  devtool: 'cheap-module-source-map',
};


module.exports = commonConfig;
