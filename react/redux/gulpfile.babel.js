import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import { spawn } from 'child_process';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssImport from 'postcss-import';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config.js';
import Browser from 'browser-sync';


const serverJsPath = ['src/**/*.js', '!src/client/**'];
const proxyServer = Browser.create();
const bundler = webpack(webpackConfig);
bundler.plugin('done', () => proxyServer.reload());


let node;
const startServer = (done) => {
  if (node) node.kill();
  node = spawn('node', ['dist/bin/server.js'], { stdio: 'inherit' });
  done();
};
process.on('exit', () => node && node.kill());


const startProxyServer = (done) => {
  proxyServer.init({
    open: false,
    notify: false,
    proxy: 'localhost:3000',
    port: 4000,
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
      }),
    ],
  });
  done();
};
const reloadProxyServer = (done) => {
  proxyServer.reload();
  done();
};


const copyLayout = () => gulp.src('src/index.html').pipe(gulp.dest('dist'));


const transpileScss = () => gulp.src('src/public/css/index.scss')
  .pipe(sass())
  .pipe(postcss([cssImport()]))
  .pipe(rename('index.css'))
  .pipe(gulp.dest('dist/public/css'));


const transpileServerJs = () => gulp.src(serverJsPath)
  .pipe(babel())
  .pipe(gulp.dest('dist'));


const bundleClientJs = () => webpackStream(webpackConfig)
  .pipe(gulp.dest('dist/public/js'));


const clean = () => del(['dist']);


const watch = () => {
  gulp.watch(serverJsPath, gulp.series(transpileServerJs, startServer, reloadProxyServer));
  gulp.watch('src/index.html', gulp.series(copyLayout, startServer, reloadProxyServer));
  gulp.watch('src/public/css/**/*.scss', gulp.series(transpileScss, reloadProxyServer));
};


const dev = gulp.series(
  clean,
  copyLayout,
  transpileScss,
  transpileServerJs,
  startServer,
  startProxyServer,
  watch,
);


const prod = gulp.series(
  clean,
  copyLayout,
  transpileScss,
  transpileServerJs,
  bundleClientJs,
);


export { dev, prod, bundleClientJs };
