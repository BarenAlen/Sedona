"use strict";

var gulp = require('gulp'),
	less = require('gulp-less'),
	debug = require('gulp-debug'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del'),
	combineMq = require('gulp-combine-mq'),
	concat = require('gulp-concat'),
	jsmin = require('gulp-jsmin'),
	browserSync = require('browser-sync').create();


gulp.task('clean', function() {
	return del(['public/css']);
});

gulp.task('cleanall', function() {
	return del(['public/css', 'public/js']);
});

gulp.task('serve', function() {
	browserSync.init({
		server: 'public'
	});

	browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('styles', function() {
	return gulp.src('less/style.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(debug({title: 'LESS'}))
		.pipe(autoprefixer())  // title is option you can look it up in API documentation
		.pipe(debug({title: 'autoprefixed'}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
	gulp.watch('less/**/*.*', gulp.series('styles'));
});

gulp.task('combineMQ', function() {
	return gulp.src('public/css/style.css')
		  .pipe(combineMq({
		  	beautify: false
		  }))
		  .pipe(gulp.dest('public/css'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles'), 'combineMQ'));

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));
