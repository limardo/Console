var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var Notification = function () {
    this.title = 'Console Theme';
    this.pass = __dirname + '/icons/pass.png';
    this.fail = __dirname + '/icons/fail.png';

    if (arguments.length) {
        return this.compiled(arguments[0]);
    }
};

Notification.prototype.compiled = function (message) {
    return $.notify({
        title: this.title,
        message: message,
        icon: this.pass,
        onLast: true
    });
};

Notification.prototype.error = function (message, e) {
    return $.notify.onError({
        title: this.title,
        message: message,
        icon: this.fail,
        onLast: true
    })(e);
};

module.exports = Notification;