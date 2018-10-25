const path = require('path');
const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');


const devServerConfig = {
  contentBase: path.join(__dirname, 'dist'),
  historyApiFallback: true,
  hot: true,
  host: 'localhost',
  port: 3000,
  clientLogLevel: 'error',
  watchContentBase: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
};

WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerConfig);
const bundler = webpack(webpackConfig);
const devServer = new WebpackDevServer(bundler, devServerConfig);


const startDevServer = done => devServer
  .listen(devServerConfig.port, devServerConfig.host, done);


const copyLayout = () => gulp.src('src/index.html').pipe(gulp.dest('dist'));


const bundleClientJs = done => bundler.run(done);


const clean = () => del(['dist']);


const watch = () => {
  gulp.watch('src/index.html', gulp.series(copyLayout));
};


const dev = gulp.series(
  clean,
  copyLayout,
  startDevServer,
  watch,
);


const prod = gulp.series(
  clean,
  copyLayout,
  bundleClientJs,
);


module.exports = { dev, prod };
