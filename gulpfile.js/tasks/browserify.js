var gulp = require('gulp');
var gutil = require('gulp-util');
var $ = require('gulp-load-plugins')();
var config = require('../config');
var Notification = require('../notification');

$.browserify = require('browserify');
$.watchify = require('watchify');
$.source = require('vinyl-source-stream');
$.buffer = require('vinyl-buffer');

gulp.task('browserify', function () {
    var stream = $.browserify(config.directories.src + '/js/index.js', {});
    stream.transform(require('babelify'), {presets: ['es2015', 'react']});

    if (config.watch) {
        stream = $.watchify(stream, {enabled: true});
        stream.on('log', gutil.log);
    }

    return stream
        .bundle()
        .on('error', function (e) {
            new Notification().error('Browserify Failed!', e);
        })
        .pipe($.source(config.name + '.js'))
        .pipe($.buffer())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(config.directories.dist + '/js/'))
        .pipe(new Notification('Browserify Compiled'));
});