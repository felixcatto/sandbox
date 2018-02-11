import gulp from 'gulp';
import babel from 'gulp-babel';
import revertPath from 'gulp-revert-path';
import del from 'del';
import { spawn } from 'child_process';


let node;
const startServer = (cb) => {
  if (node) node.kill();
  node = spawn('node', ['app/bin/server.js'], { stdio: 'inherit' });
  cb();
};

const copyPublic = () => gulp.src('src/public/**').pipe(gulp.dest('app/public/'));

const copyLayout = () => gulp.src('src/**/*.html').pipe(gulp.dest('app'));

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
};

const dev = gulp.series(...[
  clean,
  copyLayout,
  copyPublic,
  transpileJs,
  startServer,
  watch,
]);

export { dev };
