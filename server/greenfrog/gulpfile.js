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

const transpileScss = () => gulp.src('public/**/*.scss')
  .pipe(sass())
  .pipe(postcss([cssImport()]))
  .pipe(concat('index.css'))
  .pipe(gulp.dest('dist/public/css'));

const copyViews = () => gulp.src('server/views/**/*').pipe(gulp.dest('dist/server/views'));

const copyMisc = gulp.series(
  () => gulp.src('bin/*.js').pipe(gulp.dest('dist/bin')),
  () => gulp.src('server/config/*').pipe(gulp.dest('dist/server/config')),
  () => gulp.src('public/font/*').pipe(gulp.dest('dist/public/font')),
);

const bundleClientJs = done => bundler.run(done);

const transpileServerJs = () => gulp.src('server/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('dist/server'));

const clean = () => del(['dist']);

const watch = () => {
  gulp.watch('server/**/*.js', gulp.series(transpileServerJs, startServer, reload));
  gulp.watch('server/views/**/*', gulp.series(copyViews, reload));
  gulp.watch('public/**/*.scss', gulp.series(transpileScss, reload));
};


const dev = gulp.series(
  clean,
  copyMisc,
  copyViews,
  transpileScss,
  transpileServerJs,
  startServer,
  startDevServer,
  watch,
);


const prod = gulp.series(
  clean,
  copyMisc,
  copyViews,
  transpileScss,
  transpileServerJs,
  bundleClientJs,
);


module.exports = { dev, prod };
