var gulp = require('gulp');
var gutil = require('gulp-util');
var $ = require('gulp-load-plugins')();
var config = require('../config');
var browserSync = require('browser-sync').create();
var Notification = require('../notification');

$.browserify = require('browserify');
$.watchify = require('watchify');
$.source = require('vinyl-source-stream');
$.buffer = require('vinyl-buffer');

gulp.task('browsersync', function () {
    var options = {
        proxy: config.proxy,
        reloadOnRestart: true,
        notify: true,
        open: true,
        browser: 'firefox',
        files: [
            config.directories.wordpress + '/**/*'
        ],
        watchOptions: {
            usePolling: true
        },
        snippetOptions: {
            rule: {
                match: /(<\/body>|<\/pre>)/i,
                fn: function (snippet, match) {
                    return snippet + match;
                }
            }
        }
    };

    if (gutil.env._.indexOf('watch') > -1) {
        browserSync.init(options);
    }
});
