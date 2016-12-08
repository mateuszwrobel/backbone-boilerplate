var gulp = require('gulp');
var webserver = require('gulp-webserver');
var argv = require('yargs').argv;

var config = {
	// host: 'ip address to set server to internet/intranet',
	host: 'localhost',
	path: '',
	target: 'http://general-config.domain.com/api'
};

/**
 * 'gulp serve --mock' for running mock proxy
 */
gulp.task('provide:proxy', function() {
	// var mock = argv.mock || false;
	gulp.src('./')
		.pipe(webserver({
			host: config.host,
			path: '/' + config.path,
			fallback: './index.htm',
			open: `http://${config.host}:8000/api`,
			proxies: [{
				source: '/api-source-1',
				target: config.target
			}, {
				source: '/api-source-2',
				target: `http://${config.host}:8000/`
			}, {
				source: '/api-source-2',
				target: 'http://direct-domain.com/link'
			}]
		}));
});
