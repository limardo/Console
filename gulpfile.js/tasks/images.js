var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('../config');
var Notification = require('../notification');

gulp.task('images', function () {
    return gulp.src(config.directories.src + '/images/**/*.{jpg|jpeg|png|gif|svg}')
        .pipe($.changed(config.directories.dist + '/images/'))
        .pipe($.imagemin({
            optimizationLevel: 7,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(config.directories.dist + '/images'))
        .pipe(new Notification('Images optimized'));
});