const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const babel = require('gulp-babel');
const Browser = require('browser-sync');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const cssImport = require('postcss-import');
const repl = require('repl');
const { getConnection } = require('typeorm');
const webpackConfig = require('./webpack.config.js');


const serverJsPath = [
  '*/**/*.js',
  '!node_modules/**',
  '!dist/**',
  '!clientComponents/**',
  '!views/**/*.js',
];

let server;
let connection;
const devServer = Browser.create();
const bundler = webpack(webpackConfig);
bundler.hooks.done.tap('done', () => devServer.reload());

const clearCache = () => Object.keys(require.cache)
  .filter(p => !p.match(/node_modules/) && p.match(/dist/))
  .forEach(key => delete require.cache[key]);

const startServer = async (done) => {
  const getApp = require('./dist/main').default; // eslint-disable-line
  const app = await getApp();
  server = app.listen(process.env.PORT || 4000, done);
  connection = getConnection();
};

const reloadServer = (done) => {
  server.close(async () => {
    await connection.close();
    clearCache();
    startServer(done);
  });
};

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

const reloadDev = (done) => {
  devServer.reload();
  done();
};

const serverConsole = async (done) => {
  done();
  const initContainer = require('./dist/lib/container').default; // eslint-disable-line
  const container = await initContainer();
  const replServer = repl.start({
    prompt: 'Console > ',
  });

  Object.keys(container).forEach((key) => {
    replServer.context[key] = container[key];
  });
};

const transpileScss = () => gulp.src(['public/**/*.scss', 'views/**/*.scss'])
  .pipe(sass())
  .pipe(postcss([cssImport()]))
  .pipe(concat('index.css'))
  .pipe(gulp.dest('dist/public/css'));

const copyLayout = () => gulp.src('views/common/index.html')
  .pipe(gulp.dest('dist/views/common'));

const copyViews = () => gulp.src('views/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('dist/views'));

const copyMisc = gulp.series(
  () => gulp.src('public/font/*').pipe(gulp.dest('dist/public/font')),
  () => gulp.src('public/img/*').pipe(gulp.dest('dist/public/img')),
);

const bundleClientJs = done => bundler.run(done);

const transpileServerJs = () => gulp.src(serverJsPath)
  .pipe(babel())
  .pipe(gulp.dest('dist'));

const clean = () => del(['dist']);

const watch = () => {
  gulp.watch(serverJsPath, gulp.series(transpileServerJs, reloadServer, reloadDev));
  gulp.watch('views/common/index.html', gulp.series(copyLayout, reloadServer, reloadDev));
  gulp.watch('views/**/*.js', gulp.series(copyViews, reloadServer, reloadDev));
  gulp.watch(['public/**/*.scss', 'views/**/*.scss'], gulp.series(transpileScss, reloadDev));
};


const dev = gulp.series(
  clean,
  copyLayout,
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
  copyLayout,
  copyMisc,
  copyViews,
  transpileScss,
  transpileServerJs,
  bundleClientJs,
);


module.exports = {
  dev,
  prod,
  console: serverConsole,
};
