var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var ConfigHelper = require('helpers/config');


var method;
var noop = function() {};
var methods = [
	'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
	'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
	'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
	'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
];
var methodsLength = methods.length;
var windowConsole = (window.console = window.console || {});

while (methodsLength--) {
	method = methods[methodsLength];

	// Only stub undefined methods.
	if (!windowConsole[method]) {
		windowConsole[method] = noop;
	}
}

var App = new Marionette.Application();

App.isMobile = false;

App.Config = ConfigHelper;
App.activeRequests = [];

App.Helpers = {};

Marionette.Renderer.render = function(template, data) {
	return template(data);
};

App.getCurrentRoute = function() {
	return Backbone.history.fragment;
};

App.logout = function() {
	// logout
};

App.startComponent = function(screen, options) {
	_.each(App.activeRequests, function(request) {
		if (request.readyState >= 0 && request.readyState < 4) {
			request.abort();
		}
	});
	App.activeRequests = [];

	if (App.screenName === screen.name) {
		return;
	}

	if (App.screen) {
		App.screen.destroy();
	}

	App.screenName = screen.name;
	if (screen) {
		screen.init(options);
	}
};

var deviceClass = 'device-desktop';

if (ConfigHelper.isIPad()) {
	deviceClass = 'device-ipad';
} else if (ConfigHelper.isIPhone() || ConfigHelper.isIPod()) {
	deviceClass = 'device-iphone';
	App.isMobile = true;
}

$('html').addClass(deviceClass);

module.exports = App;
