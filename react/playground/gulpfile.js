const path = require('path');
const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const Browser = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback');
const webpackConfig = require('./webpack.config.js');


const devServer = Browser.create();
const bundler = webpack(webpackConfig);
bundler.hooks.done.tap('done', () => devServer.reload());

const startDevServer = (done) => {
  devServer.init({
    server: 'dist',
    port: 3000,
    open: false,
    notify: false,
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        logLevel: 'silent',
      }),
      historyApiFallback(),
    ],
  });
  done();
};

const reloadDev = (done) => {
  devServer.reload();
  done();
};



const copyLayout = () => gulp.src('src/index.html').pipe(gulp.dest('dist'));


const copyMisc = gulp.series(
  () => gulp.src('src/public/img/*').pipe(gulp.dest('dist/public/img')),
);


const bundleClientJs = done => bundler.run(done);


const clean = () => del(['dist']);


const watch = () => {
  gulp.watch('src/index.html', gulp.series(copyLayout));
};


const dev = gulp.series(
  clean,
  copyLayout,
  copyMisc,
  startDevServer,
  watch,
);


const prod = gulp.series(
  clean,
  copyLayout,
  copyMisc,
  bundleClientJs,
);


module.exports = { dev, prod };
