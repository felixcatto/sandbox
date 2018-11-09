const path = require('path');
const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const babel = require('gulp-babel');
const { spawn } = require('child_process');
const Browser = require('browser-sync');
const webpackConfig = require('./webpack.config.js');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const cssImport = require('postcss-import');


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

const transpileScss = () => gulp.src('src/**/*.scss')
  .pipe(sass())
  .pipe(postcss([cssImport()]))
  .pipe(concat('index.css'))
  .pipe(gulp.dest('dist/public/css'));

const copyViews = () => gulp.src('src/server/views/**/*').pipe(gulp.dest('dist/server/views'));

const bundleClientJs = done => bundler.run(done);

const transpileServerJs = () => gulp.src(serverJsPath)
  .pipe(babel())
  .pipe(gulp.dest('dist'));

const clean = () => del(['dist']);

const watch = () => {
  gulp.watch(serverJsPath, gulp.series(transpileServerJs, startServer, reload));
  gulp.watch('src/**/*.scss', gulp.series(transpileScss, reload));
  gulp.watch('src/server/views/**/*', gulp.series(copyViews, reload));
};


const dev = gulp.series(
  clean,
  transpileScss,
  copyViews,
  transpileServerJs,
  startServer,
  startDevServer,
  watch,
);


const prod = gulp.series(
  clean,
  transpileServerJs,
  bundleClientJs,
);


module.exports = { dev, prod };
