const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const glob = require('glob');
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
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${PATHS.app}/index.html`,
      }),
    ],
  },
  parts.loadHTML(),
  parts.loadFonts(),
]);


const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
  parts.loadImages(),
]);


const productionConfig = merge([
  parts.extractCSS({
    use: ['css-loader', parts.autoprefix()],
  }),
  // parts.purifyCSS({
  //   paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
  // }),
  parts.loadImages({
    options: {
      limit: 5000,
      name: 'img/[name].[ext]',
    },
  }),
  parts.loadJS({ include: PATHS.app }),
]);


module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
