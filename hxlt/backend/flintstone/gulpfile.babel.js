import gulp from 'gulp';
import babel from 'gulp-babel';
import revertPath from 'gulp-revert-path';
import del from 'del';
import { spawn } from 'child_process';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssImport from 'postcss-import';


let node;
const startServer = (cb) => {
  if (node) node.kill();
  node = spawn('node', ['app/bin/server.js'], { stdio: 'inherit' });
  cb();
};

// const copyPublic = () => gulp.src('src/public/**').pipe(gulp.dest('app/public/'));

const copyLayout = () => gulp.src('src/index.html').pipe(gulp.dest('app'));

const transpileScss = () => {
  return gulp.src('src/public/css/index.scss')
    .pipe(sass())
    .pipe(postcss([cssImport()]))
    .pipe(rename('index.css'))
    .pipe(gulp.dest('app/public/css'));
};

const transpileJs = () => {
  return gulp.src('src/**/*.+(js|jsx)')
    .pipe(babel())
    .pipe(revertPath())
    .pipe(gulp.dest('app'));
};

const clean = () => del(['app']);

const watch = () => {
  gulp.watch('src/**/*.+(js|jsx)', gulp.series(transpileJs, startServer));
  gulp.watch('src/views/**/*.html', gulp.series(copyLayout, transpileJs, startServer));
  gulp.watch('src/public/css/**/*.scss', gulp.series(transpileScss));
};

const dev = gulp.series(...[
  clean,
  copyLayout,
  transpileScss,
  transpileJs,
  startServer,
  watch,
]);

export { dev };
