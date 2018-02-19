import gulp from 'gulp';
import babel from 'gulp-babel';
import revertPath from 'gulp-revert-path';
import del from 'del';
import { spawn } from 'child_process';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssImport from 'postcss-import';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.js';



const serverJsPath = ['src/**/*.+(js|jsx)', '!src/client/**'];

let node;
const startServer = (cb) => {
  if (node) node.kill();
  node = spawn('node', ['app/bin/server.js'], { stdio: 'inherit' });
  cb();
};
process.on('exit', () => node && node.kill());

const copyLayout = () => gulp.src('src/index.html').pipe(gulp.dest('app'));

const transpileScss = () => {
  return gulp.src('src/public/css/index.scss')
    .pipe(sass())
    .pipe(postcss([cssImport()]))
    .pipe(rename('index.css'))
    .pipe(gulp.dest('app/public/css'));
};

const transpileServerJs = () => {
  return gulp.src(serverJsPath)
    .pipe(babel())
    .pipe(revertPath())
    .pipe(gulp.dest('app'));
};

const bundleClientJs = () => {
  return webpackStream(webpackConfig)
    .pipe(gulp.dest('app/public/js'));
};

const clean = () => del(['app']);

const watch = () => {
  gulp.watch(serverJsPath, gulp.series(transpileServerJs, startServer));
  gulp.watch('src/index.html', gulp.series(copyLayout, transpileServerJs, startServer));
  gulp.watch('src/public/css/**/*.scss', gulp.series(transpileScss));
};

const dev = gulp.series(
  clean,
  copyLayout,
  transpileScss,
  transpileServerJs,
  startServer,
  watch,
);

export { dev, bundleClientJs };
