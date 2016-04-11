'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    scss = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    webserver = require('gulp-webserver');

gulp.task('libsjs', function(){
  gulp.src([
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
    ])
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('builds/dev'));
});

gulp.task('js', function(){
  gulp.src([
      'builds/dev/app/**/*.js',
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('builds/dev'));
});

gulp.task('css', function(){
  gulp.src([
     'bower_components/angular/angular-csp.css',
     'bower_components/bootstrap/dist/css/bootstrap.css'
    ])
    .pipe(concat('theme.css'))
    .pipe(gulp.dest('builds/dev/css'));
});

gulp.task('fonts', function(){
  gulp.src('bower_components/bootstrap/dist/fonts/**/*.*')
    .pipe(gulp.dest('builds/dev/fonts/'));
});

gulp.task('scss', function(){
  gulp.src([
    'builds/dev/app/scss/**/*.scss',
  ])
  .pipe(scss())
  .pipe(concat('app.css'))
  .pipe(gulp.dest('builds/dev/css'));
});

gulp.task('watch', function(){
  gulp.watch('builds/dev/app/**/*.js', ['js']);
  gulp.watch('builds/dev/app/scss/**/*.scss', ['scss']);
});

gulp.task('webserver', function(){
  gulp.src('builds/dev')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', [
    'js',
    'css',
    'libsjs',
    'scss',
    'watch',
    'webserver',
    'fonts'
  ]);
