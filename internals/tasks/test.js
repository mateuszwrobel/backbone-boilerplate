var gulp = require('gulp');
var mochify = require('mochify-browserify');
var fs = require('fs');
var through = require('through');

var eslint = require('gulp-eslint');
var argv = require('yargs').argv;
var webserver = require('gulp-webserver');

var config = {
	testReportDir: 'test-reports',
	lintTestReport: './test-reports/eslint.xml',
	mochifyTestReport: './test-reports/mochify.xml',
	appDir: 'app',
	publicDir: 'test/bundle/js',
	isDevelopment: true,
	testDir: 'app/**/*.test.js',
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

var createTestDir = function() {
	var dir = './' + config.testReportDir;
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
};


var unitTests = function(reportToFile) {
	var outputStream;
	var reporter;
	if (reportToFile) {
		createTestDir();
		fs.writeFileSync(config.mochifyTestReport, '');
		outputStream = through(function(chunk) {
			fs.appendFile(config.mochifyTestReport, chunk);
		});
		reporter = 'xunit';
	}
	return mochify('./' + config.testDir, {
		'browserify-options': browserifyOptions,
		reporter: reporter,
		output: outputStream
	}).bundle();
};

/**
 * to watch single file use property --file FILE_NAME
 */
var UTest = function() {
	var file = argv.file;
	var reporter = 'list';
	var opts = {
		'browserify-options': browserifyOptions,
		watch: true,
		reporter: reporter,
	};

	if (file) {
		return mochify('./test/**/' + file + '.test.js', opts)
			.bundle();
	} else {
		return mochify('./' + config.testDir, opts)
			.bundle();
	}
};

var lintChecker = function(reportToFile) {
	var fix = argv.fix || false;
	var outputStream = process.stdout;

	var reporter;
	if (reportToFile) {
		createTestDir();
		fs.writeFileSync(config.lintTestReport, '');
		outputStream = through(function(chunk) {
			fs.appendFile(config.lintTestReport, chunk);
		});
		reporter = 'junit';
	}

	return gulp.src(['./' + config.appDir + '/**/*.js', './' + config.appDir + '/**/*.json', '!node_modules/**'])
		.pipe(eslint({
			useEslintrc: true,
			fix: fix,
			quiet: !fix
		}))
		.pipe(eslint.format(reporter, outputStream))
		.pipe(gulp.dest('./' + config.appDir));
};

gulp.task('test-ut', function() {
	return unitTests(true);
});

gulp.task('test-ut-dev', function() {
	return unitTests(false);
});

/**
 * to fix linting errors add '--fix' parameter to gulp task
 * ex. 'gulp test --fix' or 'gulp lint --fix'
 */
gulp.task('lint', function() {
	return lintChecker(true);
});

gulp.task('lint-dev', function() {
	return lintChecker(false);
});

gulp.task('test-watch', UTest);
gulp.task('test-dev', ['test-ut-dev', 'lint-dev']);
gulp.task('test', ['test-ut', 'lint']);
