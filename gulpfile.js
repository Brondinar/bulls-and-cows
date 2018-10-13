'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const cache = require('gulp-cache');
const image = require('gulp-image');
const webpackStream = require('webpack-stream');

const params = {
	in: 'frontend/src/',
	out: 'frontend/static/frontend',
	htmlSrc: 'frontend/templates/frontend/index.html'
}

gulp.task('watch', function(callback) {
	gulp.watch(params.in + 'less/**/*.less', gulp.series('style'));
	gulp.watch(params.in + '**/*.js', gulp.series('js'));

	callback();
});

// gulp.task('html', function() {
// 	return gulp.src(params.htmlSrc)
// 		.pipe(gulp.dest(params.out))
// 		.pipe(reload({ stream: true }));
// });

gulp.task('image', function() {
	return gulp.src(params.in + '/img/*')
		.pipe(plumber())
		.pipe(cache(image()))
		.pipe(gulp.dest(params.out + '/img'))
		.pipe(reload({ stream: true }));
});

// gulp.task('font', function() {
// 	return gulp.src('src/fonts/*')
// 		.pipe(gulp.dest(params.out + '/fonts'))
// })

gulp.task('style', function() {
	return gulp.src(params.in + '/less/**/*.less')
		.pipe(plumber())
		.pipe(concat('style.css'))
		.pipe(less())
		.pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(cleanCSS())
		.pipe(gulp.dest(params.out))
		.pipe(reload({ stream: true }));
});

gulp.task('js', function() {
	return gulp.src(params.in + 'index.js')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(webpackStream({
			mode: 'development',
			output: {
			    filename: 'main.js'
			},
			module: {
			    rules: [
			        {
			            test: /.js$/,
			            exclude: [/node_modules/, /static/],
			            use: {
			                loader: "babel-loader"
			            }
			        }
			    ]
			}
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(params.out))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(params.out))
		.pipe(reload({ stream: true }));
});

gulp.task('build', gulp.series('image', 'style', 'js'));

gulp.task('default', gulp.series('build', 'watch'));