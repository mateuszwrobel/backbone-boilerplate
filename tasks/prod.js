var gulp = require('gulp');
var sass = require('gulp-sass');
var replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var gutil = require('gulp-util');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');
var handlebars = require('browserify-handlebars');
var exorcist = require('exorcist');
var uglifyify = require('uglifyify');

var stripify = require('stripify');
var through = require('through');

var cachedSrc = '';
var config = {
	appDir: 'app',
	publicDir: 'assets/public/js',
	bundleFile: 'app.js',
	mapfile: 'app.js.map',
	isDevelopment: false
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

var bundler = browserify(browserifyOptions);
bundler.transform({
	global: true
}, 'uglifyify');

var bundleJS = function() {
	return bundler
		.transform(function(file) {
			if (file && file.match(/\.js$/)) {
				return stripify(file);
			}
			return through();
		})
		.bundle()
		.on('error', notify.onError())
		.pipe(source(entryPoint))
		.pipe(transform(function() {
			return exorcist(config.publicDir + '/' + config.mapfile);
		}))
		.pipe(rename(config.bundleFile))
		.pipe(gulp.dest(config.publicDir));
};

var bundleCSS = function() {
	return gulp.src('assets/scss/screen.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer('last 2 version', 'ie 10'))
		.pipe(gulp.dest('assets/public/css'));
};

gulp.task('prod-build-js', bundleJS);
gulp.task('prod-build-css', bundleCSS);

gulp.task('prod', ['prod-build-js', 'prod-build-css']);
