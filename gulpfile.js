const gulp = require('gulp'),
  sass = require('sass'),
  sass_gulp = require('gulp-sass')(sass),
  browserSync = require('browser-sync'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer'),
  include = require('gulp-include');


gulp.task('clean', async function () {
  del.sync('dist');
});

gulp.task('scss', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass_gulp({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('css', function () {
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/animate.css/animate.css',
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('script', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(browserSync.reload({ stream: true }));
});


gulp.task('js-include', () => {
  return gulp.src('app/js/main.js')
    .pipe(include())
    .on('error', console.log)
    .pipe(gulp.dest('app/dist/js'));
})


gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});

gulp.task('export', async function () {
  let buildHtml = await gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));

  let BuildCss = await gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/css'));

  let BuildJs = await gulp.src('app/dist/js/*.js')
    .pipe(gulp.dest('dist/dist/js'));

  let BuildFonts = await gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));

  let BuildImg = await gulp.src('app/images/**/*.*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'));
  gulp.watch('app/js/**/*.js', gulp.parallel('js-include', 'script'));
});

gulp.task('build', gulp.series('clean', 'export'));

gulp.task('default', gulp.parallel('css', 'scss', 'js-include', 'browser-sync', 'watch'));
