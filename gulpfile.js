var gulp = require('gulp');
var gutil = require('gulp-util');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var sass = require('gulp-ruby-sass');
var filter = require('gulp-filter');

gulp.task('browserify', function () {
  var bundler = browserify('./index.js');

  bundler.transform('debowerify');
  bundler.transform('brfs');

  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle2.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build'));
});

gulp.task('watchify', function() {
  watchify.args.debug = true;
  var bundler = watchify(browserify('./index.js', watchify.args));

  bundler.transform('debowerify');
  bundler.transform('brfs');

  bundler.on('update', rebundle);
  bundler.on('log', gutil.log.bind(gutil));

  function rebundle() {
    return bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle2.js'))
      .pipe(gulp.dest('./build'));
  }

  return rebundle();
});

gulp.task('default', ['watchify']);
