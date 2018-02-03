const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSyncCreate = require('browser-sync');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const runSequence = require('run-sequence');


const browserSync = browserSyncCreate.create();

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

gulp.task('js', function() {
  return gulp.src('app/jsraw/**/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    open: false,
    notify: false,
    server: {
      baseDir: 'app',
    },
  });
});

gulp.task('watch', ['browserSync', 'sass', 'js'], function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/jsraw/**/*.js', ['js'], browserSync.reload);
});















// Build
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('css', function() {
  return gulp.src('app/css/main.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('build', function() {
  runSequence('clean:dist', 'sass', ['css', 'useref', 'images', 'fonts']);
});