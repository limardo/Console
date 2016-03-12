var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('../config');
var Notification = require('../notification');

gulp.task('sass', function () {
    return gulp.src([config.directories.src + '/sass/**/*.scss', '!' + config.directories.src + '/sass/**/_*.scss'])
        .pipe($.sourcemaps.init())
        .pipe($.concat('style.css'))
        .pipe($.sass({precision: 10, outputStyle: 'compressed'}).on('error', function (e) {
            new Notification().error('Sass Failed!', e);
        }))
        .pipe($.autoprefixer({browsers: ['last 2 versions'], cascade: false}))
        .pipe($.cssnano({safe: true}))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(config.directories.dist))
        .pipe(new Notification('Sass Compiled'));
});