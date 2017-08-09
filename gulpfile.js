var gulp = require('gulp');
var concat = require("gulp-concat");
var hljs = require('highlight.js');
var gulp_markdown = require('gulp-markdown-it');

var concat = require("gulp-concat");

const paths = {
    npm : './node_modules/',
    css : './css/',
    js : './js/'
}

gulp.task('copy:css', function(){
    return gulp.src([
        paths.npm + 'bootstrap/dist/css/*.css'])
        .pipe(gulp.dest(`${paths.css}`));
});

gulp.task('copy:js', function(){
    return gulp.src([
        paths.npm + 'bootstrap/dist/js/*.js' ])
        .pipe(gulp.dest(`${paths.js}`)); 
});

gulp.task('copy', ['copy:css', 'copy:js']);

gulp.task('compile', function () {
    return gulp.src('**/*.md')
        .pipe(gulp_markdown({
            options: {
                html: true,
                highlight: function (str, lang) {
                    if (lang && hljs.getLanguage(lang)) {
                        try {
                            return hljs.highlight(lang, str, true).value;
                        } catch (__) { }
                    }

                    return ''; // use external default escaping
                }
            }
        }))
        .pipe(gulp.dest(function (f) {
            return f.base;
        }));
});

gulp.task('run', ['copy','compile'], function () {
    gulp.watch(['**/*.md', '**/*.css'], ['copy','compile']);
});