const path = require('path');
const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackDevMiddleware = require('webpack-dev-middleware');
const babel = require('gulp-babel');
const { spawn } = require('child_process');
const Browser = require('browser-sync');
const webpackConfig = require('./webpack.config.js');


const serverJsPath = ['src/**/*.js', '!src/client/**'];
const devServer = Browser.create();
const bundler = webpack(webpackConfig);
bundler.plugin('done', () => devServer.reload());

let node;
const startServer = (done) => {
  if (node) node.kill();
  node = spawn('node', ['dist/bin/server.js'], { stdio: 'inherit' });
  done();
};
process.on('exit', () => node && node.kill());

const startDevServer = (done) => {
  devServer.init({
    open: false,
    notify: false,
    proxy: 'localhost:4000',
    port: 3000,
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        logLevel: 'silent',
      }),
    ],
  });
  done();
};

const reload = (done) => {
  devServer.reload();
  done();
};

const copyLayout = () => gulp.src('src/server/index.html').pipe(gulp.dest('dist/server'));

const copyViews = () => gulp.src('src/server/views/**/*').pipe(gulp.dest('dist/server/views'));


const bundleClientJs = done => bundler.run(done);

const transpileServerJs = () => gulp.src(serverJsPath)
  .pipe(babel())
  .pipe(gulp.dest('dist'));


const clean = () => del(['dist']);


const watch = () => {
  gulp.watch(serverJsPath, gulp.series(transpileServerJs, startServer, reload));
  gulp.watch('src/server/index.html', gulp.series(copyLayout, startServer, reload));
  gulp.watch('src/server/views/**/*', gulp.series(copyViews, reload));
};


const dev = gulp.series(
  clean,
  copyLayout,
  copyViews,
  transpileServerJs,
  startServer,
  startDevServer,
  watch,
);


const prod = gulp.series(
  clean,
  copyLayout,
  transpileServerJs,
  bundleClientJs,
);


module.exports = { dev, prod };
