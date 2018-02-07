import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import postcss from 'gulp-postcss';
import cssImport from "postcss-import";
import del from'del';
import Browser from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config.js';


const server = Browser.create();
const bundler = webpack(webpackConfig);

bundler.plugin('done', () => server.reload());

const reload = (done) => {
  server.reload();
  done();
};

const copyHtml = () => gulp.src('src/*.html').pipe(gulp.dest('app'));

const copyImg = () => gulp.src('src/img/**').pipe(gulp.dest('app/img/'));

const startServer = (done) => {
  server.init({
    open: false,
    notify: false,
    server: 'app',
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
      }),
    ],
  });
  done();
};

// const bundleJs = () => {
//   return gulp.src('src/js/bundle.js')
//     .pipe(webpack(webpackConfig))
//     .pipe(gulp.dest('app/js'));
// };

const transpileScss = () => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(postcss([cssImport()]))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('app/css'));
};

const transpileJs = () => {
  return gulp.src('src/js/**/*.js')
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('app/js'));
};

const clean = () => del(['app']);

const watch = () => {
  gulp.watch('src/scss/**/*.scss', gulp.series(transpileScss, reload));
  // gulp.watch('src/js/**/*.js', gulp.series(transpileJs, reload));
  gulp.watch('src/*.html', gulp.series(copyHtml, reload));
  gulp.watch('src/img/**', gulp.series(copyImg, reload));
};

const dev = gulp.series(...[
  clean,
  copyHtml,
  copyImg,
  transpileScss,
  startServer,
  watch,
]);

export { dev };
