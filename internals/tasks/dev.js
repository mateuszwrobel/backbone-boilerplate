var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var replace = require('gulp-replace');
var livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var gutil = require('gulp-util');

var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var handlebars = require('browserify-handlebars');
var transform = require('vinyl-transform');
var exorcist = require('exorcist');

var config = {
	appDir: 'app',
	publicDir: 'assets/public/js',
	bundleFile: 'app.js',
	mapfile: 'app.js.map',
	isDevelopment: true
};

const entryPoint = './' + config.appDir + '/index.js';

var browserifyOptions = {
	cache: {},
	packageCache: {},
	fullPaths: false,
	debug: true,
	extensions: ['.json', '.js'],
	entries: entryPoint,
	paths: ['./' + config.appDir],
	transform: [
		['browserify-handlebars'],
		['browserify-shim']
	],
};

var bundler = watchify(browserify(browserifyOptions));

function handleErrors() {
	var args = Array.prototype.slice.call(arguments);
	console.warn(arguments);
	notify.onError({
		title: 'Compile Error',
		message: '<%= error.message %>'
	}).apply(this, args);
	this.emit('end'); // Keep gulp from hanging on this task
}

var bundleJS = function() {
	return bundler.bundle()
		.on('error', handleErrors)
		.pipe(source(entryPoint))
		.pipe(transform(function() {
			return exorcist(config.publicDir + '/' + config.mapfile);
		}))
		.pipe(rename(config.bundleFile))
		.pipe(gulp.dest(config.publicDir))
		.pipe(livereload());
};

var bundleCSS = function() {
	gulp.watch('assets/scss/**/*.scss', ['build-css']);

	return gulp.src('assets/scss/screen.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'nested',
			errLogToConsole: true
		}))
		.pipe(autoprefixer('last 2 version', 'ie 10'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('assets/public/css'))
		.pipe(livereload());
};

var startLivereload = function() {
	livereload.listen();
};

bundler.on('update', bundleJS);
bundler.on('log', gutil.log);

gulp.task('build-js', bundleJS);
gulp.task('build-css', bundleCSS);
gulp.task('livereload', startLivereload);

gulp.task('dev', ['livereload', 'build-js', 'build-css']);
