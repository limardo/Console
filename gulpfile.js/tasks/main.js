var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('../config');

gulp.task('default', ['sass', 'browserify', 'images', 'theme']);

gulp.task('setup', function () {
    return gulp.src(config.directories.module + '/normalize.css/normalize.css')
        .pipe($.changed(config.directories.src + '/sass'))
        .pipe($.rename('_normalize.scss'))
        .pipe(gulp.dest(config.directories.src + '/sass'));
});