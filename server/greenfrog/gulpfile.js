const path = require('path');
const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const babel = require('gulp-babel');
const { spawn } = require('child_process');
const webpackConfig = require('./webpack.config.js');


const serverJsPath = ['src/**/*.js', '!src/client/**'];

const bundler = webpack(webpackConfig);

let node;
const startServer = (done) => {
  if (node) node.kill();
  node = spawn('node', ['dist/bin/server.js'], { stdio: 'inherit' });
  done();
};
process.on('exit', () => node && node.kill());

const devServerConfig = {
  hot: true,
  host: 'localhost',
  port: 3000,
  clientLogLevel: 'error',
  proxy: {
    '*': 'http://localhost:4000',
  },
};

const startDevServer = done => {
  WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerConfig);
  const devBundler = webpack(webpackConfig);
  const devServer = new WebpackDevServer(devBundler, devServerConfig);
  devServer
    .listen(devServerConfig.port, devServerConfig.host, done);
};

const reload = done => {
  console.log('Boroda :\'(');
  done();
};


const copyLayout = () => gulp.src('src/server/index.html').pipe(gulp.dest('dist/server'));


const bundleClientJs = done => bundler.run(done);

const transpileServerJs = () => gulp.src(serverJsPath)
  .pipe(babel())
  .pipe(gulp.dest('dist'));


const clean = () => del(['dist']);


const watch = () => {
  gulp.watch(serverJsPath, gulp.series(transpileServerJs, startServer, reload));
  gulp.watch('src/server/index.html', gulp.series(copyLayout, startServer, reload));
};


const dev = gulp.series(
  clean,
  copyLayout,
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
