const path = require('path');
const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const EventEmitter = require('events');
const { makeServer, listen } = require('blunt-livereload');
const webpackConfig = require('./webpack.config.js');

const { series, parallel } = gulp;

const paths = {
  public: {
    src: 'public/**/*',
    dest: 'dist/public',
  },
  client: {
    src: 'client/**/*',
    dest: 'dist/client',
  },
};

const webpackEmitter = new EventEmitter();
const compiler = webpack(webpackConfig);
compiler.hooks.done.tap('done', () => webpackEmitter.emit('webpackDone'));
const startWebpack = done => compiler.watch({}, done);

const devServer = makeServer({ staticPath: path.resolve(__dirname, 'dist/public') });
const startDevServer = async () => listen(devServer);
const reloadBrowser = async () => devServer.reloadBrowser();

const clean = () => del(['dist']);

const copyPublic = () => gulp.src(paths.public.src).pipe(gulp.dest(paths.public.dest));
const copyPublicDev = () =>
  gulp
    .src(paths.public.src, { since: gulp.lastRun(copyPublicDev) })
    .pipe(gulp.symlink(paths.public.dest, { overwrite: false }));

const bundleClientJs = done => compiler.run(done);
const fakeBundleClientJs = done => webpackEmitter.once('webpackDone', () => done());

const trackChangesInDist = () => {
  const watcher = gulp.watch(['dist/**/*']);
  watcher
    .on('add', pathname => console.log(`File ${pathname} was added`))
    .on('change', pathname => console.log(`File ${pathname} was changed`))
    .on('unlink', pathname => console.log(`File ${pathname} was removed`));
};

const watch = async () => {
  gulp.watch(paths.public.src, series(copyPublicDev, reloadBrowser));
  gulp.watch(paths.client.src, series(fakeBundleClientJs, reloadBrowser));
  trackChangesInDist();
};

const dev = series(clean, parallel(copyPublicDev, startWebpack, startDevServer), watch);

const prod = series(clean, copyPublic, bundleClientJs);

module.exports = {
  dev,
  prod,
};
