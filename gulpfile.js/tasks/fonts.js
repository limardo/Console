var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('../config');
var Notification = require('../notification');

gulp.task('fonts', function () {
    return gulp.src([config.directories.module + '/font-awesome/fonts/**/*.+(otf|svg|eot|ttf|woff|woff2)'])
        .pipe($.changed(config.directories.dist + '/fonts'))
        .pipe(gulp.dest(config.directories.dist + '/fonts'))
        .pipe(new Notification('Fonts copied'));
});