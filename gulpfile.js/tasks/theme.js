var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('../config');
var Notification = require('../notification');

gulp.task('theme', function () {
    return gulp.src([config.directories.src + '/**/*.php'])
        .pipe($.changed(config.directories.dist))
        .pipe(gulp.dest(config.directories.dist))
        .pipe(new Notification('Theme Copied'));
});