var $ = require('jquery');
window.$ = window.jQuery = $; // in npm is old version of jquery ui and this is to handle attaching shim jquery-ui
var Backbone = require('backbone');

var App = require('app');

// import esensial to run modules
var DesktopApplication = require('modules/application/desktop');

var Router = require('router');

var Application = DesktopApplication;

Application.on('done', function() {
	Backbone.history.start({
		pushState: true,
		root: App.Config.getValue('urlRoot')
	});
});

App.Modules.Application.on('fail', function() {
	console.error('Application:fail', arguments);
});

Application.start();
App.start();
