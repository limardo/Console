var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('../config');
var _ = require('lodash');

gulp.task('watch', function () {

    config.watch = true;

    var tasks = [
        {name: 'sass', watcher: [config.directories.src + '/sass/**/*.+(sass|scss)']},
        {name: 'images', watcher: [config.directories.src + '/images/**/*.+(jpg|jpeg|png|gif|svg)']},
        {name: 'theme', watcher: [config.directories.src + '/**/*.php']}
    ];

    var batchOptions = {
        limit: undefined,
        timeout: 1000
    };

    gulp.start('browserify');

    gulp.start('browsersync');

    _.forEach(tasks, function (task) {
        $.watch(task.watcher, $.batch(batchOptions, function (events) {
            events.on('end', gulp.start(task.name));
        }));
    });
});