const path = require('path');
const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');


const devServerConfig = {
  contentBase: path.join(__dirname, 'dist'),
  watchContentBase: true,
  hot: true,
  host: 'localhost',
  clientLogLevel: 'none',
  port: 3000,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 2000,
  },
};

WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerConfig);
const bundler = webpack(webpackConfig);
const devServer = new WebpackDevServer(bundler, devServerConfig);


const startDevServer = done => devServer.listen(3000, 'localhost', done);


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
