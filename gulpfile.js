var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('default', function() {});

gulp.task('sass', function() {
  return gulp.src(['src/sass/**/*.scss','!src/sass/**/_*.scss'])
    .pipe($.sourcemaps.init())
    .pipe($.concat('style.css'))
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer())
    .pipe($.cssnano())
    .pipe(gulp.dest('../wordpress/wp-content/themes/console/'))
    .pipe($.notify('Sass Compiled'));
});
