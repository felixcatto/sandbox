const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');


const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist'),
};


const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
      publicPath: '/',
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: `${PATHS.app}/index.html`,
      }),
    ],
  },
  parts.loadHTML(),
  parts.loadFonts(),
  parts.loadJS({ include: PATHS.app }),
  parts.loadImages(),
  parts.extractCSS(),
]);


const developmentConfig = merge([
  parts.devServer(),
]);


const productionConfig = merge([]);


module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
