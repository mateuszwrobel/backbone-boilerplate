var gulp = require('gulp');
var webserver = require('gulp-webserver');
var argv = require('yargs').argv;

var config = {
	// host: 'ip address to set server to internet/intranet',
	host: 'localhost',
	path: '',
	target: 'http://general-config.domain.com/api',
	mockTarget: 'http://localhost:9000'
};

/**
 * 'gulp serve --mock' for running mock proxy
 */
gulp.task('proxy', function() {
	var mock = argv.mock || false;
	gulp.src('./')
		.pipe(webserver({
			host: config.host,
			port: 8080,
			path: '/' + config.path,
			fallback: './index.htm',
			open: `http://${config.host}:8080`,
			proxies: [{
				source: '/api-source-1',
				target: mock ? config.mockTarget : config.target
			}, {
				source: '/api-source-2',
				target: 'http://direct-domain.com/link'
			}]
		}));
});
