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


const paths = {
  dev: 'app',
  prod: 'dist',
};
const serverJsPath = ['src/**/*.js', '!src/client/**'];
const proxyServer = Browser.create();
const bundler = webpack(webpackConfig);
bundler.plugin('done', () => proxyServer.reload());


let node;
const startServer = (done) => {
  if (node) node.kill();
  node = spawn('node', ['app/bin/server.js'], { stdio: 'inherit' });
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
const reload = (done) => {
  proxyServer.reload();
  done();
};


const makeCopyLayout = dest => gulp.src('src/index.html').pipe(gulp.dest(dest));
const copyLayout = makeCopyLayout.bind(null, paths.dev);
const copyLayoutProd = makeCopyLayout.bind(null, paths.prod);


const makeTranspileScss = dest => gulp.src('src/public/css/index.scss')
  .pipe(sass())
  .pipe(postcss([cssImport()]))
  .pipe(rename('index.css'))
  .pipe(gulp.dest(`${dest}/public/css`));
const transpileScss = makeTranspileScss.bind(null, paths.dev);
const transpileScssProd = makeTranspileScss.bind(null, paths.prod);


const makeTranspileServerJs = dest => gulp.src(serverJsPath)
  .pipe(babel())
  .pipe(gulp.dest(dest));
const transpileServerJs = makeTranspileServerJs.bind(null, paths.dev);
const transpileServerJsProd = makeTranspileServerJs.bind(null, paths.prod);


const makeBundleClientJs = dest => webpackStream(webpackConfig)
  .pipe(gulp.dest(`${dest}/public/js`));
const bundleClientJs = makeBundleClientJs.bind(null, paths.dev);
const bundleClientJsProd = makeBundleClientJs.bind(null, paths.prod);


const makeClean = dest => del([dest]);
const clean = makeClean.bind(null, paths.dev);
const cleanProd = makeClean.bind(null, paths.prod);


const watch = () => {
  gulp.watch(serverJsPath, gulp.series(transpileServerJs, startServer, reload));
  gulp.watch('src/index.html', gulp.series(copyLayout, startServer, reload));
  gulp.watch('src/public/css/**/*.scss', gulp.series(transpileScss, reload));
};


const dev = gulp.series(
  clean,
  copyLayout,
  // transpileScss,
  transpileServerJs,
  startServer,
  startProxyServer,
  watch,
);


const prod = gulp.series(
  cleanProd,
  copyLayoutProd,
  transpileScssProd,
  transpileServerJsProd,
  bundleClientJsProd,
);


export { dev, prod, bundleClientJs };
