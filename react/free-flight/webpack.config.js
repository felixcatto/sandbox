const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');


const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
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
]);


const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
  parts.loadImages(),
]);


const productionConfig = merge([
  parts.extractCSS({
    use: parts.autoprefix(),
  }),
  parts.loadImages({
    options: {
      limit: 1,
      name: '[path][name].[ext]',
    },
  }),
]);


module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
