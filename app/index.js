var $ = require('jquery');
var Backbone = require('backbone');

var App = require('app');

require('helpers/handlebars');
require('helpers/global');

// import essential to run modules
var DesktopApplication = require('modules/application/desktop');

var Router = require('router');

var Application = DesktopApplication;

App.vent.on('app:init:done', function() {
	Backbone.history.start({
		pushState: true,
		root: App.Config.getValue('urlRoot')
	});
});

App.vent.on('app:init:fail', function() {
	console.error('Application:fail', arguments);
});

Application.init();
App.start();
