var sww = require('gulp-sww');
var config = require('../config');
var package = require('../../package.json');
var gulp = require('gulp');

gulp.task('offline', ['build'], function() {
  return gulp.src('**/*', { cwd : config.markup.dest } )
    .pipe(sww({ 'version': package.version, 'hookSW': 'gallerySW.js' }))
    .pipe(gulp.dest(config.markup.dest));
});

gulp.task('offline_lite', function() {
  return gulp.src('**/*', { cwd : config.markup.dest } )
    .pipe(sww({ 'version': package.version, 'hookSW': 'gallerySW.js' }))
    .pipe(gulp.dest(config.markup.dest));
});