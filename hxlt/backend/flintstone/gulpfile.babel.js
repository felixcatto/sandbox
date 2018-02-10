import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import { spawn } from 'child_process';


let node;
const startServer = (cb) => {
  if (node) node.kill();
  node = spawn('node', ['app/bin/server.js'], { stdio: 'inherit' });
  node.on('close', (code) => {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
  cb();
};

const copyPublic = () => gulp.src('src/public/**').pipe(gulp.dest('app/public/'));

const transpileJs = () => {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('app'));
};

const clean = () => del(['app']);

const watch = () => {
  gulp.watch('src/**/*.js', gulp.series(transpileJs, startServer));
};

const dev = gulp.series(...[
  clean,
  copyPublic,
  transpileJs,
  startServer,
  watch,
]);

export { dev };
